const perPopulation = 100000;

// n is per week per 100.000 (perPopulation) inhabitants
const thresholds = [
    {
        n: 0,
        color: 'rgb(144,250,5)'
    }, {
        n: 5,
        color: 'rgb(255,255,0)'
    }, {
        n: 50,
        color: 'rgb(250,172,5)'
    }, {
        n: Infinity,
        color: 'rgb(255,0,0)'
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

const getNumber = function(threshold) {
    let index, pre;
    index = thresholds.indexOf(threshold);
    if (threshold.n === 0) {
        pre = 0;
    } else if (threshold.n !== Infinity) {
        let prev = this.thresholds[index - 1];
        pre = prev.n + ' - ' + threshold.n;
    } else {
        pre = thresholds[thresholds.length - 2].n + ' of meer ';
    }
    return pre + ' besm. per 100k inw. per week';
};

export default {
    thresholds,
    getThreshold,
    perPopulation,
    getNumber
}