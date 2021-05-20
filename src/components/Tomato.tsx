import React from 'react';

type Props = {
  children: string;
};

export const Tomato: React.FC<Props> = ({ children }: Props) => (
  <strong style={{ backgroundColor: `tomato` }}>{children}</strong>
);
