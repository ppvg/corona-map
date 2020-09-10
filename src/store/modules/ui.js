import _base from './_base-module';
import {format, sub} from 'date-fns'
import { nl } from 'date-fns/locale'


const state = {
    searchValue: '',
    hoverValue: '',
    currentCity: null,
    currentRegionType: 'city',
    today: null,
    credits: false,
    embedPopup: false,
    menu: 'map',
    caseDataRequested: false,
    caseDataLoaded: false,
    color: 'regular'
};

const getters = {
    ..._base.getters,
    dateString(state, getters, rootState, rootGetters) {
        let today, offset, dateOfFocus;
        today = state.today;
        if (today) {
            offset = rootState.settings.currentDateOffset;
            dateOfFocus = sub(today, {days: offset});
            return format(dateOfFocus, 'EE d MMM', {locale: nl} );
        } else {
            return '';
        }
    },
    currentRegion(state, getters, rootState, rootGetters) {
        let city = state.currentCity;
        if (city) {
            switch(state.currentRegionType) {
                case 'city':
                    return city;
                case 'ggd':
                    return rootGetters['ggds/getItemByProperty']('ggd_code', city.ggd_code, true);
                case 'sr':
                    return rootGetters['safetyRegions/getItemByProperty']('safetyRegion_code', city.safetyRegion_code, true);
                case 'country':
                    return rootGetters['countries/getItemById'](city.country_id);
            }
        } else {
            return null;
        }
    }
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