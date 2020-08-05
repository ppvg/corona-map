import Path from './Path';
import store from '@/store/store';
import stringTool from '@/tools/string';
import thresholds from "@/data/thresholds";

class City {
    constructor({
        id = null,
        code = '',
        attributes = {},
        geometry = {},
        report = null,
        population = 0
    }) {
        this.id = (store.state.cities.all.length + 1);
        this.code = 'GM' + attributes.Code;
        this.title = attributes.Gemeentenaam;
        this.paths = geometry.rings.map(ring => new Path(ring));
        this.report = report;
        this.population = population;
    }

    get increaseDay() {
        return this.report.history[this.report.history.length - 1];
    }

    get increaseWeek() {
        let total = 0;
        for (let i = this.report.history.length - 1, l = this.report.history.length - 8; i > l; i--) {
            total += this.report.history[i];
        }
        return total;
    }

    get titleForSorting() {
        return stringTool.titleForSorting(this.title);
    }

    // get newestSet() {
    //     let n, setN, setTotal;
    //     setTotal = 0;
    //     n = this.report.history.length;
    //     setN = Math.floor(n / 2);
    //     for (let i = setN, l = setN * 2; i < l; i++) {
    //         setTotal += this.report.history[i];
    //     }
    //     return setTotal;
    // }
    //
    // get oldestSet() {
    //     let n, setN, setTotal;
    //     setTotal = 0;
    //     n = this.report.history.length;
    //     setN = Math.floor(n / 2);
    //     for (let i = 0, l = setN ; i < l; i++) {
    //         setTotal += this.report.history[i];
    //     }
    //     return setTotal;
    // }
    //
    // get trend() {
    //     let difference = this.newestSet - this.oldestSet;
    //     if (Math.abs(difference) < this.oldestSet / 20 || difference < 5) {
    //         return 'gelijk';
    //     } else {
    //         if (this.newestSet > this.oldestSet) {
    //             return 'stijgend';
    //         } else {
    //             return 'dalend';
    //         }
    //     }
    // }

    get color() {
        return thresholds.getColor(this.increaseWeek, this.population, 7);
    }
}

export default City;