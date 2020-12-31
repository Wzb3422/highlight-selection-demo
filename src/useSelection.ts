import { useState, useEffect } from "react";
import { debounce, endsWith } from "lodash";
import { SelectionTree } from './selectionTree';
import { getSafeRanges } from './getSafeRanges';

export function useSelection() {
  useEffect(() => {
    document.onselectionchange = debounce(() => {
      const selection = document.getSelection();
      if (selection?.isCollapsed) {
        return;
      }

      const selectionRange = selection?.getRangeAt(0);
      if (selectionRange) {
        const safeRanges = getSafeRanges(selectionRange);
        safeRanges.forEach(highlightRange);
      }
    }, 500);
    return () => {
      document.onselectionchange = null;
    }
  }, []);
}

function highlightRange(range: Range) {
  console.log(range);
  let newNode = document.createElement("div");
  newNode.setAttribute(
     "style",
     "background-color: yellow; display: inline;"
  );
  range.surroundContents(newNode);
}