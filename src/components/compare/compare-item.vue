<script>
    import mapTests from "@/components/main/map/map";
    import Datepicker from 'vuejs-datepicker';
    import dateTools from '@/tools/date';
    import headerMenu from "@/components/main/header-menu";
    import View from "@/classes/View";
    import regionDetailsShort from "@/components/main/regions/region-details/region-details-short";

    export default {
        name: 'compare-item',
        components: {
            regionDetailsShort,
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
                this.$parent.updateQuery();
            }
        }
    }
</script>


<template>
    <div class="compare-item">
        <div class="compare__header">
            <header-menu
                :view="view"
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
            <div class="compare__map">
                <div
                    v-if="view.currentRegion"
                    class="region-details__container">
                    <region-details-short
                        :view="view"
                        :region="view.currentRegion"/>
                </div>

                <map-tests
                    :show-tools="false"
                    :show-legend="showLegend"
                    :view="view"/>
            </div>

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

            .compare__tools {
                height: 56px;
                display: flex;
                align-items: center;
                border-bottom: 1px solid #ddd;
                padding: 0 8px;


                input {
                    margin-right: 20px;
                }

                .icon-button {
                    margin-right: 8px;
                }
            }

            .compare__map {
                height: calc(100% - 56px);
                padding: 8px;
                position: relative;

                .map {
                    height: 100%;
                    width: 80%;
                }

                .region-details__container {
                    position: absolute;
                    right: 10px;
                    top: 10px;
                    width: 200px;
                    z-index: 1;

                    .region-details__row {
                        display: block;

                        .region-details__label {
                            width: 100%;
                        }

                        .region-details__value {
                            width: 100%;
                            text-align: left;
                        }
                    }
                }
            }
        }

        @include mobile() {

            .compare__body {

                .compare__map {

                    .map {
                        width: 100%;
                    }

                    .region-details__container {
                        display: none;
                    }
                }
            }
        }
    }
</style>