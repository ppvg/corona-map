class View {
    constructor({
        id = null,
        offset = 0,
        currentRegion = null
    }) {
        this.id = id;
        this.offset = offset;
        this.currentRegion = currentRegion;
    }
}

export default View;