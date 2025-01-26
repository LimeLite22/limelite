import { useLocation } from "react-router";

export const useIsPathIncluded = (paths: string[]): boolean => {
    const location = useLocation();
    return paths.some((path) => location.pathname.includes(path));
}
