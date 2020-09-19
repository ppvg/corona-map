class Map {
    constructor({
        id = null,
        title = '',
        module = '',
        regionLabel = '',
        settings = {},
        url = {}
    }) {
        this.id = id;
        this.title = title;
        this.module = module;
        this.regionLabel = regionLabel;
        this.settings = settings;
        this.url = url;
    }
}

export default Map;