import React from "react";
import "@/css/GenericBigButton.css";
import { IconContext } from "react-icons";

type Props = {
  icon: JSX.Element;
  callback: VoidFunction;
};

const GenericBigButton = (props: Props) => {
  return (
    <button className="generic-big-button" onClick={() => props.callback()}>
      <IconContext.Provider
        value={{ className: "big-icon", size: "1.5rem" }}
      >
        {props.icon}
      </IconContext.Provider>
    </button>
  );
};

export default GenericBigButton;
