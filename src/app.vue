<script>
    import cities from '@/data/cities-postcodes';
    import mapNetherlands from "./components/map/map";
    import Postcode from "@/classes/Postcode";
    import * as d3 from 'd3';
    import tools from "./components/tools/tools";

    export default {
        name: 'app',
        components: {
            tools,
            mapNetherlands
        },
        props: {},
        computed: {
            dataLoaded() {
                return this.$store.state.dataLoaded;
            }
        },
        methods: {
            getCity(cityName) {
                return this.$store.getters['cities/getItemByProperty']('title', cityName, false)
            },
            init() {
                // let cns = cities.map(c => {
                //     let cn = {...c};
                //     cn.postcodes = [c.postcodes[0]];
                //     return cn;
                // });
                this.$store.commit('cities/init', cities);
                this.loadCsv();
            },
            loadCsv() {
                let cases, fatalities;

                d3.csv('data/hospital-admissions.csv')
                    .then((response) => {
                        for (let item of response) {
                            let city = this.getCity(item.Gemeentenaam);
                            if (city) {
                                this.$store.commit('cities/addHospitalAdmissions', {item, city})
                            }
                        }
                    })
                    .catch((error) => {});
            },
            print() {
                for (let postcode of postcodes) {
                    let city = this.getCity(postcode.gemeente);
                    if (!city) {
                        this.$store.commit('cities/create', {id: (this.$store.state.cities.all.length + 1), title: postcode.gemeente});
                        city = this.$store.getters['cities/getLastItem'];
                    }
                    this.$store.commit('cities/addPostcode', {postcode: new Postcode(postcode), city})
                }
                let print = this.$store.state.cities.all.map(city => {
                    let c = {...city};
                    c.postcodes = city.postcodes.map(postcode => {
                        return {...postcode};
                    });
                    return c;
                });
                console.log(JSON.stringify(print));
            }
        },
        mounted() {
            this.init();
        }
    }
</script>


<template>
    <div class="app">
        <h2>
            Ziekenhuisopnames Covid-19 per gemeente
        </h2>
        <div class="content">
            <map-netherlands/>
            <tools/>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .app {

        .content {
            position: relative;
            display: flex;

            .map {
                margin-right: 10px;
            }
        }
    }
</style>