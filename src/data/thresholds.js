const perPopulation = 100000;

// n is per week per 100.000 (perPopulation) inhabitants
const thresholds = [
    {
        n: 0,
        color: 'rgb(144,250,5)'
    }, {
        n: 5,
        color: 'rgb(250,221,5)'
    }, {
        n: 50,
        color: 'rgb(250,172,5)'
    }, {
        n: Infinity,
        color: 'rgb(250,66,5)'
    }
];


const getThreshold = function(cases, population, days) {
    if (cases === null || population === null) {
        return null;
    } else {
        let relativeCasesInWeek = perPopulation * cases / population * (7 / days);

        for (let threshold of thresholds) {
            if ((relativeCasesInWeek < threshold.n) || (relativeCasesInWeek === 0 && threshold.n === 0)) {
                return threshold;
            }
        }
    }
};

export default {
    thresholds,
    getThreshold,
    perPopulation
}