import _Region from "./_Region";

class Country extends _Region {
    constructor({
        id = null,
        title = '',
        report = null
    }) {
        super();
        this.regionType = 'country';
        this.id = id;
        this.title = title;
        this.report = report;
    }
}

export default Country;