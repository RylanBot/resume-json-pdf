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
