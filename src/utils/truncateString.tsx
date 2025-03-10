export const truncateString = (str: string, maxLength: number = 15) => {
    return str?.length > maxLength ? `${str.slice(0, maxLength)}...` : str;
}
export const addCommas = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};