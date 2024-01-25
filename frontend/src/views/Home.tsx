import { useContext } from "react";
import { TokenContext } from "../contexts/tokenContext";

// PYYHI TESTI ROSKAT POIS JOS TULET TEKEMÄÄN

export default function Home() {
  const { isLoggedIn, idToken, signOutMethod } = useContext(TokenContext);

  function signOuttt() {
    console.log("logging out");

    signOutMethod();
  }
  function printToken() {
    console.log(idToken);
    console.log(isLoggedIn);
  }

  return (
    <>
      <h1>Etusivu</h1>
      <button onClick={signOuttt}>signOut</button>
      <button onClick={printToken}>printToken</button>
    </>
  );
}

/* 
export default function Home() {
  return (
    <>
      <h1>Etusivu</h1>
    </>
  );
}
*/
