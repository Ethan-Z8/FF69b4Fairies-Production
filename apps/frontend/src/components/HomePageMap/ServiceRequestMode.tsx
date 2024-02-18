import { useEffect, useState } from "react";
import { ServiceRequestType } from "common/src/interfaces/ServiceRequest.ts";
import axios from "axios";
import { MapNodeInterface } from "common/src/interfaces/MapNodeInterface.ts";
import { ServiceRequestNode } from "./ServiceRequestNode.tsx";
import TransformContainer from "./TransformContainer.tsx";

import LL2 from "../../assets/hospitalmaps/00_thelowerlevel2-min.png";
import LL1 from "../../assets/hospitalmaps/00_thelowerlevel1-min.png";
import F1 from "../../assets/hospitalmaps/01_thefirstfloor-min.png";
import F2 from "../../assets/hospitalmaps/02_thesecondfloor-min.png";
import F3 from "../../assets/hospitalmaps/03_thethirdfloor-min.png";

const maps = { L2: LL2, L1: LL1, "1": F1, "2": F2, "3": F3 };
export interface ServiceRequestModeProps {
  nodes: MapNodeInterface[];
  currentFloor: "L2" | "L1" | "1" | "2" | "3";
}
export function ServiceRequestMode({
  nodes,
  currentFloor,
}: ServiceRequestModeProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedNode, setSelectedNode] = useState("");
  const [serviceRequests, setServiceRequests] = useState<ServiceRequestType[]>(
    [],
  );

  useEffect(() => {
    axios
      .get("/api/serviceRequest")
      .then((res) => setServiceRequests(res.data))
      .catch((err) => console.log(err.message));
  }, []);

  const reqsPerLocation = serviceRequests.reduce(
    (acc, req) => {
      acc[req.location] = ++acc[req.location] || 1;
      return acc;
    },
    {} as { [key: string]: number },
  );

  const serviceRequestNodes = nodes.map((node) => (
    <ServiceRequestNode
      nodeInfo={node}
      numRequests={reqsPerLocation[node.nodeID] || 0}
      setSelectedNode={setSelectedNode}
      key={node.nodeID}
    />
  ));

  function getMapImage(currentFloor: keyof typeof maps) {
    return <img src={maps[currentFloor]} />;
  }
  return (
    <TransformContainer>
      {getMapImage(currentFloor)}
      {serviceRequestNodes}
    </TransformContainer>
  );
}
