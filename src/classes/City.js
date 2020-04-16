import Postcode from './Postcode';

class City {
    constructor({
        id = null,
        title = '',
        postcodes = [],
        hospitalAdmissions = []
    }) {
        this.id = id;
        this.title = title;
        this.postcodes = postcodes.map(p => new Postcode(p));
        this.hospitalAdmissions = hospitalAdmissions;
    }

    getRandomPostcode() {
        return this.postcodes[Math.floor(Math.random() * this.postcodes.length)];
    }

    getRandomLat() {
        return this.getRandomPostcode().getRandomLat();
    }

    getRandomLong() {
        return this.getRandomPostcode().getRandomLong();
    }
}

export default City;