import React, { FC } from "react";
import { out } from "../../utils/token";
import { deleteAccount } from "./queries";
import { Songs } from "../../components/Songs";

interface HomeProps {
  isLoggedIn: boolean;
}

export const Home: FC<HomeProps> = ({ isLoggedIn }: HomeProps): JSX.Element => {
  if (!isLoggedIn) return <></>;
  return (
    <div>
      <header
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1>Welcome to S O N G S</h1>
        <span style={{ color: "blue", cursor: "pointer" }} onClick={out}>
          Log Out
        </span>
        <span
          style={{ color: "red", cursor: "pointer" }}
          onClick={deleteAccount}
        >
          Delete Account
        </span>
      </header>
      <Songs isLoggedIn={isLoggedIn} />
    </div>
  );
};
