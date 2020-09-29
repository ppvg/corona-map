<script>
    import mapTests from "@/components/main/map/map";
    import Datepicker from 'vuejs-datepicker';
    import dateTools from '@/tools/date';
    import headerMenu from "@/components/main/header-menu";
    import View from "@/classes/View";

    export default {
        name: 'compare-item',
        components: {
            headerMenu,
            mapTests,
            Datepicker
        },
        props: {
            view: {
                type: View,
                required: true
            },
            showLegend: {
                type: Boolean,
                required: true
            }
        },
        data() {
            return {
                date: dateTools.getDateByOffset(this.view.offset),
            }
        },
        computed: {
            historyLength() {
                return this.$store.state.settings.historyLength;
            },
            isAtEnd() {
                return this.view.offset === 0;
            },
            isAtStart() {
                return this.view.offset === this.historyLength;
            },
            currentMap() {
                return this.$store.state.maps.current;
            },
            disabledDates() {
                if (this.currentMap.settings.testDataInterval === 1) {
                    return {
                        days: []
                    };
                } else {
                    return {
                        days: [1,2,3,4,5,6]
                    }
                }
            }
        },
        methods: {
            updateOffset(value) {
                this.view.offset = dateTools.getDateOffset(this.$store.state.ui.todayInMs, value.getTime()) / this.currentMap.settings.testDataInterval;
                this.updateQuery();
            },
            move(value) {
                this.view.offset -= value;
                this.date = dateTools.getDateByOffset((this.view.offset * this.currentMap.settings.testDataInterval));
                this.updateQuery();
            },
            updateQuery() {
                // todo
            }
        }
    }
</script>


<template>
    <div class="compare-item">
        <div class="compare__header">
            <header-menu
                :offset="view.offset"
                :editable="false"/>
        </div>
        <div class="compare__body">
            <div class="compare__tools">
                <datepicker
                    :value="date"
                    :disabled-dates="disabledDates"
                    @input="updateOffset"/>
                <div
                    v-if="!isAtStart"
                    @click="move(-1)"
                    class="icon-button">
                    <img src="assets/img/tools/back.svg">
                </div>
                <div
                    v-if="!isAtEnd"
                    @click="move(1)"
                    class="icon-button">
                    <img src="assets/img/tools/forward.svg">
                </div>
            </div>
            <map-tests
                :show-tools="false"
                :show-legend="showLegend"
                :offset="view.offset"/>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .compare-item {
        border-right: 1px solid #ddd;

        &:last-child {
            border-right: 0;
        }

        .compare__header {
            height: 48px;

            .header-menu {
                height: 100%;
            }
        }

        .compare__body {
            height: calc(100% - 48px);
            padding: 8px;

            .compare__tools {
                height: 48px;
                display: flex;
                align-items: center;


                input {
                    margin-right: 20px;
                }

                .icon-button {
                    margin-right: 8px;
                }
            }

            .map {
                height: calc(100% - 48px);
                padding: 8px;
            }
        }


    }
</style>