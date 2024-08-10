import React from "react";
import "./style.css";
import { Tag } from "antd";

interface Props {
  count?: number;
}

const CountComponent = (props: Props) => {
  if (!props.count) {
    return <Tag color="error">No Matching found</Tag>;
  }

  return <Tag color="success">Count: {props.count}</Tag>;
};

function AdditionalInfo(props: Props) {
  return (
    <div className="additional-info">
      <CountComponent {...props} />
    </div>
  );
}

export default AdditionalInfo;
