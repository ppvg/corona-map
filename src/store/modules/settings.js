import _base from './_base-module';

const state = {
    zoom: 0,
    canvasWidth: 0,
    canvasHeight: 0,
    mapRatio: 0.89,
    periodOfFocusLength: 7,
    historyLength: 20,
    currentDateOffset: 0,
    gradient: true,
    //areas: 'cities'
    areas: 'sewerage-areas'
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