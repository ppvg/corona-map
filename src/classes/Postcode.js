let variation = 0.08;

class Postcode {
    constructor({
        id = null,
        latitude = 0,
        longitude = 0,
        postcode = 0
    }) {
        this.id = id;
        this.latitude = latitude;
        this.longitude = longitude;
        this.postcode = postcode;
    }



    getRandomLat() {
        return this.latitude + (Math.random() * variation - (0.5 * variation));
    }

    getRandomLong() {
        return this.longitude + (Math.random() * variation - (0.5 * variation));
    }
}

export default Postcode;