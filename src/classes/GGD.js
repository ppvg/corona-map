import _Region from "./_Region";
import store from '@/store/store'
import Path from "./Path";

class GGD extends _Region{
    constructor({
        ggd_code = '',
        title = '',
        paths = [],
        report = null,
        ageGroupReport = null
    }) {
        super();
        this.id = (store.state.ggds.all.length + 1);
        this.regionType = 'ggd';
        this.ggd_code = ggd_code;
        this.title = title;
        this.paths = paths.map(path => new Path(path));
        this.report = report;
        this.ageGroupReport = ageGroupReport;
        this.hasPaths = true;
    }
}

export default GGD;