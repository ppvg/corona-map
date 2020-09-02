<script>
    import dateString from "./elements/date-string";
    import MenuButton from "./menu-button";
    import totalInfections from "./elements/total-infections";

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
            }
        },
        methods: {}
    }
</script>


<template>
    <div class="header-menu">
        <div class="title">
            <h1>
                Corona status <date-string/> <total-infections/>
            </h1>
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

        .title {
            height: 100%;
            display: flex;
            align-items: center;

            h1 {
                font-size: 24px;
                text-align: center;
                margin: 0;
                width: 100%;
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