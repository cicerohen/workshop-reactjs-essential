import { useState } from 'react';
import { createPortal } from 'react-dom';

import { RCProps } from '../types';

type Props = RCProps;

export const Portal = ({ children }: Props) => {
  const [mountNode] = useState(document.body);
  return createPortal(children, mountNode);
};
