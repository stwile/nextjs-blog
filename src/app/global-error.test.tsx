import { beforeEach, describe, expect, it, vi } from 'vitest';

import { Children, isValidElement } from 'react';

import type * as ReactModule from 'react';
import type { ReactElement, ReactNode } from 'react';

const captureExceptionMock = vi.hoisted(() => vi.fn());
const useEffectMock = vi.hoisted(() =>
  vi.fn((effect: () => void) => {
    effect();
  }),
);

vi.mock('@sentry/nextjs', () => ({
  captureException: captureExceptionMock,
}));

vi.mock('react', async (importOriginal) => {
  const react = await importOriginal<typeof ReactModule>();

  return {
    ...react,
    useEffect: useEffectMock,
  };
});

import GlobalError from './global-error';

type ElementProps = {
  children?: ReactNode;
  lang?: string;
  onClick?: () => void;
};

type TestElement = ReactElement<ElementProps>;

const asElement = (value: ReactNode): TestElement => {
  if (!isValidElement<ElementProps>(value)) {
    throw new Error('Expected a React element');
  }

  return value;
};

const findChildElement = (element: TestElement, type: string): TestElement => {
  const child = Children.toArray(element.props.children).find(
    (value): value is TestElement => isValidElement<ElementProps>(value) && value.type === type,
  );

  if (!child) {
    throw new Error(`Expected a ${type} element`);
  }

  return child;
};

describe('app/global-error', () => {
  beforeEach(() => {
    captureExceptionMock.mockClear();
    useEffectMock.mockClear();
  });

  it('エラーをSentryへ送信し、root layoutを置換できる文書を返す', () => {
    const error = new Error('unexpected');
    const element = asElement(GlobalError({ error, reset: vi.fn() }));
    const body = findChildElement(element, 'body');

    expect(element.type).toBe('html');
    expect(element.props.lang).toBe('ja');
    expect(body.type).toBe('body');
    expect(captureExceptionMock).toHaveBeenCalledOnce();
    expect(captureExceptionMock).toHaveBeenCalledWith(error);
  });

  it('復旧メッセージを表示し、ボタン操作でresetを呼ぶ', () => {
    const reset = vi.fn();
    const element = asElement(GlobalError({ error: new Error('unexpected'), reset }));
    const body = findChildElement(element, 'body');
    const main = asElement(body.props.children);
    const section = asElement(main.props.children);
    const children = Children.toArray(section.props.children);
    const heading = asElement(children[0]);
    const message = asElement(children[1]);
    const button = asElement(children[2]);

    expect(heading.props.children).toBe('エラーが発生しました');
    expect(message.props.children).toBe('時間をおいて、もう一度お試しください。');
    expect(button.props.children).toBe('再試行する');

    button.props.onClick?.();
    expect(reset).toHaveBeenCalledOnce();
  });
});
