import type { SVGProps } from 'react';

type Props = Readonly<
  {
    isDark: boolean;
  } & SVGProps<SVGSVGElement>
>;

const MoonSvg = ({ isDark, ...svgProps }: Props) => {
  const TITLE = 'Light And Dark Switch Toggle';
  const DESCRIPTION = 'ライトモードかダークモードにテーマの色を切り替えるボタンです';
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill={isDark ? '#fff' : '#000'}
      stroke={isDark ? '#fff' : '#000'}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      aria-labelledby={TITLE}
      aria-describedby={DESCRIPTION}
      {...svgProps}
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      <title>{TITLE}</title>
      <desc>{DESCRIPTION}</desc>
    </svg>
  );
};

export { MoonSvg };
