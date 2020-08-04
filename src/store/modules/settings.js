import _base from './_base-module';

const state = {
    zoom: 500,
    canvasWidth: 400,
    canvasHeight: 800,
    mapRatio: 0.62,
    currentDateOffset: 0,
    dateStart: '2020-03-30',
    dateEnd: '2020-04-15',
    playing: false,
    mode: 'bubbles'
};

const getters = {
    ..._base.getters
};

const actions = {};

const mutations = {
    updateProperty(state, payload) {
        state[payload.key] = payload.value;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}