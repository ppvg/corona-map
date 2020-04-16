<script>
    import City from "@/classes/City";

    export default {
        name: 'bulb',
        components: {},
        props: {
            city: {
                type: City,
                required: true
            }
        },
        computed: {
            size() {
                return Math.sqrt(this.hospitalAdmissions) * 1.5;
            },
            hospitalAdmissions() {
                if (this.city.hospitalAdmissions[this.$store.state.settings.currentDateOffset]) {
                    return this.city.hospitalAdmissions[this.$store.state.settings.currentDateOffset].n
                } else {
                    return 0;
                }
            }
        },
        methods: {}
    }
</script>


<template>
    <circle
        :r="size + 'px'"
        class="bulb"/>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .bulb {
        fill: rgba(255,0,0,0.5);
        transition: all 0.5s ease;
    }
</style>