let url, sewerageDict, sewerageAreas;

url = 'https://data.rivm.nl/covid-19/COVID-19_rioolwaterdata.json';
sewerageAreas = [];
sewerageDict = {};

const getDistrictCode = function(measurement) {
    if (measurement.RWZI_AWZI_name === 'Amsterdam-West') {
        return 'West';
    } else {
        return '';
    }
};

const getCityByPostalCode = function(postalCode) {
    let letters = postalCode.substring(0, 4);
    if (window.postcodes[letters]) {
        // GM is the convention already used in municipality-today.csv
        let code = window.postcodes[letters].city_code;
        if (code < 10) {
            return 'GM000' + code;
        } else if (code < 100) {
            return 'GM00' + code;
        } else if (code < 1000) {
            return 'GM0' + code;
        } else  {
            return 'GM' + code;
        }
    } else {
        return null;
    }
};

$.getJSON(url, function(measurements) {
    for (let measurementent of measurements) {
        let sewerageArea_code, postalCode, city_code, district_code;
        postalCode = measurementent.Postal_code;
        sewerageArea_code = measurementent.RWZI_AWZI_code;

        if (!sewerageDict[sewerageArea_code]) {
            city_code = getCityByPostalCode(postalCode);
            district_code = getDistrictCode(measurementent);
            sewerageDict[sewerageArea_code] = {
                sewerageArea_code,
                city_code,
                district_code,
                name: measurementent.RWZI_AWZI_name,
                security_region_code: measurementent.Security_region_code,
                security_region_name: measurementent.Security_region_name,
                measurements: []
            }
        }
        sewerageDict[sewerageArea_code].measurements.push({
            date: measurementent.Date_measurement,
            RNA_per_ml: measurementent.RNA_per_ml,
            representative_measurement: measurementent.Representative_measurement
        });
    }
    // dict to array
    for (let key in sewerageDict) {
        let sewerage = sewerageDict[key];
        sewerageAreas.push(sewerage);
    }
    console.log(JSON.stringify(sewerageAreas));
});


