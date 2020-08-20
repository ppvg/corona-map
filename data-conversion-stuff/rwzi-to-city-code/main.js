let url, sewerageDict, sewerageAreas;

url = 'https://data.rivm.nl/covid-19/COVID-19_rioolwaterdata.json';
sewerageAreas = [];
sewerageDict = {};

const getCityByPostalCode = function(postalCode) {
    let letters = postalCode.substring(0, 4);
    if (window.postcodes[letters]) {
        // GM is the convention already used in municipality-today.csv
        return 'GM' + window.postcodes[letters].city_code;
    } else {
        return null;
    }
};

$.getJSON(url, function(measurementents) {
    for (let measurementent of measurementents) {
        let sewerageArea_code, postalCode, city_code;
        postalCode = measurementent.Postal_code;
        sewerageArea_code = measurementent.RWZI_AWZI_code;

        if (!sewerageDict[sewerageArea_code]) {
            city_code = getCityByPostalCode(postalCode);
            sewerageDict[sewerageArea_code] = {
                sewerageArea_code,
                city_code,
                name: measurementent.RWZI_AWZI_name,
                security_region_code: measurementent.Security_region_code,
                security_region_name: measurementent.Security_region_name,
                measurementents: []
            }
        }
        sewerageDict[sewerageArea_code].measurementents.push({
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


