import { queryClient } from "../..";
import { getToken, out } from "../../utils/token";

export const deleteAccount = () =>
  fetch(
    // NOTE: It is bad practice to send a request with the value
    // stored in localStorage since it can be changed, but we are checking the ID on
    // backend storage side and it's a task, so 🤷 I'd normally store this in a global store/context.
    `${process.env.REACT_APP_BACKEND_URL}/users/${localStorage.getItem(
      "user_id"
    )}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
        accept: "application/json",
      },
    }
  ).then((res) => {
    queryClient.invalidateQueries(["songData"]);
    out();
    return res.json();
  });
