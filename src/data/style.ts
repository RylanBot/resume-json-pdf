import { checkAvailableFonts } from "@/helpers/CommonUtil";
import type { StyleData } from "@/types/style";

const FONT_LIST = [
    // 无衬线 sans-serif
    "Arial",
    "Calibri",
    // 衬线 serif
    "FangSong",
    "STSong",
    "STZhongsong",
    "Times New Roman",
    // 等宽 monospace
    "Courier New",
];

export const AVAILABLE_FONTS = checkAvailableFonts(FONT_LIST);

export const TEMPLATE_NAME_AVATAR = "avatar";
export const TEMPLATE_NAME_PLAIN = "plain";

const COMMON_STYLE: StyleData = {
    template: TEMPLATE_NAME_AVATAR,
    fontStyle: AVAILABLE_FONTS[0],
    color: "#225081",
    pagePy: 12,
    profileMb: 8,
    experienceMb: 8,
    plainFootPx: 8,
    plainContactPx: 8,
    detailsFont: 16
};

export default COMMON_STYLE;