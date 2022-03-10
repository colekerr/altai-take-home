import memoize from 'fast-memoize';

import { SVG_CENTER, SVG_EDGE_RADIUS, TOTAL_CIRCLE_RADIANS } from "./constants";

type BaseGraphNode = {
  x: number;
  y: number;
};

export type PlacedGraphNode<T = {}> = T & BaseGraphNode;

/**
 * @returns theta of graph node within circle in radians
 *  */
const calcNodeTheta = (nodesCount: number, nodeIdx: number): number => {
  return (TOTAL_CIRCLE_RADIANS * (nodeIdx + 1)) / nodesCount;
};

/**
 *
 * @description for a point P, coords[P] = [x[center] + radius * cos(theta[P]), y[center] + radius * sin(theta[P])]
 * @param nodesCount number of edge nodes (this does NOT include the center node)
 * @param nodeIdx index of node within list
 * @returns x and y coordinates of node within an evenly spaced web of nodes with a little trigonometry
 */
const calcNodeCoords = memoize((nodesCount: number, nodeIdx: number): BaseGraphNode => {
  const nodeTheta = calcNodeTheta(nodesCount, nodeIdx);

  return {
    x: SVG_CENTER + SVG_EDGE_RADIUS * Math.cos(nodeTheta),
    y: SVG_CENTER + SVG_EDGE_RADIUS * Math.sin(nodeTheta),
  };
});

/**
 *
 * @param edgeNodes list of edge nodes (this does NOT include the center node)
 * @returns edge nodes with coordinate information within an evenly spaced network graph
 */
const buildPlacedGraphNodes = <T extends Record<string, unknown>>(
  edgeNodes: T[]
): PlacedGraphNode<T>[] => {
  const nodesCount = edgeNodes.length;

  // coords of node(curNodeIdx) is equal to [SVG_CENTER + , ]
  return edgeNodes.map((curNode, curNodeIdx) => {
    return {
      ...curNode,
      ...calcNodeCoords(nodesCount, curNodeIdx),
    };
  });
};

export default buildPlacedGraphNodes;
