const perPopulation = 100000;

// n is per week per 100.000 (perPopulation) inhabitants
const thresholds = [
    {
        n: 0,
        color: '#90fa05'
    }, {
        n: 5,
        color: '#fadd05'
    }, {
        n: 50,
        color: '#faac05'
    }, {
        n: Infinity,
        color: '#fa4205'
    }
];


const getThreshold = function(cases, population, days) {
    if (cases === null || population === null) {
        return null;
    } else {
        let relativeCasesInWeek = perPopulation * cases / population * (7 / days);

        for (let threshold of thresholds) {
            if (relativeCasesInWeek <= threshold.n) {
                return threshold;
            }
        }
    }
};

export default {
    thresholds,
    getThreshold
}