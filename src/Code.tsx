import React from "react";
import { highlight } from "highlight.js";
import { useSelection } from './useSelection';

export const codeStr = `function sayHi(name: string) { window.alert('hi' + name); }`;

export function Code() {
  useSelection();

  const highlightedCode = highlight("ts", codeStr, false).value;

  return <div id="codeline" dangerouslySetInnerHTML={{ __html: highlightedCode }}></div>;
}
