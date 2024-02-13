import React, { ReactNode, useRef, useEffect, useState } from "react";
import "../styling/TransformContainer.css";

interface TransformContainerProps {
  children: ReactNode;
}

interface DragStart {
  x: number;
  y: number;
}

const TransformContainer: React.FC<TransformContainerProps> = ({
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const excludedContentRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number>(0.4);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<DragStart>({ x: 0, y: 0 });
  const [locX, setLocX] = useState<number>(0);
  const [locY, setLocY] = useState<number>(0);
  const [scrolling, setScrolling] = useState<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;

    if (!container || !content) return;
    content.style.transformOrigin = `${0}px ${0}px`;

    content.style.transform = `scale(${scale})`;

    const handleMouseDown = (e: MouseEvent) => {
      e.preventDefault();
      setIsDragging(true);
      setDragStart({ x: e.clientX, y: e.clientY });
    };
    const rect = container.getBoundingClientRect();

    const handleMouseMove = (e: MouseEvent) => {
      setLocX((container.scrollLeft + e.clientX - rect.left) / scale);
      setLocY((container.scrollTop + e.clientY - rect.top) / scale);
      if (!isDragging) return;

      const deltaX = e.clientX - dragStart.x;
      const deltaY = e.clientY - dragStart.y;

      const newScrollLeft = container.scrollLeft - deltaX;
      const newScrollTop = container.scrollTop - deltaY;

      const maxScrollLeft =
        content.scrollWidth * scale - rect.width + rect.left;
      const maxScrollTop =
        content.scrollHeight * scale - rect.height + rect.top;

      container.scrollLeft = Math.min(
        Math.max(0, newScrollLeft),
        maxScrollLeft,
      );
      container.scrollTop = Math.min(Math.max(0, newScrollTop), maxScrollTop);
      setDragStart({ x: e.clientX, y: e.clientY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      let delta = 0;
      const maxSpeed = 20;
      const minSpeed = 9;

      if (
        (e.deltaY > 0 && e.deltaY < minSpeed) ||
        (e.deltaY < 0 && e.deltaY > -1 * minSpeed)
      ) {
        setScrolling(0);
        container.scrollLeft = locX * scale - e.clientX + rect.left;
        container.scrollTop = locY * scale - e.clientY + rect.top;
        return;
      }

      if (!scrolling) {
        setScrolling(scrolling + 1);

        setLocX((container.scrollLeft + e.clientX - rect.left) / scale);
        setLocY((container.scrollTop + e.clientY - rect.top) / scale);

        return;
      }
      if (e.deltaY > maxSpeed) delta = maxSpeed;
      else if (e.deltaY < -1 * maxSpeed) delta = -1 * maxSpeed;
      else delta = e.deltaY;

      const zoomSpeed = 0.0005;
      if (delta < 0) {
        setScale(Math.max(0.1, scale * (1 + delta * zoomSpeed)));
      } else {
        setScale(Math.min(3, scale * (1 + delta * zoomSpeed)));
      }
      content.style.transform = `scale(${scale})`;

      container.scrollLeft = locX * scale - e.clientX + rect.left;
      container.scrollTop = locY * scale - e.clientY + rect.top;
    };

    container.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    container.addEventListener("wheel", handleWheel);

    return () => {
      container.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      container.removeEventListener("wheel", handleWheel);
    };
  }, [scrolling, locX, locY, scale, isDragging, dragStart]);

  const [includedChildren, excludedChildren] = React.Children.toArray(
    children,
  ).reduce(
    (acc: [ReactNode[], ReactNode[]], child: ReactNode) => {
      if (
        React.isValidElement(child) &&
        child.props.className &&
        child.props.className.includes("popup")
      ) {
        acc[1].push(
          React.cloneElement(child, {
            style: { transform: `scale(${1 / scale})` },
          } as React.HTMLAttributes<HTMLElement>),
        );
      } else {
        acc[0].push(child);
      }
      //console.log(acc[0]);
      return acc;
    },
    [[], []],
  );

  return (
    <div className="transform-container" ref={containerRef}>
      <div className="content-container" ref={contentRef}>
        {includedChildren}
      </div>
      <div className="excluded-content-container" ref={excludedContentRef}>
        {excludedChildren}
      </div>
    </div>
  );
};

export default TransformContainer;
