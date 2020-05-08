import React, { useEffect, useRef, useState } from "react";
import ReactDom from "react-dom";

interface Props {
  rows?: number;
}

const ELLIPSIS_STR = "...";
let ellipsisContainer: HTMLDivElement;

const pxToNumber = (styleValue: string): number => {
  return parseFloat(styleValue);
};

const measure = (
  renderedDiv: HTMLDivElement,
  vdom: React.ReactNode,
  ellipsisStr: string,
  rows: number
): {
  showContent: React.ReactNode;
  fullHtmlText: string;
  needEllipsis: boolean;
} => {
  if (!ellipsisContainer) {
    ellipsisContainer = document.createElement("div");
    document.body.appendChild(ellipsisContainer);
  }

  const originStyle = getComputedStyle(renderedDiv);
  const lineHeight = pxToNumber(originStyle.getPropertyValue("line-height"));
  const maxHeight = Math.round(
    lineHeight * rows +
      pxToNumber(originStyle.paddingTop) +
      pxToNumber(originStyle.paddingBottom)
  );

  ellipsisContainer.style.position = "fixed";
  ellipsisContainer.style.left = "0";
  ellipsisContainer.style.height = "auto";
  ellipsisContainer.style.minHeight = "auto";
  ellipsisContainer.style.maxHeight = "auto";
  ellipsisContainer.style.top = "-999999px";
  ellipsisContainer.style.zIndex = "-1000";

  // clean up css overflow
  ellipsisContainer.style.textOverflow = "clip";
  ellipsisContainer.style.whiteSpace = "normal";
  ellipsisContainer.style.webkitLineClamp = "none";

  function inRange(target: HTMLDivElement = ellipsisContainer): boolean {
    return target.offsetHeight < maxHeight;
  }

  if (inRange(renderedDiv)) {
    return {
      showContent: vdom,
      fullHtmlText: renderedDiv.innerHTML,
      needEllipsis: false,
    };
  }

  ReactDom.render(<>{vdom}</>, ellipsisContainer);

  //clone nodes
  const contentNodes = Array.from(ellipsisContainer.childNodes).filter(
    (ele) => ele.nodeType !== document.COMMENT_NODE
  );
  const dotsNode = document.createTextNode(ELLIPSIS_STR);
  ReactDom.unmountComponentAtNode(ellipsisContainer);

  // Append before dots nodes
  function appendChildNode(node: ChildNode) {
    ellipsisContainer.insertBefore(node, dotsNode);
  }

  ellipsisContainer.appendChild(dotsNode);
  const ellipsisChildren: React.ReactNode[] = [];
  function measureText(
    textNode: Text,
    fullText: string,
    startLoc: number,
    endLoc: number = fullText.length,
    lastSuccessLoc = 0
  ): { reactNode: React.ReactNode; finished: boolean } {
    const mid = Math.floor((startLoc + endLoc) / 2);
    textNode.textContent = fullText.slice(0, mid);

    //二分查找
    if (startLoc >= endLoc - 1) {
      for (let step = endLoc; step > 0; step--) {
        const text = fullText.slice(0, step);
        textNode.textContent = text;

        if (inRange() || !text) {
          //如果是全部长度，则说明容器还有空余，否则已经满了测量已经结束
          return step === fullText.length
            ? {
                finished: false,
                reactNode: text,
              }
            : {
                finished: true,
                reactNode: text,
              };
        }
      }
    }

    if (inRange()) {
      return measureText(textNode, fullText, mid, endLoc, mid);
    }
    return measureText(textNode, fullText, startLoc, mid, lastSuccessLoc);
  }

  contentNodes.some((node) => {
    appendChildNode(node);
    const { finished, reactNode } = measureText(
      node as Text,
      node.textContent || "",
      0
    );
    reactNode && ellipsisChildren.push(reactNode);
    return finished;
  });

  return {
    showContent: ellipsisChildren,
    fullHtmlText: ellipsisContainer.innerHTML,
    needEllipsis: true,
  };
};

const EllipsisParagraph: React.FC<Props> = ({ rows, children }) => {
  const [isEllipsis, setIsEllipsis] = useState(false);
  const [showContent, setShowContent] = useState<React.ReactNode>(null);
  const nodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (rows) {
      //不异步的话,measure()里面的React.render()渲染dom将是异步的,无法以同步代码获取dom渲染后的结果
      Promise.resolve().then(() => {
        const result = measure(
          nodeRef.current as HTMLDivElement,
          children,
          ELLIPSIS_STR,
          rows
        );
        if (result.needEllipsis) {
          setShowContent(result.showContent);
          setIsEllipsis(result.needEllipsis);
        }
      });
    }
  }, [rows, children]);

  return (
    <div ref={nodeRef}>
      {isEllipsis ? showContent : children}
      {isEllipsis ? ELLIPSIS_STR : ""}
    </div>
  );
};

export default EllipsisParagraph;
