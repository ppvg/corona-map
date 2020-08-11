import _base from './_base-module';
import {format, sub} from 'date-fns'
import { nl } from 'date-fns/locale'


const state = {
    searchValue: '',
    hoverValue: '',
    currentCity: null,
    today: null,
    credits: false
};

const getters = {
    ..._base.getters,
    dateString(state, getters, rootState, rootGetters) {
        let today, offset, dateOfFocus;
        today = state.today;
        if (today) {
            offset = rootState.settings.currentDateOffset;
            dateOfFocus = sub(today, {days: offset});
            return format(dateOfFocus, 'EEEE d MMMM', {locale: nl} );
        } else {
            return '';
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