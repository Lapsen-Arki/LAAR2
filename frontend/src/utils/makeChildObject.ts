// Makes object including childs name and age

export default function makeChildObject() {
  const childProfilesJSON = sessionStorage.getItem("childProfiles");
  const childNameAndAge = sessionStorage.getItem("childNameAndAge");
  if (childProfilesJSON && !childNameAndAge) {
    // Parse the JSON string back into an array of objects
    const childProfiles = JSON.parse(childProfilesJSON);

    // Function to calculate age in months from birthdate
    const calculateAgeInMonths = (birthdate: Date) => {
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

    sessionStorage.setItem("childNameAndAge", childNameAndAge);

    console.log(childNamesAndAges);
  }
}
