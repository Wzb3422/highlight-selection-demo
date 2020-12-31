import { useState, useEffect } from "react";
import { debounce, endsWith } from "lodash";
import { SelectionTree } from './selectionTree';

export function useSelection() {
  const t = new SelectionTree();
  useEffect(() => {
    document.onselectionchange = debounce(() => {
      const selection = document.getSelection();
      if (selection?.isCollapsed) return;
      if (selection) {
        t.addSelection(selection);
      }
      // if (selection?.anchorNode) {
      //   console.log(selection.anchorNode, 'anchor Node');
      //   console.log(selection.focusNode, 'fcsnode')
      //   const next = t.getNextLeafNode(selection.anchorNode);
      //   if (next?.nodeType !== 3) {
      //     console.log(next?.childNodes, 'ccc');
      //   }
      //   console.log(next, 'next leaf node');
      // }
    }, 500);
    return () => {
      document.onselectionchange = null;
    }
  }, []);
}

// function highlightSelection() {
//   const selection = document.getSelection();
//   const {
//     anchorNode,
//     anchorOffset,
//     focusNode,
//     focusOffset,
//     isCollapsed
//   } = selection;

//   if (isCollapsed) return;

//   const startSpan = anchorNode.parentNode;
//   const endSpan = focusNode.parentNode;
//   let current = startSpan;
//   while (current) {
//     if (current === startSpan) {
//       current.textContent = `<span>${current.textContent.substr(
//         anchorOffset
//       )}</span>`;
//     } else if (current === endSpan) {
//       current.textContent = `<span>${current.textContent.substr(
//         0,
//         focusOffset
//       )}</span>`;
//       break;
//     } else {
//       current.textContent = `<span>${current.textContent}</span>`;
//     }
//     current = current.nextSibling;
//   }
// }
