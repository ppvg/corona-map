const perPopulation = 100000;

// cases per week per 100.000 (perPopulation) inhabitants
const thresholdYellow = 5;
const thresholdOrange = 16;
const thresholdRed = 30;




const getColor = function(cases, population, days) {
    if (cases === null || population === null) {
        return '#888';
    } else {
        let relativeCasesInWeek = perPopulation * cases / population * (7 / days);

        if (relativeCasesInWeek === 0) {
            return '#90fa05';
        }
        if (relativeCasesInWeek < thresholdYellow) {
            return '#dbf752';
        }
        if (relativeCasesInWeek < thresholdOrange) {
            return '#fadd05';
        }
        if (relativeCasesInWeek < thresholdRed) {
            return '#faac05';
        } else {
            return '#fa4205';
        }
    }
};

export default {
    thresholdYellow,
    thresholdOrange,
    thresholdRed,
    getColor
}