const nl = {
    latitude: 52.1,
    longitude: 5.34
};

const getBottom = function(latitude, zoom, canvasHeight) {
    return (latitude - nl.latitude) * zoom + (0.5 * canvasHeight);
};

const getLeft = function(longitude, zoom, canvasWidth, mapRatio) {
    return (longitude - nl.longitude) * mapRatio * zoom + (0.5 * canvasWidth);
};

export default {
    getBottom,
    getLeft
}