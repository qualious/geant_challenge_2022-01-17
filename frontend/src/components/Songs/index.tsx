import { useParams } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import React, { FC, Suspense, useState } from "react";
import { useQuery, QueryErrorResetBoundary } from "react-query";

import { Comments } from "../Comments";
import { getSongData } from "./queries";
import { Song, SongsProps } from "./types";
import { NotFound } from "../../containers/NotFound";
import { Header, List, SongCreator, Single } from "./SubComponents";

export const Songs: FC<SongsProps> = ({
  isLoggedIn,
}: SongsProps): JSX.Element => {
  const { id } = useParams();
  const [showInput, setShowInput] = useState<boolean>(false);
  const [showComments, setShowComments] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<number>(0);
  const { data }: { data: Array<Song> | undefined } = useQuery(
    "songData",
    getSongData,
    {
      useErrorBoundary: true,
    }
  );
  if (!isLoggedIn) return <></>;
  if (id) {
    if (!Number.isNaN(Number(id))) return <Single />;
    else return <NotFound />;
  }
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => {
        return (
          <ErrorBoundary
            fallbackRender={({ error, resetErrorBoundary }) => (
              <div>
                There was an error!
                <button onClick={() => resetErrorBoundary()}>Try again</button>
                <pre style={{ whiteSpace: "normal" }}>{error.message}</pre>
              </div>
            )}
            onReset={reset}
          >
            <Suspense fallback={<span>loading...</span>}>
              <Header
                isSingle={false}
                showInput={showInput}
                setShowInput={setShowInput}
              />
              {showInput && <SongCreator />}
              <List
                data={data}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
                setShowComments={setShowComments}
              />
              {showComments && (
                <Comments
                  isSingle={false}
                  songId={selectedId}
                  setShowComments={(show: boolean) => {
                    if (!show) {
                      setSelectedId(0);
                    }
                    setShowComments(show);
                  }}
                />
              )}
            </Suspense>
          </ErrorBoundary>
        );
      }}
    </QueryErrorResetBoundary>
  );
};
