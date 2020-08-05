<script>
    import City from "@/classes/City";
    import TrendLine from "./trend-line";

    export default {
        name: 'city-card',
        components: {TrendLine},
        props: {
            city: {
                type: City,
                required: true
            }
        },
        computed: {
            increaseDay() {
                return this.format(this.city.report.increaseDay);
            },
            increaseWeek() {
                return this.format(this.city.report.increaseWeek);
            }
        },
        methods: {
            format(value) {
                if (value > 0) {
                    return '+' + value;
                } else {
                    return value;
                }
            }
        }
    }
</script>


<template>
    <div class="city-card">
        <div class="city-card__header">
            <div
                :style="{'background': city.color}"
                class="dot"></div>
            <div class="city-card__title">
                {{city.title}}
            </div>
        </div>
        <div
            v-if="city.report"
            class="city-card__info">
            <div class="city-card__section">
                <div class="city-card__row">
                    <div class="city-card__label">
                        Toename vandaag
                    </div>
                    <div class="city-card__value">
                        {{increaseDay}}
                    </div>
                </div>
                <div class="city-card__row">
                    <div class="city-card__label">
                        Toename week
                    </div>
                    <div class="city-card__value">
                        {{increaseWeek}}
                    </div>
                </div>
            </div>
            <div class="city-card__section">
                <div class="city-card__row">
                    <div class="city-card__label">
                        Trendlijn
                    </div>
                    <div class="city-card__value">
                        <trend-line
                            :city="city"/>
                    </div>
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
                    width: 200px;
                }

                .city-card__value {
                    font-weight: 700;
                    font-family: Courier;
                    font-size: 20px;
                }
            }
        }
    }
</style>