import React, { useMemo } from 'react';
import { applyAutoLinkHtml } from '../utils/autoLink';

interface AutoLinkTextProps {
  children: string;
}

export function AutoLinkText({ children }: AutoLinkTextProps) {
  const html = useMemo(() => applyAutoLinkHtml(children), [children]);
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}
