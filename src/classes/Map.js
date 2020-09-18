class Map {
    constructor({
        id = null,
        title = '',
        regionType = '',
        regionLabel = '',
        settings = {},
        url = {}
    }) {
        this.id = id;
        this.title = title;
        this.regionType = regionType;
        this.regionLabel = regionLabel;
        this.settings = settings;
        this.url = url;
    }
}

export default Map;