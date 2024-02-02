import { useLocation } from "react-router-dom";
import NameDropDown from "../components/index/nameDropDown";
import TimeBlockPreview from "./oldPages/TimeBlockPreview";
import ReturnBtn from "../components/returnBtn";

export default function ChoicesPage() {
  const location = useLocation();
  const { renderIdentifier } = location.state || {};

  return (
    <>
      <h1>Valitsemasi laatikko: {renderIdentifier}</h1>
      <ReturnBtn message="🡨 palaa etusivulle" />
      <NameDropDown />
      <TimeBlockPreview />
    </>
  );
}
