const maps = [
    {
        id: 1,
        title: 'Nederland',
        settings: {
            hasAgeGroups: true,
            hasSewageTreatmentPlants: true,
            map: {
                latitude: 52.15,
                longitude: 5.34,
                stretch: 0.62
            }
        },
        url: {
            tests: (window.config.dataUrl + 'data/municipality-totals.csv'),
            regions: 'data/cities.json',
            ageGroups: 'data/cities-population-agegroup.csv',
            sewageTreatmentPlants: (window.config.sewageDataUrl + 'sewage-measurements-connected-to-city-codes.json')
        }
    }, {
        id: 2,
        title: 'Appingedam',
        settings: {
            hasAgeGroups: true,
            hasSewageTreatmentPlants: true,
            map: {
                latitude: 52.15,
                longitude: 5.34,
                stretch: 0.62
            }
        },
        url: {
            tests: (window.config.dataUrl + 'data/municipality-totals.csv'),
            regions: 'data/cities-test.json',
            ageGroups: 'data/cities-population-agegroup.csv',
            sewageTreatmentPlants: (window.config.sewageDataUrl + 'sewage-measurements-connected-to-city-codes.json')
        }
    }
];

export default maps;