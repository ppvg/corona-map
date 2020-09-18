class Map {
    constructor({
        id = null,
        title = '',
        regionType = '',
        settings = {},
        url = {}
    }) {
        this.id = id;
        this.title = title;
        this.regionType = regionType;
        this.settings = settings;
        this.url = url;
    }
}

export default Map;