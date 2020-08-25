import _base from './_base-module';
import City from '@/classes/City';
import thresholds from '@/data/thresholds';



const state = {
    all: [],
    dict: {},
    current: null
};

const getters = {
    ..._base.getters,
    redCities(state) {
        return state.all.filter(city => {
            return city.getThreshold() === thresholds.thresholds[thresholds.thresholds.length - 1];
        }).sort((a,b) => (a.getRelativeIncreaseWeek() < b.getRelativeIncreaseWeek()) ? 1 : ((b.getRelativeIncreaseWeek() < a.getRelativeIncreaseWeek()) ? -1 : 0));
    },
};

const actions = {};

const mutations = {
    init(state, set) {
        state.all = [];
        for (let item of set) {
            if (item) {
                let c = new City(item);
                state.all.push(c);
                state.dict[c.municipality_code] = c;
            }
        }
    },
    updatePropertyOfItem(state, payload) {
        _base.mutations.updatePropertyOfItem(state, payload.item, payload.property, payload.value);
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}