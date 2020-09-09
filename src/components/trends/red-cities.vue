<script>
    import city from "@/components/trends/city";

    export default {
        name: 'red-cities',
        components: {
            city
        },
        props: {},
        computed: {
            signalingSystem() {
                return this.$store.state.signalingSystems.current;
            },
            thresholds() {
                return this.signalingSystem.thresholds;
            },
            redCities() {
                let thresholds = this.signalingSystem.thresholds;
                return this.$store.state.cities.all.filter(city => {
                    return city.getThreshold() === thresholds[thresholds.length - 1];
                }).sort((a,b) => {
                    if (this.signalingSystem.days === 1){
                        return (a.getRelativeIncreaseDay() < b.getRelativeIncreaseDay()) ? 1 : ((b.getRelativeIncreaseDay() < a.getRelativeIncreaseDay()) ? -1 : 0)
                    } else {
                        return (a.getRelativeIncreaseWeek() < b.getRelativeIncreaseWeek()) ? 1 : ((b.getRelativeIncreaseWeek() < a.getRelativeIncreaseWeek()) ? -1 : 0)
                    }
                });
            },
            n() {
                return this.thresholds[this.thresholds.length - 2].n
            },
            days() {
                return this.signalingSystem.days + (this.signalingSystem.days > 1 ? ' dagen' : ' dag');
            }
        },
        methods: {
            getIndicator(city) {
                if (this.signalingSystem.days === 1) {
                    return city.getRelativeIncreaseDay();
                } else if (this.signalingSystem.days === 7) {
                    return city.getRelativeIncreaseWeek();
                }
            }
        }
    }
</script>


<template>
    <div class="section red-cities">
        <div class="section__header">
            Gemeentes met meer dan {{n}} besmettingen per 100.000 inwoners
            in de laatste {{days}}:
        </div>
        <div class="section__body">
            <div class="cities__list">
                <div
                    v-for="city in redCities"
                    class="city__container">
                    <city :city="city"/>
                    <div class="city__info">
                        ({{Math.round(getIndicator(city))}})
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .section {
        margin-bottom: 20px;

        .section__header {
            margin-bottom: 6px;
            font-weight: 700;
        }
    }
</style>