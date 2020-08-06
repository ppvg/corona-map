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

        Deze kaart is gemaakt door <a href="https://innouveau.com/" target="_blank">Innouveau</a>
        <ul>
            <li>
                Data besmettingen via <a href="https://twitter.com/mzelst" target="_blank">@mzelst</a>,
                <a href="https://github.com/mzelst/covid-19/blob/master/data/municipality-today.csv" target="_blank">bron</a>
            </li>
            <li>
                Geo data via <a href="https://services.arcgis.com/" target="_blank">arcgis.com</a>
            </li>
            <li>
                Grenswaardes voor kleurindeling overgenomen van <a href="https://twitter.com/edwinveldhuizen" target="_blank">@edwinveldhuizen</a>
            </li>
            <li>
                Bron van deze applicatie: <a href="https://twitter.com/edwinveldhuizen" target="_blank">@edwinveldhuizen</a>
            </li>
        </ul>
        Volg of feedback: <a href="https://twitter.com/innouveau" target="_blank">@innouveau</a><br><br>
        <div
            @click="close()"
            class="close-button--small">
            Sluiten
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .credits {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: #fff;
        z-index: 10;
        padding: 20px;
        font-size: 16px;

        .close-button--small {
            text-decoration: underline;
            cursor: pointer;
        }

        a {
            color: #000;
        }
    }
</style>