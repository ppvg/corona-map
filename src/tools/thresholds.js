import store from '@/store/store';






const getThreshold = function(cases, population, days) {
    let signalingSystem = store.state.signalingSystems.current;
    if (cases === null || population === null) {
        return null;
    } else {
        let relativeCasesInPeriod = signalingSystem.population * cases / population * (signalingSystem.days / days);

        for (let threshold of signalingSystem.thresholds) {
            if ((relativeCasesInPeriod < threshold.n) || (relativeCasesInPeriod === 0 && threshold.n === 0)) {
                return threshold;
            }
        }
    }
};

const getNumber = function(threshold) {
    let index, pre, signalingSystem;
    signalingSystem = store.state.signalingSystems.current;
    index = signalingSystem.thresholds.indexOf(threshold);
    if (index === 0) {
        if (threshold.n === 0) {
            pre = 0;
        } else {
            pre = '0 - ' + threshold.n;
        }
    } else if (threshold.n !== Infinity) {
        let prev = signalingSystem.thresholds[index - 1];
        pre = prev.n + ' - ' + threshold.n;
    } else {
        pre = signalingSystem.thresholds[signalingSystem.thresholds.length - 2].n + ' of meer ';
    }
    return pre + ' besm. per ' + getNiceNumberForPopulation(signalingSystem.population) +  ' inw. per ' + getNiceNumberForDays(signalingSystem.days);
};

const getNiceNumberForDays = function(days) {
    if (days === 7) {
        return 'week';
    } else if (days === 1) {
        return 'dag';
    }
};

const getNiceNumberForPopulation = function(number) {
    if (number === 100000) {
        return '100 dzd';
    }
};

const getThresholds = function() {
    return store.state.signalingSystems.current.thresholds;
};

export default {
    getThreshold,
    getNumber,
    getThresholds
}