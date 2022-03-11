import React from "react";
import { DefaultNode } from "@visx/network";
import { useHistory } from "react-router-dom";

import { COMPANY_SUPPLIERS_ROUTE } from "../../../../lib/router/constants";

import css from './index.module.css';

type NetworkGraphNodeProps = {
  node: {
    isCenter?: boolean;
    id: string;
  };
};

const NetworkGraphNode: React.FC<
  React.ComponentProps<typeof DefaultNode> & NetworkGraphNodeProps
> = (props) => {
  const {
    node: { id, isCenter },
  } = props;

  console.log("NetworkGraphNode props", props);
  const history = useHistory();

  return isCenter ? (
    <DefaultNode fill="#fff" r={30} />
  ) : (
    <g className={css.nodeWrapper}>
      <DefaultNode
        // style={{ pointerEvents: "bounding-box" as any }}
        onClick={() => {
          console.log("onClick");
          history.push(`${COMPANY_SUPPLIERS_ROUTE}/${id}`);
        }}
      />
      <text fill="#fff" transform="translate(-150 35)" className={css.nodeID}>{id}</text>
    </g>
  );
};

export default NetworkGraphNode;
