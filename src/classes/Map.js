class Map {
    constructor({
        id = null,
        title = '',
        settings = {},
        url = {}
    }) {
        this.id = id;
        this.title = title;
        this.settings = settings;
        this.url = url;
    }
}

export default Map;