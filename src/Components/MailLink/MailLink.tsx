import React from 'react';
import type { Node } from 'react';

/**
 * A Component that renders a link which composes a new mail on click
 */
type Props = {
  to: string;
  children?: Node;
};
const MailLink = ({ to, children }: Props) => (
  <a href={`mailto:${to}`}>{children}</a>
);

MailLink.defaultProps = {
  children: undefined,
};

export default MailLink;
