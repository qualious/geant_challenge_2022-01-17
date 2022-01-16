import React, { FC, Suspense } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { NotFound } from "../../../containers/NotFound";
import { Comments } from "../../Comments";
import { getSongDetail } from "../queries";
import { Song } from "../types";
import { Header, List } from ".";

const Single: FC<{}> = () => {
  const { id } = useParams();
  const { data }: { isLoading: boolean; error: any; data: Song | undefined } =
    useQuery(`songs/${id}`, () => getSongDetail(Number(id)));
  if (data && !data.hasOwnProperty("id")) return <NotFound />;
  return (
    <Suspense fallback={<span>loading...</span>}>
      <Header isSingle showInput={false} setShowInput={() => {}} />
      <List
        data={[data as Song]}
        selectedId={Number(id)}
        setSelectedId={() => {}}
        setShowComments={() => {}}
      />
      <Comments isSingle songId={Number(id)} setShowComments={() => {}} />
    </Suspense>
  );
};

export default Single;
