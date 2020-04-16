<script>
    import $ from 'jquery';

    export default {
        name: 'inline-svg',
        components: {},
        props: {
            src: {
                type: String,
                required: true
            }
        },
        computed: {},
        methods: {
            readSvg() {
                console.log("!");
                $(this.$refs.container).empty();
                $.get(this.src, (data) => {
                    let svg = $(data).find('svg');
                    // Remove any invalid XML tags as per http://validator.w3.org
                    svg = svg.removeAttr('xmlns:a');
                    $(this.$refs.container).append(svg);

                }, 'xml');
            }
        },
        mounted() {
            this.readSvg();
        },
        watch: {
            src(){
                this.readSvg();
            }
        }
    }
</script>


<template>
    <div
        ref="container"
        class="inline-svg">
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .inline-svg {
        display: flex;
        align-items: center;
    }
</style>