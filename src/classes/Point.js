import coordinatesTool from "@/tools/coordinates";

class Point {
    constructor(point) {
        this.x = point[0];
        this.y = point[1];
    }

    get asArray() {
        return [this.x, this.y];
    }

    getTranslated(settings) {
        return [
            coordinatesTool.getLeft(this.x, settings),
            coordinatesTool.getTop(this.y, settings),
        ]
    }
}

export default Point;