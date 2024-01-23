const currentDateTime = new Date();

const currentWeekday = currentDateTime.getDay();
const currentDate = currentDateTime.getDate();
const currentMonth = currentDateTime.getMonth();
const currentYear = currentDateTime.getFullYear();
const currentHour = currentDateTime.getHours();
const currentMin = currentDateTime.getMinutes();

const formattedTime = `${currentHour}:${currentMin < 10 ? '0' : ''}${currentMin}`;

const weekdaysInFinnish = ['Sunnuntai', 'Maanantai', 'Tiistai', 'Keskiviikko', 'Torstai', 'Perjantai', 'Lauantai'];
const monthsInFinnish = ['Tammikuu', 'Helmikuu', 'Maaliskuu', 'Huhtikuu', 'Toukokuu', 'Kesäkuu', 'Heinäkuu', 'Elokuu', 'Syyskuu', 'Lokakuu', 'Marraskuu', 'Joulukuu'];

const translatedWeekday = weekdaysInFinnish[currentWeekday];
const translatedMonth = monthsInFinnish[currentMonth];
const formattedMonthNumber = currentMonth  + 1;

const weekdayDayMonthAsString = `${translatedWeekday} ${currentDate}.${formattedMonthNumber}.`;

export {
    currentDateTime,
    currentWeekday,
    currentDate,
    currentMonth,
    currentYear,
    currentHour,
    currentMin,
    formattedTime,
    translatedWeekday,
    translatedMonth,
    formattedMonthNumber,
    weekdayDayMonthAsString
  };