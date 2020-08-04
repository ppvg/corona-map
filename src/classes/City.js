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

    get newestSet() {
        let n, setN, setTotal;
        setTotal = 0;
        n = this.report.history.length;
        setN = Math.floor(n / 2);
        for (let i = setN, l = setN * 2; i < l; i++) {
            setTotal += this.report.history[i];
        }
        return setTotal;
    }

    get oldestSet() {
        let n, setN, setTotal;
        setTotal = 0;
        n = this.report.history.length;
        setN = Math.floor(n / 2);
        for (let i = 0, l = setN ; i < l; i++) {
            setTotal += this.report.history[i];
        }
        return setTotal;
    }

    get trend() {
        let difference = this.newestSet - this.oldestSet;
        if (Math.abs(difference) < this.oldestSet / 20 || difference < 5) {
            return 'gelijk';
        } else {
            if (this.newestSet > this.oldestSet) {
                return 'stijgend';
            } else {
                return 'dalend';
            }
        }
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