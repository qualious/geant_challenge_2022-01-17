import React, { FC } from "react";
import { HeaderProps } from "../types";

const Header: FC<HeaderProps> = ({
  isSingle,
  showInput,
  setShowInput,
}: HeaderProps) => (
  <header style={{ display: "flex", justifyContent: "center" }}>
    <h2>Songs</h2>
    {!isSingle && (
      <h2
        style={{ cursor: "pointer", marginLeft: 20, color: "red" }}
        onClick={() => setShowInput(!showInput)}
      >
        {showInput ? "x" : "+"}
      </h2>
    )}
  </header>
);

export default Header;
