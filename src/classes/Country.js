import _Region from "./_Region";
import Path from "./Path";

class Country extends _Region {
    constructor({
        id = null,
        title = '',
        report = null,
        paths = []
    }) {
        super();
        this.regionType = 'country';
        this.id = id;
        this.title = title;
        this.report = report;
        this.paths = paths.map(path => new Path(path));
    }
}

export default Country;