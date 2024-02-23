import { useContext } from "react";
import { TokenContext } from "../../contexts/tokenContext";

export default function Example() {
  const { idToken, signOutMethod } = useContext(TokenContext);

  function signOuttt() {
    signOutMethod();
  }
  function printToken() {}

  return (
    <>
      <h1>Example</h1>
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
