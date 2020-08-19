import interpolate from "color-interpolate";
import stringTool from '@/tools/string';
import thresholds from "@/data/thresholds";
import store from '@/store/store';

class _Area {
    constructor(_area) {

    }

    getRelativeIncreaseWeek() {
        return 100000 * this.getIncreaseWeek() /  this.getPopulation();
    }

    getThreshold(delta = 0) {
        return thresholds.getThreshold(this.getIncreaseWeek(delta), this.getPopulation(), 7);
    }

    get changedStatus(){
        return this.getThreshold(1) !== this.getThreshold(0);
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




    get prev() {
        let threshold, index;
        threshold = this.getThreshold();
        index = thresholds.thresholds.indexOf(threshold);
        if (index > 0) {
            return thresholds.thresholds[index - 1];
        } else {
            return null;
        }
    }

    get next() {
        let threshold, index;
        threshold = this.getThreshold();
        index = thresholds.thresholds.indexOf(threshold);
        if (index < thresholds.thresholds.length - 1) {
            return thresholds.thresholds[index + 1];
        } else {
            return null;
        }
    }


    get color() {
        let threshold = this.getThreshold();
        if (!threshold) {
            return '#888';
        } else {
            if (!store.state.settings.gradient) {
                return threshold.color;
            } else {
                if (!this.prev || !this.next) {
                    return threshold.color;
                } else {
                    let colormap, maxOfNextColor, ratio;
                    maxOfNextColor = 0.65;
                    ratio = maxOfNextColor * (this.getRelativeIncreaseWeek() - this.prev.n) / (threshold.n - this.prev.n);
                    colormap = interpolate([threshold.color, this.next.color]);
                    return colormap(ratio);
                }
            }
        }
    }

    // type dependant

    getReport() {
        if (this.type === 'city') {
            return this.report;
        } else {
            // merging reports of all cities
            let report, cityIndex;
            report = {
                history: []
            };
            cityIndex = 0;
            for (let city of this.cities) {
                let dayIndex = 0;
                for (let day of city.report.history) {
                    if (cityIndex === 0) {
                        report.history.push(0);
                    }
                    report.history[dayIndex] += day;
                    dayIndex++;
                }
                cityIndex++;
            }
            return report;
        }
    }

    get increaseDay() {
        if (this.type === 'city') {
            return this.getIncreaseDayForCity();
        } else {
            let n = 0;
            for (let city of this.cities) {
                n += city.getIncreaseDayForCity();
            }
            return n;
        }
    }

    getIncreaseDayForCity() {
        let offset = store.state.settings.currentDateOffset;
        return this.report.history[this.report.history.length - 1 - offset];
    }

    getIncreaseWeek(delta = 0) {
        if (this.type === 'city') {
            return this.getIncreaseWeekForCity(delta);
        } else {
            let n = 0;
            for (let city of this.cities) {
                n += city.getIncreaseWeekForCity(delta);
            }
            return n;
        }
    }

    getIncreaseWeekForCity(delta) {
        let total, offset;
        total = 0;
        offset = store.state.settings.currentDateOffset + delta;
        for (let i = (this.report.history.length - 1 - offset), l = (this.report.history.length - 8 - offset); i > l; i--) {
            total += this.report.history[i];
        }
        return total;
    }

    getPaths() {
        if (this.type === 'city') {
            return this.paths;
        } else {
            let paths = [];
            for (let city of this.cities) {
                paths = paths.concat(city.paths);
            }
            return paths;
        }
    }

    getPopulation() {
        if (this.type === 'city') {
            return this.population;
        } else {
            let population = 0;
            for (let city of this.cities) {
                population += city.population;
            }
            return population;
        }
    }
}

export default _Area;