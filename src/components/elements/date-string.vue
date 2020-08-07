<script>
    import { nl } from 'date-fns/locale'
    import {format, sub} from 'date-fns'

    export default {
        name: 'date-string',
        components: {},
        props: {},
        computed: {
            today() {
                return this.$store.state.ui.today;
            },
            offset() {
                return this.$store.state.settings.currentDateOffset;
            },
            dateOfFocus() {
                return sub(this.today, {days: this.offset}) ;
            },
            dateString() {
                return format(this.dateOfFocus, 'EEEE d MMMM', {locale: nl} );
            }
        },
        methods: {}
    }
</script>


<template>
    <div
        v-if="today"
        class="date-string">
        {{dateString}}
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .date-string {

    }
</style>