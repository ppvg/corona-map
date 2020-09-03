import _Region from "./_Region";

class Country extends _Region {
    constructor({
        id = null,
        title = ''
    }) {
        super();
        this.regionType = 'country';
        this.id = id;
        this.title = title;
    }
}

export default Country;