<script>
    export default {
        name: 'date-string',
        components: {},
        props: {},
        computed: {
            dateString() {
                return this.$store.getters['ui/dateString'];
            }
        },
        methods: {}
    }
</script>


<template>
    <div class="date-string">
        {{dateString}}
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .date-string {

    }
</style>