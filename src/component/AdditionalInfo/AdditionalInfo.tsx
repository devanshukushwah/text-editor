import React from "react";
import "./style.css";
import { Tag } from "antd";
import Content from "../../interface/Content";

const CountComponent = (props: Content) => {
  if (props.original === props.replaced) {
    return <Tag color="error">No Difference</Tag>;
  }

  return <Tag color="success">Count: {props.matchCount}</Tag>;
};

function AdditionalInfo(props: Content) {
  return (
    <div className="additional-info">
      <CountComponent {...props} />
    </div>
  );
}

export default AdditionalInfo;
