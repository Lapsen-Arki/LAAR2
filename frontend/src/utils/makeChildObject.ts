// Makes object including childs name and age
import { ChildProfile } from "../types/types";

// THIS FILE IS:
// Making object of child name and age in months
// And saving it in sessionStorage as "childNameAndAge"

export default function makeChildObject() {
  const childProfilesJSON = sessionStorage.getItem("childProfiles");

  if (childProfilesJSON) {
    // Parse the JSON string back into an array of objects
    const childProfiles = JSON.parse(childProfilesJSON) as ChildProfile[];

    // Function to calculate age in months from birthdate
    const calculateAgeInMonths = (birthdate: string) => {
      const birthDate = new Date(birthdate);
      const differenceInMonths =
        (new Date().getTime() - birthDate.getTime()) / (1000 * 3600 * 24 * 30);
      return Math.floor(differenceInMonths);
    };

    // Transform the array into an object of child names and their ages in months
    const childNamesAndAges = childProfiles.map((child) => ({
      childName: child.childName,
      age: calculateAgeInMonths(child.birthdate),
    }));

    if (childNamesAndAges) {
      sessionStorage.setItem(
        "childNamesAndAges",
        JSON.stringify(childNamesAndAges)
      );
    }
  }
}
