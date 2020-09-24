const getDateOffset = function(dateBase, date1) {
    let dayLength = 1000 * 3600 * 24;
    return Math.round(dateBase - date1) / dayLength;
};

export default {
    getDateOffset
}