import Point from "./Point";

class Path {
    constructor(path) {
        this.path = path.map(point => new Point(point))
    }
}

export default Path;