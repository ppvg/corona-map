import coordinatesTool from "@/tools/coordinates";

class Point {
    constructor(point) {
        this.x = point[0];
        this.y = point[1];
    }

    get asArray() {
        return [this.x, this.y];
    }

    get translated() {
        return [
            coordinatesTool.getLeft(this.x),
            coordinatesTool.getTop(this.y),
        ]
    }
}

export default Point;