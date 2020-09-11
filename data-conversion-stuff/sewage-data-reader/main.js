let url, sewerageDict, sewerageAreas;

url = 'https://data.rivm.nl/covid-19/COVID-19_rioolwaterdata.json';


$.getJSON(url, function(measurements) {
    let text = '';
    for (let measurement of measurements) {
        let month, day, value, postal, city;
        month = Number(measurement.Date_measurement.split('-')[1]);
        day = Number(measurement.Date_measurement.split('-')[2]);
        if (month < 5 && day < 15) {
            value = measurement.RNA_per_ml;
            if (value > 2000) {
                postal = measurement.Postal_code.substring(0, 4);
                city = window.postcodes[postal].city;
                text += (city + '\t' + measurement.Date_measurement + '\t' + value + '\n');
            }
        }
    }
    console.log(text);
});


