import store from '@/store/store';

const nl = {
    latitude: 52.15,
    longitude: 5.34
};

const getLeft = function(longitude, settings) {
    return (longitude - nl.longitude) * 0.62 * settings.zoom + (0.5 * settings.width);
};

const getTop = function(latitude, settings) {
    return (0.5 * settings.height) - (latitude - nl.latitude) * settings.zoom;
};

export default {
    getLeft,
    getTop
}