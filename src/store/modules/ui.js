import _base from './_base-module';
import {format, sub} from 'date-fns'
import { nl } from 'date-fns/locale'


const state = {
    isPlaying: false,
    searchValue: '',
    hoverValue: '',
    currentRegionType: '',
    today: null,
    credits: false,
    embedPopup: false,
    menu: 'map',
    caseDataRequested: false,
    caseDataLoaded: false,
    color: 'regular',
    admin: false
};

const getters = {
    ..._base.getters,
    dateString(state, getters, rootState, rootGetters) {
        let today, offset, dateOfFocus;
        today = state.today;
        if (today) {
            offset = rootState.settings.currentDateOffset * rootState.maps.current.settings.testDataInterval;
            dateOfFocus = sub(today, {days: offset});
            return format(dateOfFocus, 'EE d MMM', {locale: nl} );
        } else {
            return '';
        }
    },
    getDateByOffset: (state) => (offset, dateFormat = 'EE d MMM') => {
        let today, dateOfFocus;
        today = state.today;
        if (today) {
            dateOfFocus = sub(today, {days: offset});
            return format(dateOfFocus, dateFormat, {locale: nl} );
        } else {
            return '';
        }
    },
    module(state) {
        switch(state.currentRegionType) {
            case 'district':
                return 'districts';
            case 'city':
                return 'cities';
            case 'ggd':
                return 'ggds';
            case 'safety-region':
                return 'safetyRegions';
            case 'province':
                return 'provinces';
            case 'country':
                return 'countries';
        }
    },
    currentRegion(state, getters, rootState, rootGetters) {
        let region = rootState[rootState.maps.current.module].current;
        if (region) {
            switch(state.currentRegionType) {
                case 'district':
                case 'city':
                    return region;
                case 'ggd':
                    return rootGetters['ggds/getItemByProperty']('ggd_code', region.ggd_code, true);
                case 'safety-region':
                    return rootGetters['safetyRegions/getItemByProperty']('safetyRegion_code', region.safetyRegion_code, true);
                case 'province':
                    return rootGetters['provinces/getItemByProperty']('province_code', region.province_code, true);
                case 'country':
                return rootGetters['countries/getItemById'](region.country_id);
            }
        } else {
            return null;
        }
    },
    regions(state, getters, rootState, rootGetters) {
        switch(state.currentRegionType) {
            case 'district':
                return rootState.districts.all;
            case 'city':
                return rootState.cities.all;
            case 'ggd':
                return rootState.ggds.all;
            case 'safety-region':
                return rootState.safetyRegions.all;
            case 'province':
                return rootState.provinces.all;
            case 'country':
                return rootState.countries.all;
        }
    },
    typeLabel: (state) => (plural = true) => {
        switch(state.currentRegionType) {
            case 'district':
                return plural ? "Stadsdelen" : "Stadsdeel";
            case 'city':
                return plural ? "Gemeentes" : "Gemeente";
            case 'ggd':
                return plural ? "GGD'en" : "GGD";
            case 'safety-region':
                return plural ? "Veiligheidsregio's" : "Veiligheidsregio";
            case 'province':
                return plural ? "Provincies" : "Provincie";
            case 'country':
                return plural ? "Landen" : "Land";
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