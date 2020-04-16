import _base from './_base-module';

const state = {
    zoom: 145,
    canvasWidth: 400,
    canvasHeight: 500,
    mapRatio: 0.62,
    currentDateOffset: 0,
    dateStart: '2020-03-30',
    dateEnd: '2020-04-15',
    playing: false,
    mode: 'bubbles'
};

const getters = {
    ..._base.getters,
    getMax(state) {
        let start, end;
        start = new Date(state.dateStart).getTime();
        end = new Date(state.dateEnd).getTime();
        return (end - start) / (24 * 3600 * 1000)
    }
};

const actions = {};

const mutations = {
    updateProperty(state, payload) {
        state[payload.key] = payload.value;
    },
    next(state) {
        state.currentDateOffset++;
    },
    previous(state) {
        state.currentDateOffset--;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}