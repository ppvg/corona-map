import _Region from "./_Region";
import store from '@/store/store';
import stringTool from '@/tools/string';


class _RegionWithTestData extends _Region{
    constructor() {
        super();
    }

    get increaseDay() {
        let offset = store.state.settings.currentDateOffset;
        return this.report.history[this.report.history.length - 1 - offset].value;
    }

    getIncreaseDay(delta = 0) {
        let offset = store.state.settings.currentDateOffset;
        return this.report.history[this.report.history.length - 1 - (offset + delta)].value;
    }

    getIncreaseWeek(delta = 0) {
        let total, offset;
        offset = store.state.settings.currentDateOffset + delta;
        if (store.state.maps.current.settings.testDataInterval === 1) {
            total = 0;
            for (let i = (this.report.history.length - 1 - offset), l = (this.report.history.length - 8 - offset); i > l; i--) {
                total += this.report.history[i].value;
            }
            return total;
        } else {
            return this.report.history[this.report.history.length - 1 - offset].value
        }
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
}

export default _RegionWithTestData;