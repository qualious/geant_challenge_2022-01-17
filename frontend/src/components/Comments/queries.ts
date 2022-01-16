import { queryClient } from "../..";
import { getToken } from "../../utils/token";

export const getCommentData = (songId: number) =>
  fetch(`${process.env.REACT_APP_BACKEND_URL}/comments/${songId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
      accept: "application/json",
    },
  }).then((res) => res.json());

export const addComment = (songId: number, comment: string) =>
  fetch(`${process.env.REACT_APP_BACKEND_URL}/comments/${songId}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify({ song_id: songId, data: comment }),
  }).then((res) => {
    queryClient.invalidateQueries(["commentsOf", songId]);
    return res.json();
  });

export const deleteComment = (songId: number, id: number) =>
  fetch(`${process.env.REACT_APP_BACKEND_URL}/comments/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
      accept: "application/json",
    },
  }).then((res) => {
    queryClient.invalidateQueries(["commentsOf", songId]);
    return res.json();
  });
