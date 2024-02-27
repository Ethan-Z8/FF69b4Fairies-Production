import React from "react";
import { MapNodeInterface } from "common/src/interfaces/MapNodeInterface.ts";

type Node = MapNodeInterface;

interface StartEndSelectProps {
  node: MapNodeInterface | Node | null;
  localPosition: { x: number | null; y: number | null };
}

function MouseClickMenu({ node, localPosition }: StartEndSelectProps) {
  return (
    <div style={{ position: "absolute", zIndex: -600 }}>
      {localPosition && (
        <div>
          {node != null ? (
            <div
              style={{
                bottom: `${localPosition.y}`,
                left: `${localPosition.x}`,
              }}
            >
              <div>{node.longName}</div>
              <div>Set Start</div>
              <div>Set End</div>
              <div>Services</div>
            </div>
          ) : (
            <div> Loading circle </div>
          )}
        </div>
      )}
    </div>
  );
}

export default MouseClickMenu;
