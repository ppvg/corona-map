import {format, sub} from "date-fns";
import {nl} from "date-fns/locale";
import store from '@/store/store';

const dayLength = 1000 * 3600 * 24;

const getDateOffset = function(dateBase, date1) {
    return Math.round(dateBase - date1) / dayLength;
};

const getDateByOffset = function(offset) {
    let today, dateOfFocus;
    today = store.state.ui.todayInMs;
    if (today) {
        return new Date(today - (offset * dayLength));
    } else {
        return null;
    }
};

export default {
    getDateOffset,
    getDateByOffset
}