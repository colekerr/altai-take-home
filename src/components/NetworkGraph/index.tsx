import React from "react";
import { Graph, DefaultLink, DefaultNode } from "@visx/network";
import { useParams } from "react-router-dom";

import buildPlacedGraphNodes, {
  PlacedGraphNode,
} from "./lib/buildPlacedGraphNodes";
import css from "./index.module.css";
import NetworkGraphNode from './subcomponents/NetworkGraphNode'
import { SVG_CENTER, SVG_DIMENSION } from "./lib/constants";

type NetworkGraphProps = {
  supplierIDs: string[];
};

const SVG_VIEWBOX = `0 0 ${SVG_DIMENSION} ${SVG_DIMENSION}`;

// const nodes = [
//   { id: "1", x: SVG_CENTER, y: SVG_CENTER, isCenter: true },
//   ...buildPlacedGraphNodes([
//     { id: "2" },
//     { id: "3" },
//     { id: "4" },
//     { id: "4" },
//     { id: "5" },
//   ]),
// ];

const buildNodes = (centralNodeID: string, supplierIDs: string[]) => {
  return [
    { id: centralNodeID, x: SVG_CENTER, y: SVG_CENTER, isCenter: true },
    ...buildPlacedGraphNodes(
      supplierIDs.map((curSupplierID) => {
        return { id: curSupplierID };
      })
    ),
  ];
};

type CompanyGraphNode = PlacedGraphNode<{ id: string }>;

type Edge = { source: CompanyGraphNode; target: CompanyGraphNode };

const buildEdges = (nodes: CompanyGraphNode[]): Edge[] => {
  if (!nodes.length) {
    return [];
  }

  const [centralNode, ...edgeNodes] = nodes;

  return edgeNodes.reduce<Edge[]>((acc, curEdgeNode) => {
    acc.push({ source: centralNode, target: curEdgeNode });

    return acc;
  }, []);
};

const NetworkGraph: React.FC<NetworkGraphProps> = (props) => {
  const { supplierIDs } = props;

  const { companyID: centralNodeID } = useParams<{ companyID: string }>();

  const nodes = buildNodes(centralNodeID, supplierIDs);

  return (
    <div className={css.wrapper}>
      <svg className={css.svg} viewBox={SVG_VIEWBOX}>
        <Graph
          graph={{
            nodes,
            links: buildEdges(nodes),
          }}
          linkComponent={DefaultLink}
          nodeComponent={NetworkGraphNode as typeof DefaultNode}
        />
      </svg>
    </div>
  );
};

export default NetworkGraph;
