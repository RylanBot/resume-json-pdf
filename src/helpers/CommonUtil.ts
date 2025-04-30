/**
 * 处理不同语言造成的换行情况不同
 */
export const formatTitle = (title: string) => {
    const words = title.split(" ");
    if (words.length > 1) {
        return words[0] + "\n" + words.slice(1).join(" ");
    }
    return title;
};

/**
 * 检查传入的 font-family 列表是否在当前游览器可用
 */
export const checkAvailableFonts = (fontList: string[]) => {
    const canvas = document.createElement("canvas");
    canvas.width = 100;
    canvas.height = 100;

    const context = canvas.getContext("2d", { willReadFrequently: true });
    if (!context) return [];

    const NEVER_EXIST_FONT = "__FALLBACK__";

    const testChar = "a";
    const fontSize = 100;

    context.textAlign = "center";
    context.fillStyle = "black";
    context.textBaseline = "middle";

    const getFontPixels = (font: string): number[] => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.font = `${fontSize}px ${font}, ${NEVER_EXIST_FONT}`;
        context.fillText(testChar, canvas.width / 2, canvas.height / 2);

        const imageData = context.getImageData(
            0,
            0,
            canvas.width,
            canvas.height
        ).data;
        return Array.from(imageData).filter((value) => value !== 0);
    };

    const defaultFontPixels = getFontPixels(NEVER_EXIST_FONT);

    return fontList.filter((font) => {
        const testFontPixels = getFontPixels(font);
        // 像素数据不同 -> 传入的字体被正确渲染 -> 存在可用字体
        return defaultFontPixels.join("") !== testFontPixels.join("");
    });
};
