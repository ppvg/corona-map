<script>
    export default {
        name: 'age-distribution-tools',
        components: {},
        props: {},
        computed: {
            currentDateOffset() {
                return this.$store.state.settings.currentDateOffset;
            },
            ageDistributionAbsolute: {
                get() {
                    return this.$store.state.settings.ageDistributionAbsolute;
                },
                set(value) {
                    this.$store.commit('settings/updateProperty', {key: 'ageDistributionAbsolute', value: !this.ageDistributionAbsolute});
                }
            },
            description() {
                if (this.ageDistributionAbsolute) {
                    return 'De waardes in deze grafiek zijn aantallen positieve tests per leeftijdsgroep, gedurende 7 dagen';
                } else {
                    return 'De waardes in deze grafiek zijn aantallen positieve tests per 100.000 inwoners van die leeftijdsgroep, gedurende 7 dagen';
                }
            },
            showException() {
                return this.currentDateOffset < 3;
            }
        },
        methods: {
            move(x) {
                this.$store.commit('settings/updateProperty', {key: 'currentDateOffset', value: (this.currentDateOffset + x)});
            }
        }
    }
</script>


<template>
    <div class="age-distribution-tools">
        <div class="age-distribution-tools__text">
            {{description}}
        </div>
        <div class="age-distribution-tools__text">
            <div v-if="showException">
                * De data van de laatste dagen wordt nog aangevuld, daarom wordt deze week verborgen.
            </div>
        </div>
        <div class="age-distribution-tools__tools">
            <div class="age-distribution-absolute">
                <input
                    type="checkbox"
                    v-model="ageDistributionAbsolute"/> Absolute waardes
            </div>
            <div
                    @click="move(1)"
                    class="icon-button">
                <img src="assets/img/tools/back.svg">
            </div>
            <div
                    @click="move(7)"
                    class="icon-button">
                <img src="assets/img/tools/7xback.svg">
            </div>
            <div
                v-if="currentDateOffset > 6"
                @click="move(-7)"
                class="icon-button">
                <img src="assets/img/tools/7xforward.svg">
            </div>
            <div
                v-if="currentDateOffset > 0"
                @click="move(-1)"
                class="icon-button">
                <img src="assets/img/tools/forward.svg">
            </div>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .age-distribution-tools {
        font-size: 12px;

        .age-distribution-tools__text {
            height: 36px;
            margin-bottom: 12px;
        }


        .age-distribution-tools__tools {
            display: flex;

            .age-distribution-absolute {
                display: flex;
                align-items: center;
                margin-right: 10px;
            }

            .icon-button {
                margin-right: 4px;
            }
        }
    }
</style>