import Path from './Path';
import _Area from "./_Area";

class City extends _Area {
    constructor({
        id = null,
        code = '',
        attributes = {},
        geometry = {},
        report = null,
        population = 0
    }) {
        super();
        this.type = 'city';
        this.id = (store.state.cities.all.length + 1);
        this.code = 'GM' + attributes.Code;
        this.title = attributes.Gemeentenaam;
        this.paths = geometry.rings.map(ring => new Path(ring));
        this.report = report;
        this.population = population;
    }
}

export default City;