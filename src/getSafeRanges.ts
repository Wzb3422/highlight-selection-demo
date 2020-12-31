/**
 * Produce an array of smaller Range objects, none of which individually crosses an element.
 * @param dangerous
 */
export function getSafeRanges(dangerous: Range) {
  debugger;
  let commonAncestor = dangerous.commonAncestorContainer;
  // Starts -- Work inward from the start, selecting the largest safe range
  let s = new Array(0), rs = new Array(0);
  if (dangerous.startContainer !== commonAncestor) {
    let current: Node | null = dangerous.startContainer;
    while (current && current !== commonAncestor) {
      s.push(current)
      current = current.parentNode;
    }
  }
  if (0 < s.length) for(var i = 0; i < s.length; i++) {
      let xs = document.createRange();
      if (i) {
          xs.setStartAfter(s[i-1]);
          xs.setEndAfter(s[i].lastChild);
      }
      else {
          xs.setStart(s[i], dangerous.startOffset);
          xs.setEndAfter(
              (s[i].nodeType === Node.TEXT_NODE)
              ? s[i] : s[i].lastChild
          );
      }
      rs.push(xs);
  }

  // Ends -- basically the same code reversed
  let e = new Array(0), re = new Array(0);
  if (dangerous.endContainer !== commonAncestor) {
    let current: Node | null = dangerous.endContainer;
    while (current && current !== commonAncestor) {
      e.push(current);
      current = current.parentNode;
    }
  }
  if (0 < e.length) for(let i = 0; i < e.length; i++) {
      let xe = document.createRange();
      if (i) {
          xe.setStartBefore(e[i].firstChild);
          xe.setEndBefore(e[i-1]);
      }
      else {
          xe.setStartBefore(
              (e[i].nodeType === Node.TEXT_NODE)
              ? e[i] : e[i].firstChild
          );
          xe.setEnd(e[i], dangerous.endOffset);
      }
      re.unshift(xe);
  }

  // Middle -- the uncaptured middle
  if ((0 < s.length) && (0 < e.length)) {
      var xm = document.createRange();
      xm.setStartAfter(s[s.length - 1]);
      xm.setEndBefore(e[e.length - 1]);
  }
  else {
      return [dangerous];
  }

  // Concat
  rs.push(xm);
  let response = rs.concat(re);

  // Send to Console
  return response;
}
