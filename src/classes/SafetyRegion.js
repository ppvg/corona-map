import _Region from "./_Region";
import Path from "./Path";

class SafetyRegion extends _Region {
    constructor({
        safetyRegion_code = '',
        title = '',
        paths = []
    }) {
        super();
        this.regionType = 'sr';
        this.safetyRegion_code = safetyRegion_code;
        this.title = title;
        this.paths = paths.map(path => new Path(path));
        this.hasPaths = true;
    }
}

export default SafetyRegion;