enum SelectionType {
  LEADING_NODE,
  TAILING_NODE,
  SAME_NODE,
  ALL_SELECTED,
}

export class SelectionTree {
  // private root: Node;

  // public init(root: Node) {
  //   this.root = root;
  // }

  addSelection(selection: Selection) {
    const {
      anchorNode,
      anchorOffset,
      focusNode,
      focusOffset
    } = selection;
    let current: Node | null = anchorNode;
    while (current) {
      let now = current;
      console.log(now.nodeValue);
      current = this.getNextLeafNode(current);
      if (now === anchorNode && now === focusNode) {
        this.addHighlight(now, selection, SelectionType.SAME_NODE);
      } else if (now === focusNode) {
        this.addHighlight(now, selection, SelectionType.TAILING_NODE);
        break;
      } else if (now === anchorNode){
        this.addHighlight(now, selection, SelectionType.LEADING_NODE);
      } else {
        this.addHighlight(now, selection, SelectionType.ALL_SELECTED);
      }
    }
  }

  private createHighlightSpan(text: string) {
    const span = document.createElement('span');
    span.setAttribute('class', 'selected');
    span.innerText = text;
    return span;
  }

  private addHighlight(node: Node, selection: Selection, type?: SelectionType) {
    if (node.nodeType !== 3) return; // 只对 TextNode 处理
    const text = node.nodeValue || '';

    if (text.length === 0) return;

    if (type === SelectionType.ALL_SELECTED) {
      node.nodeValue = '';
      const span = this.createHighlightSpan(text);
      node.parentNode?.insertBefore(span, node);
    }
    if (type === SelectionType.LEADING_NODE) {
      const offset = selection.anchorOffset
      node.nodeValue = text.substring(0, offset);
      const span = this.createHighlightSpan(text.substring(offset));
      node.parentNode?.appendChild(span);
    }
    if (type === SelectionType.TAILING_NODE) {
      const offset = selection.focusOffset;
      node.nodeValue = text.substring( offset);
      const span = this.createHighlightSpan(text.substring(0, offset));
      node.parentNode?.insertBefore(span, node);
    }
  }

  public getNextLeafNode(node: Node) {
    let current: Node | null = node;
    while (current) {
      if (current.childNodes.length === 0 && current !== node) {
        return current;
      }
      current = this.nextElement(current);
    }
    return null;
  }

  public nextElement(node: Node) {
    // 限定寻找范围
    const within = document.getElementById('codeline');
    if(node.childNodes.length) {
        return node.childNodes[0];
    }
    if(node.nextSibling){
        return node.nextSibling;
    }
    while(node.parentNode){
      if (node.parentNode === within) {
        break;
      }
      if(node.parentNode.nextSibling) {
          return node.parentNode.nextSibling;
      }
      node = node.parentNode;
    }
    return null;
  }
}
