import React, { FC } from "react";
import { ListProps, Song } from "../types";

const List: FC<ListProps> = ({
  data,
  selectedId,
  setSelectedId,
  setShowComments,
}: ListProps) => (
  <ul style={{ textAlign: "center", listStyleType: "none" }}>
    {data &&
      Array.isArray(data) &&
      data.map((d: Song) => (
        <li
          style={{
            cursor: "pointer",
            fontWeight: d.id === selectedId ? "bold" : "normal",
            color: d.id === selectedId ? "#000" : "#333",
            opacity: selectedId ? (d.id === selectedId ? "1" : "0.1") : "1",
          }}
          key={d.id}
          onClick={() => {
            setSelectedId(d.id);
            setShowComments(true);
          }}
        >
          <span>
            {d.id}: {d.title}
          </span>
          {" - "}
          <strong>{d.artist}</strong>
        </li>
      ))}
  </ul>
);

export default List;
