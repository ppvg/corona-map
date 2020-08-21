class Measurement {
    constructor({
        date = '',
        dateInMs = 0,
        RNA_per_ml = 0,
        representative_measurement = false
    }) {
        this.date = date;
        this.dateInMs = new Date(date).getTime();
        this.RNA_per_ml = RNA_per_ml;
        this.representative_measurement = representative_measurement;
    }
}

export default Measurement;