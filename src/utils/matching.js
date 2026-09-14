export const calculateMatch = (missing, found) => {
  let score = 0;
  const factors = [];

  // Gender
  if (
    missing.gender?.toLowerCase() ===
    found.gender?.toLowerCase()
  ) {
    score += 25;
    factors.push("Gender");
  }

  // Age
  if (
    Math.abs(Number(missing.age) - Number(found.age)) <= 2
  ) {
    score += 20;
    factors.push("Approximate Age");
  }

  // Location
  if (
    missing.location?.toLowerCase() ===
    found.location?.toLowerCase()
  ) {
    score += 30;
    factors.push("Location");
  }

  // Clothing
  if (
    missing.clothing
      ?.toLowerCase()
      .includes(found.clothing?.toLowerCase()) ||
    found.clothing
      ?.toLowerCase()
      .includes(missing.clothing?.toLowerCase())
  ) {
    score += 15;
    factors.push("Clothing");
  }

  // Description
  const missingWords =
    missing.description?.toLowerCase().split(" ") || [];

  const foundDescription =
    found.description?.toLowerCase() || "";

  const descriptionMatch = missingWords.some((word) =>
    word.length > 4 && foundDescription.includes(word)
  );

  if (descriptionMatch) {
    score += 10;
    factors.push("Description");
  }

  return {
    score,
    factors,
    isMatch: score >= 50,
  };
};
