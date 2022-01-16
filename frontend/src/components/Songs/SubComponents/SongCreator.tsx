import React, { ChangeEvent, FC, useState } from "react";
import { addSong } from "../queries";
import { SongCreatorProps } from "../types";

const SongCreator: FC<SongCreatorProps> = () => {
  const [title, setTitle] = useState<string>("");
  const [artist, setArtist] = useState<string>("");

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <input
        type="text"
        value={title}
        placeholder="Title"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setTitle(e.target.value)
        }
      />
      <input
        type="text"
        value={artist}
        placeholder="Artist"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setArtist(e.target.value)
        }
      />
      <button
        onClick={() => {
          addSong(title, artist);
          setTitle("");
          setArtist("");
        }}
      >
        Add Song
      </button>
    </div>
  );
};

export default SongCreator;
