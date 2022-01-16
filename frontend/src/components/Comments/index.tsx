import React, { ChangeEvent, FC, Suspense, useState } from "react";
import { useQuery } from "react-query";
import { CommentsProps } from "./types";
import { getCommentData } from "./queries";
import { getUserId } from "../../utils/token";
import { CommentCreator, Header, List } from "./SubComponents";

export const Comments: FC<CommentsProps> = ({
  songId,
  setShowComments,
}: CommentsProps): JSX.Element => {
  const userId = getUserId();
  const {
    isLoading: loading,
    error,
    data,
  } = useQuery(["commentsOf", songId], () => getCommentData(songId));
  if (error) {
    return <span>Error :/</span>;
  }
  return (
    <Suspense fallback={<div>{loading && "loading..."}</div>}>
      <Header isSingle setShowComments={setShowComments} />
      <CommentCreator songId={songId} />
      <List data={data} userId={userId} songId={songId} />
    </Suspense>
  );
};
