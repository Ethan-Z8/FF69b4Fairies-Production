import React, { ReactNode, useRef, useEffect } from "react";
import "../styling/TransformContainer.css";
//import {Simulate} from "react-dom/test-utils";
//import drag = Simulate.drag;
//import {max} from "@popperjs/core/lib/utils/math";

interface TransformContainerProps {
  children: ReactNode;
}

const TransformContainer: React.FC<TransformContainerProps> = ({
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;

    if (!container || !content) return;

    let isDragging = false;
    let dragStart = { x: 0, y: 0 };
    let scale = 1;

    const handleMouseDown = (e: MouseEvent) => {
      e.preventDefault();
      isDragging = true;
      dragStart = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      const deltaX = e.clientX - dragStart.x;
      const deltaY = e.clientY - dragStart.y;

      container.scrollLeft -= deltaX;
      container.scrollTop -= deltaY;

      dragStart = { x: e.clientX, y: e.clientY };
    };
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      let delta = 0;
      const maxSpeed = 20;
      const minSpeed = 6;

      if (e.deltaY > maxSpeed) delta = maxSpeed;
      else if (e.deltaY < -1 * maxSpeed) delta = -1 * maxSpeed;
      else if (
        (e.deltaY > 0 && e.deltaY < minSpeed) ||
        (e.deltaY < 0 && e.deltaY > -1 * minSpeed)
      )
        delta = 0;
      else delta = e.deltaY;

      const zoomSpeed = 0.005;

      if (delta < 0) {
        scale = Math.max(1, scale * (1 + delta * zoomSpeed));
      } else {
        scale = Math.min(3, scale * (1 + delta * zoomSpeed));
      }

      // const rect = container.getBoundingClientRect();
      // const mouseX = e.clientX - rect.left;
      // const mouseY = e.clientY - rect.top;

      //const contentX = mouseX + rect.width / 2;
      //const contentY = mouseY + rect.width / 2;

      content.style.transformOrigin = `${0}px ${0}px`;
      content.style.transform = `scale(${scale})`;
      //translate(100%, 100%)`;
    };

    const handleMouseUp = () => {
      isDragging = false;
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
  }, []);

  return (
    <div className="transform-container" ref={containerRef}>
      <div className="content-container" ref={contentRef}>
        {children}
      </div>
    </div>
  );
};

export default TransformContainer;
