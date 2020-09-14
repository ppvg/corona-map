<script>
    import region from "@/components/trends/region";
    import downloadRedRegions from "./download-red-regions";

    export default {
        name: 'red-regions',
        components: {
            downloadRedRegions,
            region
        },
        props: {},
        computed: {
            signalingSystem() {
                return this.$store.state.signalingSystems.current;
            },
            thresholds() {
                return this.signalingSystem.thresholds;
            },
            redRegions() {
                let thresholds, regions;
                thresholds = this.signalingSystem.thresholds;
                regions = this.$store.getters['ui/regions'];
                return regions.filter(region => {
                    return region.getThreshold() === thresholds[thresholds.length - 1];
                }).sort((a,b) => {
                    if (this.signalingSystem.days === 1){
                        return (a.getTotalRelativeIncreasDay() < b.getTotalRelativeIncreasDay()) ? 1 : ((b.getTotalRelativeIncreasDay() < a.getTotalRelativeIncreasDay()) ? -1 : 0)
                    } else {
                        return (a.getTotalRelativeIncreaseWeek() < b.getTotalRelativeIncreaseWeek()) ? 1 : ((b.getTotalRelativeIncreaseWeek() < a.getTotalRelativeIncreaseWeek()) ? -1 : 0)
                    }
                });
            },
            n() {
                return this.thresholds[this.thresholds.length - 2].n
            },
            days() {
                return this.signalingSystem.days + (this.signalingSystem.days > 1 ? ' dagen' : ' dag');
            },
            typeLabel() {
                return this.$store.getters['ui/typeLabel'];
            }
        },
        methods: {
            getIndicator(region) {
                if (this.signalingSystem.days === 1) {
                    return region.getTotalRelativeIncreasDay();
                } else if (this.signalingSystem.days === 7) {
                    return region.getTotalRelativeIncreaseWeek();
                }
            }
        }
    }
</script>


<template>
    <div class="section red-regions">
        <div class="section__header">
            {{typeLabel}} met meer dan {{n}} besmettingen per 100.000 inwoners
            in de laatste {{days}}:
        </div>
        <div class="section__body">
            <div class="regions__list">
                <div
                    v-for="region in redRegions"
                    class="region__container">
                    <region :region="region"/>
                    <div class="region__info">
                        ({{Math.round(getIndicator(region))}})
                    </div>
                </div>
            </div>
        </div>
        <div class="section__body">
            <download-red-regions
                :regions="redRegions"/>
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