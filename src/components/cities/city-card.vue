<script>
    import City from "@/classes/City";
    import trendLine from "./trend-line";

    export default {
        name: 'city-card',
        components: {
            trendLine
        },
        props: ['city'],
        computed: {},
        methods: {
            format(value) {
                if (value > 0) {
                    return '+' + value;
                } else {
                    return value;
                }
            },
            close() {
                this.$store.commit('ui/updateProperty', {key: 'currentCity', value: null});
            }
        }
    }
</script>


<template>
    <div class="city-card">
        <div
            @click="close()"
            class="city-card__close"></div>
        <div
            v-if="city"
            class="city-card__header">
            <div
                :style="{'background': city.color}"
                class="dot"></div>
            <div class="city-card__title">
                {{city.title}}
            </div>
        </div>
        <div
            v-if="city && city.report"
            class="city-card__info">
            <div class="city-card__section">
                <div class="city-card__row">
                    <div class="city-card__label">
                        Toename vandaag
                    </div>
                    <div class="city-card__value">
                        {{format(city.increaseDay)}}
                    </div>
                </div>
                <div class="city-card__row">
                    <div class="city-card__label">
                        Toename laatste 7 dagen
                    </div>
                    <div class="city-card__value">
                        {{format(city.increaseWeek)}}
                    </div>
                </div>
            </div>
            <div class="city-card__section">
                <div class="city-card__row">
                    <trend-line :city="city"/>
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .city-card {
        background: #fff;
        box-shadow: 2px 2px 12px rgba(0,0,0,0.2);
        padding: 20px;
        font-size: 15px;
        position: relative;

        .city-card__close {
            display: none;
        }

        .city-card__header {
            font-weight: 700;
            font-size: 20px;
            margin-bottom: 12px;
            display: flex;
            align-items: center;

            .dot {
                width: 12px;
                height: 12px;
                border-radius: 50%;
                margin-right: 10px;
            }
        }

        .city-card__info {

            .city-card__section {
                margin-bottom: 20px;
            }

            .city-card__row {
                display: flex;
                //align-items: center;
                padding: 2px 0;

                .city-card__label {
                    width: 220px;
                }

                .city-card__value {
                    font-weight: 700;
                    font-family: Courier;
                    font-size: 20px;
                    text-align: right;
                    width: calc(100% - 220px);
                    position: relative;
                }
            }
        }

        @include mobile() {

            .city-card__close {
                position: absolute;
                right: 12px;
                top: 12px;
                cursor: pointer;
                width: 24px;
                height: 24px;
                text-align: center;
                border-radius: 3px;
                display: block;

                &:before, &:after {
                    position: absolute;
                    left: 11px;
                    top: 2px;
                    content: ' ';
                    height: 18px;
                    width: 2px;
                    background-color: #000;
                }

                &:before {
                    transform: rotate(45deg);
                }
                &:after {
                    transform: rotate(-45deg);
                }
            }

            .city-card__header {
                margin-top: 16px;
            }
        }
    }
</style>