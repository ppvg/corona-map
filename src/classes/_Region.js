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

    getRegionsForPaths(pathsOrigin) {
        if (pathsOrigin === 'self') {
            return [this];
        } else {
            // find paths at another level (pathsOrigin)
            let identifier;
            switch (this.regionType) {
                case 'city':
                case 'district':
                    return [this];
                case 'ggd':
                    identifier = 'ggd_code';
                    break;
                case 'safety-region':
                    identifier = 'safetyRegion_code';
                    break;
                case 'province':
                    identifier = 'province_code';
                    break;
            }
            switch (pathsOrigin) {
                case 'district':
                    return store.state.districts.all.filter(district => {
                        return district[identifier] === this[identifier];
                    });
                case 'city':
                    return store.state.cities.all.filter(city => {
                        return city[identifier] === this[identifier];
                    });
                case 'province':
                    return store.state.provinces.all.filter(province => {
                        return province[identifier] === this[identifier];
                    });
            }
        }
    }

    getRegions() {
        let module = store.state.maps.current.module;
        switch(this.regionType) {
            case 'city':
            case 'district':
                return [this];
            case 'ggd':
                return store.state[module].all.filter(city => {
                    return city.ggd_code === this.ggd_code;
                });
            case 'safety-region':
                return store.state[module].all.filter(city => {
                    return city.safetyRegion_code === this.safetyRegion_code;
                });
            case 'province':
                return store.state[module].all.filter(city => {
                    return city.province_code === this.province_code;
                });
            case 'country':
                return store.state[module].all.filter(city => {
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
                let copy = {...day};
                if (counter === 0) {
                    report.history.push(copy)
                } else {
                    report.history[dayCounter].positiveTests += copy.positiveTests;
                    if (report.history[dayCounter].administeredTests) {
                        report.history[dayCounter].administeredTests += copy.administeredTests;
                    }
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

    get color() {
        return thresholdTools.thresholdToColor(this.getThreshold(), this.getTotalRelativeIncreaseWeek());
    }


}

export default _Region;