import React from "react";

export default function Films(props) {
  return (
    <React.Fragment>
      <p style={{ color: "white" }}>{props.films}</p>
    </React.Fragment>
  );
}
