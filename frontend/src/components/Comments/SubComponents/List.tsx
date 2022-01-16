import React, { FC } from "react";
import { deleteComment } from "../queries";
import { ListProps, Comment } from "../types";

const List: FC<ListProps> = ({ data, userId, songId }: ListProps) => (
  <ul style={{ textAlign: "center", listStyleType: "none" }}>
    {Array.isArray(data) &&
      data.map((d: Comment) => (
        <li key={d.id}>
          <span>{d.data}</span>
          {userId === d.user_id && (
            <span
              style={{ color: "red", marginLeft: 10, cursor: "pointer" }}
              onClick={() => deleteComment(songId, d.id)}
            >
              -
            </span>
          )}
        </li>
      ))}
  </ul>
);

export default List;
