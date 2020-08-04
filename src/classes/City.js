import Path from './Path';

class City {
    constructor({
        id = null,
        attributes = {},
        geometry = {}
    }) {
        this.id = id;
        this.title = attributes.Gemeentenaam;
        this.paths = geometry.rings.map(ring => new Path(ring));
    }

    get titleForSorting() {
        if (this.title[0] === "'") {
            return this.title.substring(3).toLowerCase();
        } else {
            return this.title.toLowerCase();
        }
    }
}

export default City;