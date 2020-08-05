import Point from "./Point";

class Path {
    constructor(path) {
        this.path = path.map(point => new Point(point));
        this.ctxPath = null;
    }

    init() {
        let path, pathWithoutStart;
        path = new Path2D();
        path.moveTo(...this.translatedPath[0]);
        pathWithoutStart = this.translatedPath.slice(1);
        for (let point of pathWithoutStart) {
            path.lineTo(...point);
        }
        this.ctxPath = path;
    }

    get translatedPath() {
        return this.path.map(point => point.translated);
    }
}

export default Path;