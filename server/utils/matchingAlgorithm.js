const calculateMatchScore = (missingCase, foundReport) => {
  let score = 0;

  const missingGender = String(
    missingCase.gender || ""
  ).toLowerCase();

  const foundGender = String(
    foundReport.gender || ""
  ).toLowerCase();

  if (
    missingGender &&
    foundGender &&
    missingGender === foundGender
  ) {
    score += 25;
  }

  if (
    missingCase.age &&
    foundReport.age &&
    Math.abs(missingCase.age - foundReport.age) <= 3
  ) {
    score += 25;
  }

  const missingLocation = String(
    missingCase.lastSeenLocation || ""
  ).toLowerCase();

  const foundLocation = String(
    foundReport.foundLocation || ""
  ).toLowerCase();

  if (
    missingLocation &&
    foundLocation &&
    (
      missingLocation.includes(foundLocation) ||
      foundLocation.includes(missingLocation)
    )
  ) {
    score += 25;
  }

  const missingClothing = String(
    missingCase.clothingDescription || ""
  )
    .toLowerCase()
    .split(/\s+/);

  const foundClothing = String(
    foundReport.clothingDescription || ""
  )
    .toLowerCase()
    .split(/\s+/);

  const commonWords = missingClothing.filter(
    (word) =>
      word.length > 2 &&
      foundClothing.includes(word)
  );

  if (commonWords.length > 0) {
    score += 25;
  }

  return score;
};

module.exports = calculateMatchScore;