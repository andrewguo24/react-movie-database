import React from "react";

const Like = props => {
  const { liked, onClick } = props;
  let classes = "fa fa-heart";
  if (!liked) classes += "-o"; //if this.props.liked is false then classese = "fa fa-heart-o"
  return (
    <i
      onClick={onClick}
      style={{ cursor: "pointer" }}
      className={classes}
      aria-hidden="true"
    />
  );
};

export default Like;
