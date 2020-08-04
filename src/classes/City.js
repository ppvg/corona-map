import Path from './Path';
import store from '@/store/store';
import stringTool from '@/tools/string';
import thresholds from "@/data/thresholds";

class City {
    constructor({
        id = null,
        attributes = {},
        geometry = {},
        report = null,
        population = 0
    }) {
        this.id = (store.state.cities.all.length + 1);
        this.title = attributes.Gemeentenaam;
        this.paths = geometry.rings.map(ring => new Path(ring));
        this.report = report;
        this.population = population;
    }

    get titleForSorting() {
        return stringTool.titleForSorting(this.title);
    }

    get color() {
        if (!this.report) {
            return '#888';
        } else {
            let incr = this.report.relativeIncreaseWeek;
            if (incr === 0) {
                return '#90fa05';
            }
            if (incr < thresholds.thresholdYellow) {
                return '#dbf752';
            }
            if (incr < thresholds.thresholdOrange) {
                return '#fadd05';
            }
            if (incr < thresholds.thresholdRed) {
                return '#faac05';
            } else {
                return '#fa4205';
            }
        }
    }
}

export default City;