<script>
    import dateString from "@/components/elements/date-string";
    import MenuButton from "./menu-button";
    import totalInfections from "@/components/elements/total-infections";

    export default {
        name: 'header-menu',
        components: {
            totalInfections,
            MenuButton,
            dateString
        },
        props: {},
        computed: {
            buttons() {
                return [
                    {
                        label: 'Kaart',
                        value: 'map'
                    }, {
                        label: 'Trends',
                        value: 'trends'
                    }, {
                        label: 'Detail',
                        value: 'city'
                    }
                ]
            },
            currentMap() {
                return this.$store.state.maps.current
            },
            hasTests() {
                return this.currentMap && this.currentMap.settings.hasTests;
            },
            mapTitle() {
                return this.$store.state.maps.current ? this.$store.state.maps.current.title : '';
            },
            perWeek() {
                return this.currentMap.settings.testDataInterval === 7;
            }
        },
        methods: {}
    }
</script>


<template>
    <div class="header-menu">
        <div class="title">
            <div class="title__main">
                Corona status {{mapTitle}}
            </div>

            <div class="title__sub">
                <date-string/>
                <total-infections v-if="hasTests"/>
                <div
                        v-if="perWeek"
                        class="title__small">
                    (per 7 dagen)
                </div>
            </div>
        </div>

        <div class="menu">
            <menu-button
                v-for="button in buttons"
                :button="button"/>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .header-menu {
        align-items: center;
        background: #fff;
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        position: relative;
        z-index: 1;

        .title {
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;

            .title__main {
                font-size: 24px;
                font-weight: 700;
                margin-right: 10px;
            }

             .title__sub {
                font-size: 20px;
                display: flex;

                .date-string {
                    width: 116px;
                    display: block;
                    white-space: nowrap;
                }

                .total-infections {
                    background: #ddd;
                    padding: 2px 5px;
                    border-radius: 2px;
                }

                .title__small {
                    font-size: 12px;
                    margin-top: -2px;
                    margin-left: 4px;
                }
            }
        }

        .menu {
            height: 32px;
            display: none;
        }

        @include mobile() {

            .title {
                height: 32px;
                border-bottom: 1px solid #aaa;

                h1 {
                    font-size: 14px;
                }
            }

            .menu {
                display: flex;
            }
        }
    }
</style>