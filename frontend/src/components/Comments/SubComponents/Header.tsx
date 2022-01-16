import React, { FC } from "react";
import { HeaderProps } from "../types";

const Header: FC<HeaderProps> = ({
  isSingle,
  setShowComments,
}: HeaderProps) => (
  <header style={{ display: "flex", justifyContent: "center" }}>
    <h2>Comments</h2>
    {!isSingle && (
      <h2
        style={{ cursor: "pointer", marginLeft: 20, color: "red" }}
        onClick={() => setShowComments(false)}
      >
        x
      </h2>
    )}
  </header>
);

export default Header;
