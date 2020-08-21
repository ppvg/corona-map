class SewageTreatmentPlant {
    constructor({
        sewageTreatementPlant_id = null,
        name = '',
        city_code = '',
        securityRegion_code = '',
        securityRegion_name = '',
        measurements = []
    }) {
        this.sewageTreatementPlant_id = sewageTreatementPlant_id;
        this.name = name;
        this.city_code = city_code;
        this.securityRegion_code = securityRegion_code;
        this.securityRegion_name = securityRegion_name;
        this.measurements = measurements;
    }
}

export default SewageTreatmentPlant;