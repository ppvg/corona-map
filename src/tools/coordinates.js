import store from '@/store/store';

const getLeft = function(longitude, settings) {
    return (longitude - store.state.maps.current.settings.map.longitude) * store.state.maps.current.settings.map.stretch * settings.zoom + (0.5 * settings.width) + settings.shiftX;
};

const getTop = function(latitude, settings) {
    return (0.5 * settings.height) - (latitude - store.state.maps.current.settings.map.latitude) * settings.zoom + settings.shiftY;
};

export default {
    getLeft,
    getTop
}