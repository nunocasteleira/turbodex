function formatDexNumber(dexNumber: number) {
  const formattedDexNumber = "#" + String(dexNumber).padStart(3, "0");
  return { formattedDexNumber };
}

export { formatDexNumber };
