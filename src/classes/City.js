import Path from './Path';
import store from '@/store/store';
import stringTool from '@/tools/string';
import _Region from "./_Region";

class City extends _Region {
    constructor({
        id = null,
        municipality_code = '',
        ggd_code = '',
        safetyRegion_code = '',
        title = '',
        population = 0,
        area = 0,
        paths = [],
        ageGroups = [],
        report = null
    }) {
        super();
        this.regionType = 'city';
        this.id = id;
        this.country_id = 1;
        this.municipality_code = municipality_code;
        this.ggd_code = ggd_code;
        this.safetyRegion_code = safetyRegion_code;
        this.title = title;
        this.population = population;
        this.area = area;
        this.paths = paths.map(path => new Path(path));
        this.ageGroups = ageGroups;
        this.report = report;
    }

    get increaseDay() {
        let offset = store.state.settings.currentDateOffset;
        return this.report.history[this.report.history.length - 1 - offset];
    }

    getIncreaseDay(delta = 0) {
        let offset = store.state.settings.currentDateOffset;
        return this.report.history[this.report.history.length - 1 - (offset + delta)];
    }

    getIncreaseWeek(delta = 0) {
        let total, offset;
        total = 0;
        offset = store.state.settings.currentDateOffset + delta;
        for (let i = (this.report.history.length - 1 - offset), l = (this.report.history.length - 8 - offset); i > l; i--) {
            total += this.report.history[i];
        }
        return total;
    }

    getRelativeIncreaseWeek() {
        return 100000 * this.getIncreaseWeek() /  this.population;
    }

    getRelativeIncreaseDay() {
        return 100000 * this.increaseDay /  this.population;
    }

    get titleForSorting() {
        return stringTool.titleForSorting(this.title);
    }



    get hasNewInfection() {
        return this.getIncreaseWeek() > 0 && this.getIncreaseWeek(7) === 0
    }
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
    //
}

export default City;