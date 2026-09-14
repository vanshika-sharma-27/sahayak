export function getData(key, fallback = []) {
  const storedData = localStorage.getItem(key);

  if (!storedData) {
    return fallback;
  }

  try {
    return JSON.parse(storedData);
  } catch (error) {
    console.error("Invalid localStorage data:", error);
    return fallback;
  }
}

export function addData(key, newItem) {
  const existingData = getData(key, []);

  const updatedData = [...existingData, newItem];

  localStorage.setItem(key, JSON.stringify(updatedData));

  return updatedData;
}