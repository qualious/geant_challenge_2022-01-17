import React, {
  useState,
  FC,
  ChangeEvent,
  Dispatch,
  SetStateAction,
  ReactElement,
} from "react";
import { useRoutes, BrowserRouter } from "react-router-dom";
import throttle from "lodash.throttle";
import { checkToken, login, register } from "./utils/token";
import { useEffect } from "react";
import { DebouncedFunc } from "lodash";
import { Songs } from "./components/Songs";

import { Home } from "./containers/Home";
import { NotFound } from "./containers/NotFound";

interface RoutesProps {
  isLoggedIn: boolean;
}

const Routes: FC<RoutesProps> = ({
  isLoggedIn,
}: RoutesProps): ReactElement | null =>
  useRoutes([
    { path: "/", element: <Home isLoggedIn={isLoggedIn} /> },
    { path: "/home", element: <Home isLoggedIn={isLoggedIn} /> },
    { path: "/songs", element: <Songs isLoggedIn={isLoggedIn} /> },
    {
      path: "/songs/:id",
      element: <Songs isLoggedIn={isLoggedIn} />,
    },
    { path: "*", element: <NotFound /> },
  ]);

const App: FC<{}> = (): JSX.Element => {
  const [isRegister, setIsRegister] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const hasToken: DebouncedFunc<
    (setIsLoggedIn: Dispatch<SetStateAction<boolean>>) => void
  > = throttle(
    (setIsLoggedIn: Dispatch<SetStateAction<boolean>>) =>
      checkToken(setIsLoggedIn),
    5000,
    {
      leading: true,
    }
  );
  useEffect(() => {
    hasToken(setIsLoggedIn);
  }, [hasToken]);
  if (!isLoggedIn) {
    return (
      <header>
        {isLoggedIn ? (
          <span>Welcome to S O N G S</span>
        ) : (
          <div
            style={{
              padding: 5,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex" }}>
              <h1
                style={{ opacity: isRegister ? 0.2 : 1, cursor: "pointer" }}
                onClick={() => setIsRegister(false)}
              >
                Login
              </h1>
              <h1>|</h1>
              <h1
                style={{ opacity: isRegister ? 1 : 0.2, cursor: "pointer" }}
                onClick={() => setIsRegister(true)}
              >
                Register
              </h1>
            </div>
            <input
              type="text"
              value={username}
              placeholder="username"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setUsername(e.target.value)
              }
            />
            {isRegister && (
              <input
                type="text"
                value={email}
                placeholder="email"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
              />
            )}
            <input
              type="password"
              value={password}
              placeholder="password"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
            />
            <button
              onClick={() => {
                if (isRegister) {
                  register(username, email, password, setIsLoggedIn);
                } else {
                  login(username, password, setIsLoggedIn);
                }
              }}
            >
              Login
            </button>
          </div>
        )}
      </header>
    );
  }
  return (
    <BrowserRouter>
      <Routes isLoggedIn={isLoggedIn} />
    </BrowserRouter>
  );
};

export default App;
