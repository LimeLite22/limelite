export const wordsCalculator = (calculationText: string) => {
    const words = calculationText
        ?.trim()
        .split(/\s+/)
        .filter((word) => word.length > 0).length;
    const minutes = Math.floor(words / 150);
    const seconds = Math.floor(((words % 150) * 60) / 150);
    return { minutes, seconds, words };
};