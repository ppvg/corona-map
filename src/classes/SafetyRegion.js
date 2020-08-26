import _Region from "./_Region";

class SafetyRegion extends _Region {
    constructor({
        safetyRegion_code = '',
        title = ''
    }) {
        super();
        this.regionType = 'sr';
        this.safetyRegion_code = safetyRegion_code;
        this.title = title;
    }
}

export default SafetyRegion;