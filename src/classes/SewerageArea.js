import _Area from "./_Area";
import store from '@/store/store';

class SewerageArea extends _Area {
    constructor({
        id = null,
        rwzi_awzi_code = null,
        title = '',
        safetyRegion_id = null,
        city_codes = [],
        sewerageMeasurements = []
    }) {
        super();
        this.id = (store.state.sewerageAreas.all.length + 1);
        this.type = 'sewerage-area';
        this.rwzi_awzi_code = rwzi_awzi_code;
        this.title = title;
        this.safetyRegion_id = safetyRegion_id;
        this.city_codes = city_codes;
        this.sewerageMeasurements = sewerageMeasurements;
    }

    get cities() {
        return this.city_codes.map(code => {
            return store.getters['cities/getItemByProperty']('code', code);
        })
    }
}

export default SewerageArea;