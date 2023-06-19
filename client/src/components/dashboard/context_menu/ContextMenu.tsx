import { Action } from "@/lib/types";
import React from "react";
import { IconContext } from "react-icons";

type Props = {
  actions: Array<Action>;
  isVisible: boolean;
  x: number;
  y: number;
};

const ContextMenu = (props: Props) => {
  const renderActions = props.actions.map((action) => {
    return (
      <button
        className="action-menu-container"
        onClick={action.onPressAction}
        key={action.name}
      >
        {action.icon}
        <span className="action-name">{action.name}</span>
      </button>
    );
  });

  return (
    <>
      <IconContext.Provider
        value={{ className: "action-menu-icon", size: "1.2rem" }}
      >
        <div
          className="actions-context-menu-container"
          style={{ display: props.isVisible ? "flex" : "none", top: props.y, left: props.x }}
        >
          {renderActions}
        </div>
      </IconContext.Provider>
    </>
  );
};

export default ContextMenu;
