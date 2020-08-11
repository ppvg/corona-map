<script>
    import canvasTools from '@/tools/canvas';

    export default {
        name: 'download-image',
        components: {},
        props: {},
        computed: {
            cities() {
                return this.$store.state.cities.all;
            },
            width() {
                return this.$store.state.settings.canvasWidth;
            },
            height() {
                return this.$store.state.settings.canvasHeight;
            },
            dateString() {
                return this.$store.getters['ui/dateString'];
            }
        },
        methods: {
            download() {
                let canvas, body, ctx, image, width, height;
                width = this.width;
                height = this.height + 30;
                body = document.getElementsByTagName("body")[0];
                canvas = document.createElement('canvas');
                ctx = canvas.getContext("2d");

                canvas.id = 'image-for-download';
                canvas.width = width;
                canvas.height = height;
                //body.appendChild(canvas);

                canvasTools.addBackground(ctx, width, height);
                this.addDate(ctx);
                canvasTools.draw(ctx, this.cities, width, height);
                this.addCreator(ctx, width, height);

                image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
                window.location.href = image;
            },
            addDate(ctx) {
                ctx.font = 'bold 24px Arial';
                ctx.fillStyle = 'black';
                ctx.textAlign = 'left';
                ctx.fillText('Corona status', 12, 30);
                ctx.fillText(this.dateString, 12, 52);
            },
            addCreator(ctx, width, height) {
                ctx.font = '10px Arial';
                ctx.fillStyle = 'black';
                ctx.textAlign = 'right';
                ctx.fillText('Kaart door: @innouveau', (width - 10), (height - 10));
            }
        }
    }
</script>


<template>
    <div
        @click="download()"
        class="download-image icon-button">
        <img src="assets/img/tools/download.svg">
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .download-image {

    }
</style>