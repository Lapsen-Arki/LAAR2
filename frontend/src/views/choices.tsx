import { useLocation } from "react-router-dom";

export default function ChoicesPage() {
  const location = useLocation();
  const { renderIdentifier } = location.state || {};

  return (
    <>
      <h1>Valitsemasi laatikko: {renderIdentifier}</h1>
    </>
  );
}
