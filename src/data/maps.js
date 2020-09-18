const maps = [
    {
        id: 1,
        title: 'Nederland',
        regionType: 'Gemeente',
        settings: {
            regionTypes: ['ggd', 'sr', 'country'],
            hasAgeGroups: true,
            hasSewageTreatmentPlants: true,
            map: {
                latitude: 52.15,
                longitude: 5.34,
                stretch: 0.62,
                zoom: 0.345
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
        regionType: 'Stadsdeel',
        title: 'Amsterdam',
        settings: {
            regionTypes: ['ggd'],
            hasAgeGroups: false,
            hasTests: false,
            hasSewageTreatmentPlants: false,
            map: {
                latitude: 52.36,
                longitude: 4.92,
                stretch: 0.62,
                zoom: 4
            }
        },
        url: {
            tests: (window.config.dataUrl + 'data/municipality-totals.csv'),
            regions: 'data/amsterdam.json',
            ageGroups: 'data/cities-population-agegroup.csv',
            sewageTreatmentPlants: (window.config.sewageDataUrl + 'sewage-measurements-connected-to-city-codes.json')
        }
    }
];

export default maps;