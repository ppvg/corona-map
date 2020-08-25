<script>
    import City from "@/classes/City";

    export default {
        name: 'case-characteristics',
        components: {},
        props: {
            city: {
                type: City,
                required: true
            }
        },
        computed: {},
        methods: {
            loadData() {

            }
        },
        mounted() {
            this.loadData();
        }
    }
</script>


<template>
    <div class="case-characteristics">
        {{city.title}} case-characteristics
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .case-characteristics {

    }
</style>