import _base from './_base-module';
import City from '@/classes/City';

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
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}