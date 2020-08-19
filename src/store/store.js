import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import settings from './modules/settings';
import ui from './modules/ui';
import cities from './modules/cities';
import sewerageAreas from './modules/sewerage-areas';


const getters = {
    areas(state, getters, rootState, rootGetters) {
        switch(rootState.settings.areas) {
            case 'sewerage-areas':
                return rootState.sewerageAreas.all;
            default:
                return rootState.cities.all;
        }
    },
    areaName(state, getters, rootState, rootGetters) {
        switch(rootState.settings.areas) {
            case 'sewerage-areas':
                return 'Riool-gebieden';
            default:
                return 'Gemeentes';
        }
    }
};

const state = {
    dataLoaded: false
};
const mutations = {
    updateProperty(state, payload) {
        state[payload.key] = payload.value;
    }
};

const store = new Vuex.Store({
    state,
    mutations,
    getters,
    actions: {},
    modules: {
        settings, ui,
        cities, sewerageAreas
    }

});

window.store = store;

export default store
