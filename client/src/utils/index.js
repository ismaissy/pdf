export default class Utils {


    // Компоратор берип боля анонимный функциян усти билен Utils.theadWidths(thead, (item, index) => index === 0 ? 30 : "auto");
    static theadWidths(array, positionOrFn) {
        return array.map((i, index) => typeof positionOrFn === "function" ? positionOrFn(i, index) : positionOrFn);
    }

    static thead(array, alignment, bold) {
        return array.map((i) => ({ text: i, alignment, bold }));
    }

    static canvasDto(type, x1, y1, x2, y2, lineWidth) {
        return { type, x1, y1, x2, y2, lineWidth }
    }

}