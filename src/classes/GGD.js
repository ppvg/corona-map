import _Region from "./_Region";
import store from '@/store/store'

class GGD extends _Region{
    constructor({
        ggd_code = '',
        title = '',
        report = []
    }) {
        super();
        this.id = (store.state.ggds.all.length + 1);
        this.regionType = 'ggd';
        this.ggd_code = ggd_code;
        this.title = title;
        this.report = report;
    }
}

export default GGD;