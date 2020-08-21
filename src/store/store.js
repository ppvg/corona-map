import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import cities from './modules/cities';
import sewageTreatmentPlants from './modules/sewage-treatment-plants';
import settings from './modules/settings';
import ui from './modules/ui';

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
    actions: {},
    modules: {
        cities, sewageTreatmentPlants,
        settings, ui
    }

});

window.store = store;

export default store
