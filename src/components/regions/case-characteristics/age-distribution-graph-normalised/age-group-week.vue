<script>
    import GGD from "@/classes/GGD";
    import Country from "@/classes/Country";
    import thresholdTools from "@/tools/thresholds";

    export default {
        name: 'age-group-week',
        components: {},
        props: {
            region: {
                type: GGD | Country,
                required: true
            },
            ageGroup: {
                type: Object,
                required: true
            },
            week: {
                type: Number,
                required: true
            },
            population: {
                type: Number,
                required: true
            }
        },
        computed: {
            width() {
                return 7 * this.$store.state.settings.step;
            },
            currentDateOffset() {
                return this.$store.state.settings.currentDateOffset;
            },
            cases() {
                let cases, offset, start;
                cases = 0;
                offset = (this.week * 7) - this.currentDateOffset;
                start = this.region.report.length - 1 - offset;
                for (let i = start; i > start - 7; i--) {
                    let date, day, ageGroup;
                    date = this.$store.getters['ui/getDateByOffset'](offset, 'yyyy-MM-dd');
                    offset++;
                    day = this.region.report.find(d => d.date === date);
                    if (day) {
                        ageGroup = day.ageGroups.find(a => a.title === this.ageGroup.title);
                        if (ageGroup) {
                            cases += ageGroup.cases;
                        }
                    }
                }
                return cases;
            },
            casesPerPopulation() {
                return Math.round(100000 * this.cases / this.population);
            },
            threshold() {
                return thresholdTools.getThreshold(this.casesPerPopulation, 100000, 7);
            },
            color() {
                return thresholdTools.thresholdToColor(this.threshold, this.casesPerPopulation);
            },
            ageDistributionAbsolute() {
                return this.$store.state.settings.ageDistributionAbsolute;
            },
            value() {
                return this.ageDistributionAbsolute ? this.cases : this.casesPerPopulation;
            }
        },
        methods: {}
    }
</script>


<template>
    <div
        :style="{
            'width': width + 'px',
            'background': color
        }"
        class="age-group-week">
        {{value}}
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .age-group-week {
        border-right: 1px solid #fff;
        height: 100%;
        display: flex;
        padding: 4px;
        align-items: center;
        justify-content: center;
        transition: all 0.1s ease;
    }
</style>