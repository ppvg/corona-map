<script>
    import City from "@/classes/City";
    import * as d3 from "d3";
    import jqueryCsv from 'jquery-csv';
    import $ from 'jquery';


    export default {
        name: 'case-characteristics',
        components: {},
        props: {
            city: {
                type: City,
                required: true
            }
        },
        computed: {},
        methods: {
            loadData() {
                // let url = 'https://data.rivm.nl/covid-19/COVID-19_casus_landelijk.csv';
                //
                // $.get(url, function(data) {
                //     let options={"separator" : ";"};
                //     jqueryCsv.toObjects(data, options, function(error, data) {
                //         console.log(error);
                //         console.log(data);
                //     });
                // });




            }
        },
        mounted() {
            this.loadData();
        }
    }
</script>


<template>
    <div class="case-characteristics">
        {{city.title}} case-characteristics
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .case-characteristics {

    }
</style>