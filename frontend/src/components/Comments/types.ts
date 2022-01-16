import { Dispatch, SetStateAction } from "react";

export interface Comment {
  id: number;
  song_id: number;
  user_id: number;
  data: string;
}

export interface HeaderProps {
  isSingle: boolean;
  setShowComments: (show: boolean) => void;
}

export interface CommentsProps extends HeaderProps {
  songId: number;
}

export interface CommentCreatorProps {
  songId: number;
}

export interface ListProps {
  data: Array<Comment>;
  userId: number;
  songId: number;
}
