export const truncateString = (str: string, maxLength: number = 15) => {
    return str.length > maxLength ? `${str.slice(0, maxLength)}...` : str;
}