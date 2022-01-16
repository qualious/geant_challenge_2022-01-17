import { Dispatch, SetStateAction } from "react";

export interface Song {
  id: number;
  title: string;
  artist: string;
}

export interface SongsProps {
  isLoggedIn: boolean;
}

export interface SongCreatorProps {}

export interface HeaderProps {
  isSingle: boolean;
  showInput: boolean;
  setShowInput: Dispatch<SetStateAction<boolean>>;
}

export interface ListProps {
  data: Array<Song> | undefined;
  selectedId: number;
  setSelectedId: Dispatch<SetStateAction<number>>;
  setShowComments: Dispatch<SetStateAction<boolean>>;
}
