import _base from './_base-module';
import City from '@/classes/City';
import Admission from '@/classes/Admission';

const Model = City;

const state = {
    all: [],
    current: null
};

const getters = {
    ..._base.getters
};

const actions = {};

const mutations = {
    init(state, set) {
        return _base.mutations.init(state, set, Model);
    },
    create(state, item) {
        return _base.mutations.create(state, item, Model);
    },
    updatePropertyOfItem(state, payload) {
        _base.mutations.updatePropertyOfItem(state, payload.item, payload.property, payload.value);
    },
    addPostcode(state, payload) {
        state.all = state.all.map((item) => {
            if (item.id === payload.city.id) {
                item.postcodes.push(payload.postcode);
            }
            return item;
        });
    },
    addHospitalAdmissions(state, payload) {
        state.all = state.all.map((item) => {
            if (item.id === payload.city.id) {
                for (let key in payload.item) {
                    if (key.match(/^\d/)) {
                        item.hospitalAdmissions.unshift(new Admission({
                            date: key,
                            n: Number(payload.item[key])
                        }));
                    }
                }
            }
            return item;
        });
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}