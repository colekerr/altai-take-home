import React from "react";
import { Graph, DefaultLink, DefaultNode } from "@visx/network";

import { SVG_CENTER, SVG_DIMENSION } from "./lib/constants";

import css from "./index.module.css";

const SVG_VIEWBOX = `0 0 ${SVG_DIMENSION} ${SVG_DIMENSION}`;

const nodes = [{ id: "1", x: SVG_CENTER, y: SVG_CENTER, isCenter: true }];

const dataSample = {
  nodes,
  links: [
    { source: nodes[0], target: nodes[1] },
    { source: nodes[0], target: nodes[2] },
    // { source: nodes[0], target: nodes[3] },
    // { source: nodes[0], target: nodes[4] },
    // { source: nodes[0], target: nodes[5] },
  ],
};

const NetworkGraph = () => (
  <div className={css.wrapper}>
    <svg viewBox={SVG_VIEWBOX}>
      <Graph
        graph={dataSample}
        linkComponent={DefaultLink}
        nodeComponent={DefaultNode}
      />
    </svg>
  </div>
);

export default NetworkGraph;
