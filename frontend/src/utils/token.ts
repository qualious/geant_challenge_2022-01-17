import { request } from "./request";

const keys: Readonly<Array<string>> = <const>[
  "access_token",
  "refresh_token",
  "expires_in",
  "user_id",
];

export const getToken = (): string | null => localStorage.getItem(keys[0]);
export const getUserId = (): number => Number(localStorage.getItem("user_id"));

export const checkToken = (
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
): void => {
  const token = getToken();
  if (token) {
    const expires_in = localStorage.getItem("expires_in");
    const last = localStorage.getItem("last");
    if (last) {
      const lastDate = new Date(last);
      lastDate.setSeconds(lastDate.getSeconds() + Number(expires_in));
      // NOTE: NOT IMPLEMENTED.
      if (new Date() > lastDate) {
        return setIsLoggedIn(false);
        // return refreshToken();
      } else {
        return setIsLoggedIn(true);
        // return validateToken(token);
      }
    } else {
      out();
      return setIsLoggedIn(false);
    }
  }
  return setIsLoggedIn(false);
};
export const out = (): void => {
  keys.forEach((key) => localStorage.removeItem(key));
  window.location.href = "http://localhost:3000/";
};

export const register = (
  username: string,
  email: string,
  password: string,
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
): void => {
  const url: string = `${process.env.REACT_APP_BACKEND_URL}/users/`;
  const options: RequestInit = {
    method: "POST",
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      "Content-Type": "application/json",
    },
    credentials: "omit",
    body: JSON.stringify({ nickname: username, email, password }),
  };
  request(url, options)
    .then((resp: any) => {
      if (keys.every((key) => resp[key])) {
        keys.forEach((key) => localStorage.setItem(key, resp[key] || ""));
        localStorage.setItem("last", new Date().toISOString());
        return setIsLoggedIn(true);
      } else {
        out();
        return setIsLoggedIn(false);
      }
    })
    .catch(() => setIsLoggedIn(false));
};

export const login = (
  username: string,
  password: string,
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
): void => {
  const url: string = `${process.env.REACT_APP_BACKEND_URL}/users/token`;
  const options: RequestInit = {
    method: "POST",
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    credentials: "omit",
    body: `grant_type=&username=${username}&password=${password}&scope=&client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}`,
  };
  request(url, options)
    .then((resp: any) => {
      if (keys.every((key) => resp[key])) {
        keys.forEach((key) => localStorage.setItem(key, resp[key] || ""));
        localStorage.setItem("last", new Date().toISOString());
        return setIsLoggedIn(true);
      } else {
        out();
        return setIsLoggedIn(false);
      }
    })
    .catch(() => setIsLoggedIn(false));
};
// NOTE: These two are here just for placeholders. The backend doesn't have
// refresh token or token validation. It should have it, but yeah.
export const refreshToken = () => {};
export const validateToken = (token: string): void => console.log(token);
