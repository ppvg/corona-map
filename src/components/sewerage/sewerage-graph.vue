<script>
    import SewerageArea from "@/classes/SewerageArea";

    export default {
        name: 'sewerage-graph',
        components: {},
        props: {
            sewerageArea: {
                type: SewerageArea,
                required: true
            }
        },
        computed: {
            msPerDay() {
                return 1000 * 3600 * 24;
            },
            periodOfFocusLength() {
                return this.$store.state.settings.periodOfFocusLength;
            },
            currentDateOffset() {
                return this.$store.state.settings.currentDateOffset;
            },
            todayInMs() {
                return this.$store.state.ui.today.getTime();
            },
            startDateInMs() {
                return this.endDateInMs - (2 * this.periodOfFocusLength * this.msPerDay)
            },
            endDateInMs() {
                return this.todayInMs - (this.currentDateOffset * this.msPerDay)
            },
            canvas() {
                return document.getElementById(this.id);
            },
            ctx() {
                return this.canvas.getContext('2d');
            },
            id() {
                return 'sewerage-graph-' + this.sewerageArea.id;
            },
            height() {
                return 200;
            },
            step() {
                return 10;
            },
            width() {
                return this.periodOfFocusLength * 2 * this.step;
            },
        },
        methods: {
            redraw() {
                this.clear();
                this.drawGraph();
            },
            clear() {
                this.ctx.clearRect(0, 0, this.width, this.height);
            },
            getX(ms) {
                return this.width * (ms - this.startDateInMs) / (this.endDateInMs - this.startDateInMs)
            },
            drawGraph() {
                let max, ctx, index;
                index = 0;
                ctx = this.ctx;
                max = 10000;
                ctx.beginPath();
                ctx.lineWidth = 1;
                ctx.strokeStyle = 'black';
                for (let measurement of this.sewerageArea.sewerageMeasurements) {
                    let x, y;
                    x = this.getX(measurement.dateMs);
                    y = this.height - (measurement.rnaLevel / max * this.height);
                    if (index === 0) {
                        ctx.moveTo(x, y);
                    } else {
                        ctx.lineTo(x, y);
                    }
                    index++;
                }
                ctx.stroke();
                ctx.closePath();
            }
        },
        mounted() {
            this.redraw();
        },
        watch: {
            sewerageArea: function (newValue, oldValue) {
                if (this.sewerageArea) {
                    setTimeout(() => {
                        this.redraw();
                    })
                }
            },
            currentDateOffset: {
                handler: function(newValue) {
                    setTimeout(() => {
                        this.redraw();
                    })
                }
            }
        }
    }
</script>


<template>
    <div class="sewerage-graph">

        <canvas
            :id="id"
            :width="width"
            :height="height"></canvas>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .sewerage-graph {

        canvas {
            background: #ddd;
        }
    }
</style>