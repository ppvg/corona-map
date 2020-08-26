import _Region from "./_Region";

class GGD extends _Region{
    constructor({
        ggd_code = '',
        title = ''
    }) {
        super();
        this.regionType = 'ggd';
        this.ggd_code = ggd_code;
        this.title = title;
    }
}

export default GGD;