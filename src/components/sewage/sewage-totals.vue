<script>
    export default {
        name: 'sewage-totals',
        components: {},
        props: {
            cities: {
                type: Array,
                required: true
            },
            settings: {
                type: Object,
                required: true
            }
        },
        computed: {
            sewages() {
                let sewages = [];
                for (let city of this.cities) {
                    let s = this.$store.state.sewageTreatmentPlants.all.filter(s => {
                        return s.city_code === city.identifier;
                    });
                    sewages = sewages.concat(s);
                }
                return sewages;
            },
            positiveTests() {

                return this.city.report.history.filter(day => {
                    return day.offset <= this.settings.start && day.offset >= this.settings.end;
                }).map(d => {
                    return Math.round(this.getRelative(d.positiveTests));
                })
            },
            positiveTestsAverage() {
                let n, population, l;
                n = 0;
                population = 0;
                for (let city of this.cities) {
                    let values, total;
                    values = city.report.history.filter(day => {
                        return day.offset <= this.settings.start && day.offset >= this.settings.end;
                    }).map(d => d.positiveTests);
                    l = values.length;
                    total = values.reduce((a, b) => a + b, 0);
                    n += total;
                    population += city.population;
                }
                return Math.round(7 * 100000 * n / population / l);
            },
            sewageAverage() {
                let totalValue = 0;
                if (this.cities.length === 0) {
                    return 0;
                }
                for (let city of this.cities) {
                    let sewages, valueForCity;
                    sewages = this.$store.state.sewageTreatmentPlants.all.filter(s => {
                        return s.city_code === city.identifier;
                    });
                    if (sewages.length > 0) {
                        valueForCity = 0;
                        for (let sewage of sewages) {
                            let measurements, valueForSewage;
                            measurements = sewage.measurements.filter(measurement => {
                                return measurement.dateOffset <= this.settings.start && measurement.dateOffset >= this.settings.end;
                            }).map(measurement => measurement.RNA_per_ml);
                            if (measurements.length > 0) {
                                // todo add correction for sewage size
                                valueForSewage = measurements.reduce((a, b) => a + b, 0) / measurements.length;
                                valueForCity += valueForSewage;
                            }
                        }
                        totalValue += (valueForCity / sewages.length);
                    }

                }
                return Math.round(totalValue / this.cities.length);
            }
        },
        methods: {}
    }
</script>


<template>
    <div class="sewage-totals">
        <div class="sewage-totals__title">
            Totaal
        </div>
        <div class="sewage-totals__values">
            <b>Positieve testen</b><br>
            Gemiddeld per 7 dagen<br>
            {{positiveTestsAverage}}<br><br>
            <b>Rioolmetingen</b> (nog niet gecorrigeerd op grootte RWZI)<br>
            Gemiddeld {{sewageAverage}} RNA/ml
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .sewage-totals {
        display: flex;

        .sewage-totals__title {
            width: 100px;
            padding: 10px;
            font-weight: 700;
        }
    }
</style>