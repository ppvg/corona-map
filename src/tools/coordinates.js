import store from '@/store/store';

const nl = {
    latitude: 52.1,
    longitude: 5.34
};

const getLeft = function(longitude) {
    return (longitude - nl.longitude) * store.state.settings.mapRatio * store.state.settings.zoom + (0.5 * store.state.settings.canvasWidth);
};

const getTop = function(latitude) {
    return (0.5 * store.state.settings.canvasHeight) - (latitude - nl.latitude) * store.state.settings.zoom;
};

export default {
    getLeft,
    getTop
}