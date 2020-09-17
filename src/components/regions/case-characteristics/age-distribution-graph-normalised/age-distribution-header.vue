<script>
    export default {
        name: 'age-distribution-header',
        components: {},
        props: {
            weeks: {
                type: Array,
                required: true
            }
        },
        computed: {
            width() {
                return 7 * this.$store.state.settings.step;
            },

        },
        methods: {
            getDateString(week) {
                let date1, date2, format1, format2;
                format1 = 'd';
                format2 = 'd MMM';
                date1 = this.$store.getters['ui/getDateByOffset']((week * 7 + 6), format1);
                date2 = this.$store.getters['ui/getDateByOffset']((week * 7), format2);
                return date1 + ' - ' + date2;
            }
        }
    }
</script>


<template>
    <div class="age-distribution-header">
        <div
            v-for="week in weeks"
            :style="{
            'width': width + 'px'
            }"
            class="age-distribution-header__week">
            {{getDateString(week)}}
        </div>
        <div
            :style="{'width': width + 'px'}"
            class="age-distribution-header__week">
            Leeftijd
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .age-distribution-header {
        display: flex;
        width: 100%;
        height: 32px;


        .age-distribution-header__week {
            height: 100%;
            padding: 2px;
            background: #ddd;
            display: flex;
            align-items: center;
            justify-content: center;
            border-right: 1px solid #fff;
            font-size: 10px;
        }
    }
</style>