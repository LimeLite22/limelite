import { VIDEO_SQUARE, VIDEO_STANDARD, VIDEO_VERTICAL } from "consts/consts";

export const getFormatNumber = (format: string) => {

    return format === VIDEO_STANDARD
        ? '16:9' : format === VIDEO_SQUARE
            ? '1:1' : format === VIDEO_VERTICAL
                ? "4:5" : "9:16";
}