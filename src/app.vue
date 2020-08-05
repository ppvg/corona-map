<script>
    import mapNetherlands from "./components/map/map";
    import cities from '@/data/areas.json';
    import citiesPanel from "./components/cities/cities-panel";
    import cityCard from "./components/cities/city-card";
    import * as d3 from 'd3';
    import stringTool from '@/tools/string';
    import {format, sub } from 'date-fns'
    import { nl } from 'date-fns/locale'


    export default {
        name: 'app',
        components: {
            cityCard,
            citiesPanel,
            mapNetherlands
        },
        props: {},
        computed: {
            dataLoaded() {
                return this.$store.state.dataLoaded;
            },
            currentCity() {
                return this.$store.state.ui.currentCity;
            },
            width() {
                return this.$store.state.settings.canvasWidth;
            },
            lastDates() {
                let n, dates, today;
                n = this.$store.state.ui.historyLength + 1;
                dates = [];
                today = this.$store.state.ui.today;
                for (let i = 0; i < n; i++) {
                    let date, formatted;
                    date = sub(today, {days: (i + 1)}) ;
                    formatted = format(date, 'yyyy-MM-dd');
                    dates.unshift(formatted);
                }
                return dates;
            },
            todayString() {
                return this.$store.state.ui.today ? format(this.$store.state.ui.today, 'EEEE d MMMM', {locale: nl} ) : '';
            }
        },
        methods: {
            init() {
                let wh, ratio;
                wh = window.innerHeight - 50;
                ratio = wh / 500;
                this.$store.commit('settings/updateProperty', {key: 'canvasHeight', value: wh});
                this.$store.commit('settings/updateProperty', {key: 'canvasWidth', value: ratio * 400});
                this.$store.commit('settings/updateProperty', {key: 'zoom', value: ratio * 145});

                this.loadData();
            },
            loadData() {
                //let url = 'https://github.com/mzelst/covid-19/blob/master/data/municipality-today.csv';
                let url = window.config.dataUrl + 'data/municipality-today.csv';
                this.$store.commit('cities/init', cities.features);
                d3.csv(url)
                    .then((data) => {
                        this.getDate(data);
                        for (let item of data) {
                            this.addReport(item);
                        }
                        this.$store.commit('updateProperty', {key: 'dataLoaded', value: true});
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            },
            getDate(data) {
                let key, dateString, set, today;
                if (data.columns) {
                    key = data.columns[data.columns.length - 5];
                    set = key.split('Total_reported.');
                    if (set.length > 0) {
                        dateString = set[1];
                        today = new Date(dateString);
                        this.$store.commit('ui/updateProperty', {key: 'today', value: today});
                    }
                }

            },
            addReport(data) {
                let key, city, report, absoluteNumbers;
                absoluteNumbers = [];
                const convertToNumber = function(value) {
                    let numb = Number(value);
                    if (!isNaN(numb)) {
                        return numb;
                    } else {
                        return null;
                    }
                };

                report = {
                    increaseDay: convertToNumber(data['increase']),
                    increaseWeek: convertToNumber(data['increase.week']),
                    relativeIncreaseDay: convertToNumber(data['rel.increase']),
                    relativeIncreaseWeek: convertToNumber(data['rel.increase.week']),
                    history: []
                };
                for (let date of this.lastDates) {
                    let dateKey = 'Total_reported.' + date;
                    if (data[dateKey]) {
                        absoluteNumbers.push(Number(data[dateKey]));
                    }
                }
                for (let i = 0, l = absoluteNumbers.length; i < l; i++) {
                    if (i > 0) {
                        let value = absoluteNumbers[i] - absoluteNumbers[i - 1];
                        report.history.push(value);
                    }
                }

                key = stringTool.titleForSorting(data.Municipality_name);
                if (this.$store.state.cities.dict[key]) {
                    city = this.$store.state.cities.dict[key];
                    this.$store.commit('cities/updatePropertyOfItem', {item: city, property: 'report', value: report});
                    this.$store.commit('cities/updatePropertyOfItem', {item: city, property: 'population', value: convertToNumber(data.population)})
                } else {
                    console.log('not found ' + key);
                }
            }

        },
        mounted() {
            this.init();
        }
    }
</script>


<template>
    <div class="app">

        <h1>
            Corona status {{todayString}}
        </h1>

        <div class="content">
            <div
                    :style="{'width': width + 'px'}"
                    class="map__container">

                <map-netherlands v-if="dataLoaded"/>
            </div>


            <div class="info-panel">
                <cities-panel v-if="dataLoaded"/>
                <city-card
                        v-if="currentCity"
                        :city="currentCity"/>
            </div>
        </div>

    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .app {
        padding: 10px;
        overflow: hidden;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;

        h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 900;
            line-height: 1.1;
            //border-bottom: 4px solid #000;
            padding-bottom: 4px;
            display: inline-block;
        }

        .content {
            display: flex;
            align-items: center;

            .map__container {
                padding: 10px;
            }

            .info-panel {
                width: 300px;
                //padding: 20px 10px 10px 10px;
            }
        }
    }
</style>