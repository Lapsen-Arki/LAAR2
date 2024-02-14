// kalenteri näytetään oikein, huomioiden synttärit ja karkausvuodet
export function calculateAge(birthdate: Date): {
  age: string;
  birthdayWish?: string;
} {
  if (!birthdate) return { age: "" };

  const today = new Date();
  const birthDate = new Date(birthdate);
  const result: { age: string; birthdayWish?: string } = { age: "" };

  if (
    birthDate.getDate() === today.getDate() &&
    birthDate.getMonth() === today.getMonth()
  ) {
    const ageInMilliseconds = today.getTime() - birthDate.getTime();
    const ageInYears = ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25);

    const years = Math.floor(ageInYears);
    const monthsInMilliseconds =
      (ageInYears - years) * (365.25 * 24 * 60 * 60 * 1000);
    const months = Math.floor(
      monthsInMilliseconds / (1000 * 60 * 60 * 24 * (365.25 / 12))
    );
    const daysInMilliseconds =
      monthsInMilliseconds % (1000 * 60 * 60 * 24 * (365.25 / 12));
    const days = Math.floor(daysInMilliseconds / (1000 * 60 * 60 * 24));

    const yearLabel = years === 1 ? "v" : "v";
    const monthLabel = months === 1 ? "kk" : "kk";
    const dayLabel = days === 1 ? "pv" : "pv";

    result.age = `${years}${yearLabel} ${months}${monthLabel} ${days}${dayLabel}`;
    result.birthdayWish = "Hyvää Syntymäpäivää! 🥳🎈";
  } else if (birthDate.getTime() > today.getTime()) {
    const timeDifference = birthDate.getTime() - today.getTime();
    const millisecondsInDay = 1000 * 60 * 60 * 24;
    const daysRemaining = Math.floor(timeDifference / millisecondsInDay);
    const monthsRemaining = Math.floor(daysRemaining / 30);
    const yearsRemaining = Math.floor(monthsRemaining / 12);

    result.age = `Syntymään jäljellä: ${yearsRemaining}v ${monthsRemaining % 12}kk ${daysRemaining % 30}pv`;
  } else {
    const ageInMilliseconds = today.getTime() - birthDate.getTime();
    const ageInYears = ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25);

    const years = Math.floor(ageInYears);
    const monthsInMilliseconds =
      (ageInYears - years) * (365.25 * 24 * 60 * 60 * 1000);
    const months = Math.floor(
      monthsInMilliseconds / (1000 * 60 * 60 * 24 * (365.25 / 12))
    );
    const daysInMilliseconds =
      monthsInMilliseconds % (1000 * 60 * 60 * 24 * (365.25 / 12));
    const days = Math.floor(daysInMilliseconds / (1000 * 60 * 60 * 24));

    const yearLabel = years === 1 ? "v" : "v";
    const monthLabel = months === 1 ? "kk" : "kk";
    const dayLabel = days === 1 ? "pv" : "pv";

    result.age = `${years}${yearLabel} ${months}${monthLabel} ${days}${dayLabel}`;
  }

  return result;
}

// nimen rivinvaihtaja
export function splitNameToFitWidth(name: string, maxLineLength: number) {
  let result = "";
  let lineLength = 0;

  name.split(" ").forEach((word) => {
    if (lineLength + word.length > maxLineLength) {
      result += "\n";
      lineLength = 0;
    }

    result += word + " ";
    lineLength += word.length + 1; // +1 for the space
  });

  return result.trim();
}
