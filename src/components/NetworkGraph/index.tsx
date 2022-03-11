import React from "react";
import { Graph, DefaultLink, DefaultNode } from "@visx/network";
import { useParams } from "react-router-dom";

import buildPlacedGraphNodes, {
  PlacedGraphNode,
} from "./lib/buildPlacedGraphNodes";
import css from "./index.module.css";
import NetworkGraphNode from "./subcomponents/NetworkGraphNode";
import { SVG_CENTER, SVG_DIMENSION } from "./lib/constants";
import { Table } from "react-bootstrap";
import useQuery from "../../lib/router/useQuery";

type NetworkGraphProps = {
  tierZeroSupplierIDs: string[];
  tierOneSupplierIDs: string[];
};

const SVG_VIEWBOX = `0 0 ${SVG_DIMENSION} ${SVG_DIMENSION}`;

const buildTierOneSupplierRows = (results: string[]): JSX.Element[] => {
  return results.map((curResult, curResultIdx) => {
    return (
      <tr key={curResultIdx}>
        <td>{curResult}</td>
      </tr>
    );
  });
};

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
  const { tierZeroSupplierIDs, tierOneSupplierIDs } = props;

  const { companyID: centralNodeID } = useParams<{ companyID: string }>();

  const edgeSuppliersID = useQuery();
  const showTierOneResults = !!(edgeSuppliersID && tierOneSupplierIDs.length);

  const nodes = buildNodes(centralNodeID, tierZeroSupplierIDs);

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

      {showTierOneResults && (
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>ID</th>
            </tr>
          </thead>
          <tbody>{buildTierOneSupplierRows(tierOneSupplierIDs)}</tbody>
        </Table>
      )}
    </div>
  );
};

export default NetworkGraph;
