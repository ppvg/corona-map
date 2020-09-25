<script>
    import sewageTool from "./sewage-tool";
    export default {
        name: 'sewage-tools',
        components: {
            sewageTool
        },
        props: {},
        computed: {},
        methods: {}
    }
</script>


<template>
    <div class="sewage-tools">
       <sewage-tool/>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .sewage-tools {
        height: 100%;
        overflow: auto;
    }
</style>