<script>
    import date from "./date";
    import mode from "./mode";

    export default {
        name: 'tools',
        components: {
            mode,
            date
        },
        props: {},
        computed: {},
        methods: {}
    }
</script>


<template>
    <div class="tools">
        <date/>
        <mode/>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .tools {
        padding: 20px;

        .tool {
            border-bottom: 1px solid #ddd;
            padding: 10px 0;
        }
    }
</style>