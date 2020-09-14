import store from '@/store/store';
import interpolate from "color-interpolate";
import thresholdTools from "@/tools/thresholds";

class _Region {
    constructor(_region) {

    }

    getGgds() {
        switch(this.regionType) {
            case 'ggd':
                return [this];
            case 'country':
                return store.state.ggds.all;
            default:
                return [];
        }
    }

    getCities() {
        switch(this.regionType) {
            case 'city':
                return [this];
            case 'ggd':
                return store.state.cities.all.filter(city => {
                    return city.ggd_code === this.ggd_code;
                });
            case 'sr':
                return store.state.cities.all.filter(city => {
                    return city.safetyRegion_code === this.safetyRegion_code;
                });
            case 'country':
                return store.state.cities.all.filter(city => {
                    return city.country_id === this.id;
                });
        }
    }

    getAllPaths() {
        let cities, paths;
        cities = this.getCities();
        paths = [];
        for (let city of cities) {
            paths = paths.concat(city.paths);
        }
        return paths;
    }

    getTotalPopulation() {
        let population, cities;
        population = 0;
        cities = this.getCities();
        for (let city of cities) {
            population += city.population;
        }
        return population;
    }

    getTotalIncreaseDay(delta) {
        let increase, cities;
        increase = 0;
        cities = this.getCities();
        for (let city of cities) {
            increase += city.getIncreaseDay(delta);
        }
        return increase;
    }

    getTotalIncreaseWeek(delta) {
        let increase, cities;
        increase = 0;
        cities = this.getCities();
        for (let city of cities) {
            increase += city.getIncreaseWeek(delta);
        }
        return increase;
    }

    getTotalRelativeIncreasDay() {
        let increase = this.getTotalIncreaseDay();
        return 100000 * increase / this.getTotalPopulation();
    }

    getTotalRelativeIncreaseWeek() {
        let increase = this.getTotalIncreaseWeek();
        return 100000 * increase / this.getTotalPopulation();
    }

    getTotalReport() {
        let report, cities, counter;
        report = {
            history: []
        };
        counter = 0;
        cities = this.getCities();
        for (let city of cities) {
            let dayCounter = 0;
            for (let day of city.report.history) {
                if (counter === 0) {
                    report.history.push(day)
                } else {
                    report.history[dayCounter] += day;
                }
                dayCounter++;
            }
            counter++;
        }
        return report;
    }

    get changedStatus(){
        return this.getThreshold(1) !== this.getThreshold(0);
    }

    getThreshold(delta = 0) {
        let cases, signalingSystem;
        signalingSystem = store.state.signalingSystems.current;
        if (signalingSystem.days === 1) {
            cases = this.getTotalIncreaseDay(delta);
        } else if (signalingSystem.days === 7) {
            cases = this.getTotalIncreaseWeek(delta);
        }
        return thresholdTools.getThreshold(cases, this.getTotalPopulation(), signalingSystem.days);
    }

    get prev() {
        let threshold, index;
        threshold = this.getThreshold();
        index = thresholdTools.getThresholds().indexOf(threshold);
        if (index > 0) {
            return thresholdTools.getThresholds()[index - 1];
        } else {
            return null;
        }
    }

    get next() {
        let threshold, index;
        threshold = this.getThreshold();
        index = thresholdTools.getThresholds().indexOf(threshold);
        if (index < thresholdTools.getThresholds().length - 1) {
            return thresholdTools.getThresholds()[index + 1];
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
                return threshold.color[store.state.ui.color];
            } else {
                if (!this.prev || !this.next) {
                    return threshold.color[store.state.ui.color];
                } else {
                    let colormap, maxOfNextColor, ratio;
                    maxOfNextColor = 0.65;
                    ratio = maxOfNextColor * (this.getTotalRelativeIncreaseWeek() - this.prev.n) / (threshold.n - this.prev.n);
                    colormap = interpolate([threshold.color[store.state.ui.color], this.next.color[store.state.ui.color]]);
                    return colormap(ratio);
                }
            }
        }
    }


}

export default _Region;