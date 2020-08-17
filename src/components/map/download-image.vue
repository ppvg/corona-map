<script>
    import canvasTools from '@/tools/canvas';
    import thresholds from '@/data/thresholds';

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
            },
            dateStringdashes() {
                return this.dateString.replace(/\s/g , "-");
            },
        },
        methods: {
            download() {
                let canvas, body, ctx, image, width, height, downloadLink;
                width = this.width;
                height = this.height + 30;
                body = document.getElementsByTagName("body")[0];
                downloadLink = document.createElement('a');
                canvas = document.createElement('canvas');
                ctx = canvas.getContext("2d");

                canvas.id = 'image-for-download';
                canvas.width = width;
                canvas.height = height;

                canvasTools.addBackground(ctx, width, height);
                this.addHead(ctx).then(() => {

                    this.addDate(ctx);
                    this.addLegend(ctx);
                    canvasTools.draw(ctx, this.cities, width, height);
                    this.addCreator(ctx, width, height);

                    downloadLink.setAttribute('download', 'corona-status-' + this.dateStringdashes + '.png');
                    canvas.toBlob(function(blob) {
                        let url = URL.createObjectURL(blob);
                        downloadLink.setAttribute('href', url);
                        downloadLink.click();
                    });
                });
            },
            addHead(ctx) {
                let width, height, scale;
                width = 276;
                height = 46;
                scale = 0.75;
                return new Promise((resolve, reject) => {
                    let img = new Image();
                    img.src = 'assets/img/corona-status.png';
                    img.onload = function () {
                        ctx.drawImage(img, 6, 12, (width * scale), (height * scale));
                        resolve();
                    }
                });
            },
            addDate(ctx) {
                ctx.font = 'bold 12px Arial';
                ctx.fillStyle = 'black';
                ctx.textAlign = 'left';
                ctx.fillText(this.dateString, 11, 55);
            },
            addLegend(ctx) {
                let baseY, baseX;
                baseY = 80;
                baseX = 16;
                ctx.strokeStyle = '#555';
                ctx.font = '7px Arial';
                for (let threshold of thresholds.thresholds) {
                    ctx.fillStyle = threshold.color;
                    ctx.beginPath();
                    ctx.arc(baseX, baseY, 6, 0, (Math.PI * 2), false);
                    ctx.stroke();
                    ctx.fill();
                    ctx.fillStyle = 'black';
                    ctx.fillText(thresholds.getNumber(threshold), baseX + 12, (baseY + 2));
                    baseY += 16;
                }
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