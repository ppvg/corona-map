import store from '@/store/store';
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

    getRegions() {
        switch(this.regionType) {
            case 'city':
            case 'district':
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
        cities = this.getRegions();
        paths = [];
        for (let city of cities) {
            paths = paths.concat(city.paths);
        }
        return paths;
    }

    getTotalPopulation() {
        let population, cities;
        population = 0;
        cities = this.getRegions();
        for (let city of cities) {
            population += city.population;
        }
        return population;
    }

    getTotalIncreaseDay(delta) {
        let increase, cities;
        increase = 0;
        cities = this.getRegions();
        for (let city of cities) {
            increase += city.getIncreaseDay(delta);
        }
        return increase;
    }

    getTotalIncreaseWeek(delta) {
        let increase, cities;
        increase = 0;
        cities = this.getRegions();
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
        if (store.state.maps.current.settings.hasTests) {
            let increase = this.getTotalIncreaseWeek();
            return 100000 * increase / this.getTotalPopulation();
        } else {
            return 0;
        }
    }

    getTotalReport() {
        let report, cities, counter;
        report = {
            history: []
        };
        counter = 0;
        cities = this.getRegions();
        for (let city of cities) {
            let dayCounter = 0;
            for (let day of city.report.history) {
                if (counter === 0) {
                    report.history.push(day)
                } else {
                    report.history[dayCounter].positiveTests += day.positiveTests;
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
        if (store.state.maps.current.settings.hasTests) {{
            let cases, signalingSystem;
            signalingSystem = store.state.signalingSystems.current;
            if (signalingSystem.days === 1) {
                cases = this.getTotalIncreaseDay(delta);
            } else if (signalingSystem.days === 7) {
                cases = this.getTotalIncreaseWeek(delta);
            }
            return thresholdTools.getThreshold(cases, this.getTotalPopulation(), signalingSystem.days);
        }} else {
            return null;
        }
    }

    get color() {
        return thresholdTools.thresholdToColor(this.getThreshold(), this.getTotalRelativeIncreaseWeek());
    }


}

export default _Region;