import React from 'react';

type OuterLinkProps = {
  uri: string;
  title: string;
};

export const OuterLink: React.VFC<OuterLinkProps> = ({ uri, title }) => (
  <a href={uri} target="_blank" rel="noopener noreferrer">
    {title}
  </a>
);
