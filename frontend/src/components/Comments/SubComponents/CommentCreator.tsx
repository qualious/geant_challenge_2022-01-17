import React, { ChangeEvent, FC, useState } from "react";
import { addComment } from "../queries";
import { CommentCreatorProps } from "../types";

const CommentCreator: FC<CommentCreatorProps> = ({
  songId,
}: CommentCreatorProps): JSX.Element => {
  const [comment, setComment] = useState<string>("");
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <input
        type="text"
        value={comment}
        placeholder="Comment"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setComment(e.target.value)
        }
      />
      <button
        onClick={() => {
          addComment(songId, comment);
          setComment("");
        }}
      >
        Add Comment
      </button>
    </div>
  );
};

export default CommentCreator;
