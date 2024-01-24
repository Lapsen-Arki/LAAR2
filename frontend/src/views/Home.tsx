import { useContext } from "react";
import { TokenContext } from "../contexts/tokenContext";

export default function Home() {
  const idToken = useContext(TokenContext);
  console.log(idToken);

  return (
    <>
      <h1>Etusivu</h1>
    </>
  );
}
