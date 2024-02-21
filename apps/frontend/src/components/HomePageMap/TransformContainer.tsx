import React, { ReactNode, useRef, useEffect, useState } from "react";
import "../../styling/TransformContainer.css";

interface TransformContainerProps {
  children: ReactNode;
  zoomToCoordinate?: { x: number; y: number };
}

interface DragStart {
  x: number;
  y: number;
}

const TransformContainer: React.FC<TransformContainerProps> = ({
  children,
  zoomToCoordinate,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number>(0.4);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<DragStart>({ x: 0, y: 0 });
  const [locX, setLocX] = useState<number>(0);
  const [locY, setLocY] = useState<number>(0);
  const [scrolling, setScrolling] = useState<number>(0);
  const prevZoomToCoordinate =
    useRef<TransformContainerProps["zoomToCoordinate"]>();

  const handleGradualScroll = (
    targetLeft: number,
    targetTop: number,
    duration: number,
  ) => {
    const startTime = performance.now();
    const startLeft = containerRef.current!.scrollLeft;
    const startTop = containerRef.current!.scrollTop;

    const animateScroll = (timestamp: number) => {
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      containerRef.current!.scrollLeft =
        startLeft + (targetLeft - startLeft) * progress;
      containerRef.current!.scrollTop =
        startTop + (targetTop - startTop) * progress;
      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  };
  /*const handleGradualScale = (
    targetScale: number,
    duration: number
  ) => {
    const container = containerRef.current;
    if (!container) return;

    const startTime = performance.now();
    const startScale = scale;

    const animateScale = (timestamp: number) => {
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const newScale = startScale + (targetScale - startScale) * progress;
      setScale(newScale);
      contentRef.current!.style.transform = `scale(${newScale})`;
      if (progress < 1) {
        requestAnimationFrame(animateScale);
      }
    };

    requestAnimationFrame(animateScale);
  };*/

  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

    const rect = container.getBoundingClientRect();

    content.style.transformOrigin = `${0}px ${0}px`;
    content.style.transform = `scale(${scale})`;

    const handleMouseDown = (e: MouseEvent) => {
      e.preventDefault();
      setIsDragging(true);
      setDragStart({ x: e.clientX, y: e.clientY });
    };

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
      const maxSpeed = 25;
      const minSpeed = 9;

      if (
        (e.deltaY > 0 && e.deltaY < minSpeed) ||
        (e.deltaY < 0 && e.deltaY > -1 * minSpeed)
      ) {
        setScrolling(0);
        console.log(scrolling);
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

      if (e.deltaY > maxSpeed) {
        delta = maxSpeed;
      } else if (e.deltaY < -1 * maxSpeed) {
        delta = -1 * maxSpeed;
      } else {
        delta = e.deltaY;
      }

      const zoomSpeed = 0.001;
      if (delta < 0) {
        setScale(Math.max(0.45, scale * (1 + delta * zoomSpeed)));
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

  useEffect(() => {
    if (zoomToCoordinate && prevZoomToCoordinate.current !== zoomToCoordinate) {
      const container = containerRef.current;
      const content = contentRef.current;

      if (!container || !content) return;

      const rect = container.getBoundingClientRect();
      const newScale = 0.9;

      setScale(newScale);
      content.style.transform = `scale(${newScale})`;

      const targetLeft =
        zoomToCoordinate.x * newScale - rect.width / 2 + rect.left;
      const targetTop =
        zoomToCoordinate.y * newScale - rect.height / 2 + rect.top;

      setLocX((container.scrollLeft + targetLeft - rect.left) / newScale);
      setLocY((container.scrollTop + targetTop - rect.top) / newScale);

      setTimeout(() => {
        handleGradualScroll(targetLeft, targetTop, 280);
        content.style.transform = `scale(${newScale})`;
      }, 600);
    } else if (!zoomToCoordinate && prevZoomToCoordinate.current) {
      const container = containerRef.current;
      const content = contentRef.current;

      if (!container || !content) return;

      setTimeout(() => {
        handleGradualScroll(400, 400, 100);
        setScale(0.45);
      }, 600);
    }

    prevZoomToCoordinate.current = zoomToCoordinate;
  }, [zoomToCoordinate]);

  return (
    <div className="transform-container" ref={containerRef}>
      <div className="content-container" ref={contentRef}>
        {children}
      </div>
    </div>
  );
};

export default TransformContainer;
