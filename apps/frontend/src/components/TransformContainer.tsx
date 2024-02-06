import React, { ReactNode, useRef, useEffect, useState } from "react";
import "../styling/TransformContainer.css";

interface TransformContainerProps {
  children: ReactNode;
}

const TransformContainer: React.FC<TransformContainerProps> = ({
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.4);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [locX, setLocX] = useState(0);
  const [locY, setLocY] = useState(0);
  const [scrolling, setScrolling] = useState(0);

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

      // Limit panning to stay within content boundaries
      container.scrollLeft = Math.min(
        Math.max(0, newScrollLeft),
        maxScrollLeft,
      );
      container.scrollTop = Math.min(Math.max(0, newScrollTop), maxScrollTop);
      //console.log("scrollleft:", container.scrollLeft/scale, "scrollTop:", container.scrollTop/scale, "scaleX:", container.getBoundingClientRect().width/scale, "scaleY:", container.getBoundingClientRect().height/scale);
      setDragStart({ x: e.clientX, y: e.clientY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      let delta = 0;
      const maxSpeed = 20;
      const minSpeed = 6;

      if (
        (e.deltaY > 0 && e.deltaY < minSpeed) ||
        (e.deltaY < 0 && e.deltaY > -1 * minSpeed)
      ) {
        setScrolling(0);
        console.log("stopped scrolling");

        return;
      }
      console.log(container.scrollLeft, container.scrollTop, locX, locY);

      if (!scrolling) {
        setScrolling(scrolling + 1);
        console.log("scrolling!");
        setLocX((container.scrollLeft + e.clientX - rect.left) / scale);
        setLocY((container.scrollTop + e.clientY - rect.top) / scale);
        return;
      }
      // container.scrollLeft = locX*scale-e.clientX+rect.left;
      // container.scrollTop = locY*scale-e.clientY+rect.top;

      if (e.deltaY > maxSpeed) delta = maxSpeed;
      else if (e.deltaY < -1 * maxSpeed) delta = -1 * maxSpeed;
      else delta = e.deltaY;

      const zoomSpeed = 0.0005;
      //container.scrollLeft = locX * scale - e.clientX + rect.left;
      //container.scrollTop = locY * scale - e.clientY + rect.top;
      if (delta < 0) {
        setScale(Math.max(0.1, scale * (1 + delta * zoomSpeed)));
      } else {
        setScale(Math.min(3, scale * (1 + delta * zoomSpeed)));
      }
      // container.scrollLeft = locX*scale-e.clientX+rect.left;
      // container.scrollTop = locY*scale-e.clientY+rect.top;

      content.style.transform = `scale(${scale})`;

      //console.log ("locX:", locX, "locY:", locY);
      //console.log(content.scrollHeight);
      container.scrollLeft = locX * scale - e.clientX + rect.left;
      container.scrollTop = locY * scale - e.clientY + rect.top;

      //translate(100%, 100%)`;
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

  return (
    <div className="transform-container" ref={containerRef}>
      <div className="content-container" ref={contentRef}>
        {children}
      </div>
    </div>
  );
};

export default TransformContainer;
