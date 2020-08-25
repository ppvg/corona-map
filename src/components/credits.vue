<script>
    export default {
        name: 'credits',
        components: {},
        props: {},
        computed: {},
        methods: {
            close() {
                this.$store.commit('ui/updateProperty', {key: 'credits', value: false});
            }
        }
    }
</script>


<template>
    <div class="credits">
        <div
            @click="close()"
            class="close-button"></div>
        <div class="credits__section">
            Deze kaart is gemaakt door <a href="https://innouveau.com/" target="_blank">Innouveau</a>
        </div>

        <div class="credits__section">
            Bronnen en dank voor data:
            <ul>
                <li>
                    Data besmettingen via <a href="https://twitter.com/mzelst" target="_blank">@mzelst</a>,
                    <a href="https://github.com/mzelst/covid-19/blob/master/data/municipality-totals.csv" target="_blank">bron</a>
                </li>
                <li>
                    Data rioolmetingen via <a href="https://data.rivm.nl/covid-19/COVID-19_rioolwaterdata.json" target="_blank">RIVM</a>
                </li>
                <li>
                    Geo data via <a href="https://services.arcgis.com/" target="_blank">arcgis.com</a>
                </li>
                <li>
                    Grenswaardes voor kleurindeling overgenomen van <a href="https://twitter.com/edwinveldhuizen" target="_blank">@edwinveldhuizen</a>
                </li>
            </ul>
        </div>
        <div class="credits__section">
            Bron van deze applicatie: <a href="https://github.com/innouveau/corona-map" target="_blank">github repo</a>
        </div>
        <div class="credits__section">
            Volg of feedback: <img class="twitter-icon" src="assets/img/twitter.png"> <a href="https://twitter.com/innouveau" target="_blank">@innouveau</a>
        </div>
        <div class="credits__section">
            <div
                @click="close()"
                class="close-button--small">
                Sluiten
            </div>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .credits {
        position: fixed;
        left: 20px;
        top: 20px;
        width: calc(100% - 40px);
        height: calc(100% - 40px);
        background: #fff;
        z-index: 10;
        font-size: 16px;
        box-shadow: 2px 2px 12px rgba(0,0,0,0.2);

        .credits__section {
            padding: 20px;
            border-bottom: 1px solid #ddd;

            &:last-child {
                border-bottom: 0;
            }

            .twitter-icon {
                display: inline-block;
                height: 24px;
                width: auto;
                margin-bottom: -5px;
            }
        }

        .close-button--small {
            text-decoration: underline;
            cursor: pointer;
        }

        a {
            color: #000;
        }

        @include mobile() {
            left: 0;
            width: 100%;
            top: 0;
            height: 100%;
            overflow: auto;
        }
    }
</style>