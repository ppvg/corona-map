<script>
    import GGD from "@/classes/GGD";
    import Country from "@/classes/Country";
    import AgeGroupWeek from "./age-group-week";

    export default {
        name: 'age-group',
        components: {AgeGroupWeek},
        props: {
            region: {
                type: GGD | Country,
                required: true
            },
            ageGroup: {
                type: Object,
                required: true
            },
            weeks: {
                type: Array,
                required: true
            }
        },
        computed: {
            currentDateOffset() {
                return this.$store.state.settings.currentDateOffset
            },
            population() {
                let population = 0;
                for (let city of this.region.getCities()) {
                    let ageGroup = city.ageGroups.find(a => a.title === this.ageGroup.title);
                    if (ageGroup) {
                        population += ageGroup.population;
                    }
                }
                return population;
            },
            width() {
                return 7 * this.$store.state.settings.step;
            }
        },
        methods: {}
    }
</script>


<template>
    <div class="age-group">
        <div class="age-group__weeks">
            <age-group-week
                v-for="week in weeks"
                :week="week"
                :age-group="ageGroup"
                :region="region"
                :population="population"/>
            <div
                :class="{'age-group__cover--display': currentDateOffset < 3}"
                :style="{'width': width + 'px'}"
                class="age-group__cover"></div>
        </div>
        <div
            :style="{'width': width + 'px'}"
            class="age-group__title">
            {{ageGroup.title}}
        </div>
        <div
            :style="{'width': width + 'px'}"
            class="age-group__population">
            {{population}}
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .age-group {
        display: flex;
        width: 100%;
        height: 32px;

        .age-group__title {
            height: 100%;
            padding: 4px 8px;
            align-items: center;
            justify-content: center;
            display: flex;
        }

        .age-group__population {
            height: 100%;
            padding: 4px 8px;
            align-items: center;
            justify-content: center;
            display: flex;
        }

        .age-group__weeks {
            height: 100%;
            display: flex;
            border-bottom: 1px solid #fff;
            position: relative;

            .age-group__cover {
                position: absolute;
                right: 0;
                top: 0;
                height: 100%;
                background: rgba(0,0,0,0.8);
                z-index: 1;
                opacity: 0;
                transition: all 0.2s ease;

                &.age-group__cover--display {
                    opacity: 1;
                }
            }
        }
    }
</style>