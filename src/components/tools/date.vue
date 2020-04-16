<script>
    import dateSlider from "./date-slider";
    import datePlay from "./date-play";

    export default {
        name: 'date',
        components: {
            datePlay,
            dateSlider
        },
        props: {},
        computed: {
            currentDate() {
                let date = new Date(this.$store.state.settings.dateStart);
                date.setDate(date.getDate() + this.$store.state.settings.currentDateOffset);
                return new Date(date).toLocaleDateString();
            }
        },
        methods: {}
    }
</script>


<template>
    <div class="date tool">
        <div class="date__date">
            {{currentDate}}
        </div>

        <div class="date__tools">
            <date-slider/>
            <date-play/>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .date {

        .date__date {
            font-size: 16px;
            font-weight: 700;
            margin-bottom: 8px;
        }

        .date__tools {
            width: 400px;
        }
    }
</style>