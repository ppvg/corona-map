<script>
    import cities from "./cities";

    export default {
        name: 'cities-panel',
        components: {
            cities
        },
        props: {},
        computed: {},
        methods: {}
    }
</script>


<template>
    <div class="cities-panel">
        <cities/>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .cities-panel {
        padding: 12px;
    }
</style>