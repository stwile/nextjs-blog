import React from 'react';

type Props = {
  children: React.ReactNode;
};

export const Main: React.FC<Props> = ({ children }: Props) => {
  return (
    <main>
      <div className="max-w-5xl px-8 py-4 mx-auto">{children}</div>
    </main>
  );
};
