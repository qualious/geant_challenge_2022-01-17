import { queryClient } from "../..";
import { getToken } from "../../utils/token";

export const getSongData = () =>
  fetch(`${process.env.REACT_APP_BACKEND_URL}/songs/`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
      accept: "application/json",
    },
  }).then((res) => res.json());

export const getSongDetail = (songId: number) =>
  fetch(`${process.env.REACT_APP_BACKEND_URL}/songs/${songId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
      accept: "application/json",
    },
  }).then((res) => res.json());

export const addSong = (title: string, artist: string) =>
  fetch(`${process.env.REACT_APP_BACKEND_URL}/songs/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify({ title, artist }),
  }).then((res) => {
    queryClient.invalidateQueries("songData");
    return res.json();
  });
