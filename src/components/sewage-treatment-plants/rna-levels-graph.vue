<script>
    import SewageTreatmentPlant from "@/classes/SewageTreatmentPlant";

    export default {
        name: 'rna-levels-graph',
        components: {},
        props: {
            sewageTreatmentPlant: {
                type: SewageTreatmentPlant,
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
                return 'rna-levels-graph-' + this.sewageTreatmentPlant.sewageTreatementPlant_id;
            },
            height() {
                return 100;
            },
            step() {
                return 20;
            },
            width() {
                return (this.periodOfFocusLength * 2 - 1) * this.step;
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
            getX(date) {
                let ms = new Date(date).getTime();
                return this.width * (ms - this.startDateInMs) / (this.endDateInMs - this.startDateInMs)
            },
            drawGraph() {
                let max, ctx, index, points;
                index = 0;
                ctx = this.ctx;
                max = 10000;
                ctx.beginPath();
                ctx.lineWidth = 1;
                ctx.strokeStyle = 'black';
                points = this.sewageTreatmentPlant.measurements.map(measurement => {
                    return {
                        x: this.getX(measurement.date),
                        y: this.height - (measurement.RNA_per_ml / max * this.height)
                    }
                });
                for (let point of points) {
                    if (index === 0) {
                        ctx.moveTo(point.x, point.y);
                    } else {
                        ctx.lineTo(point.x, point.y);
                    }
                    index++;
                }
                ctx.stroke();
                ctx.closePath();

                for (let point of points) {
                    ctx.beginPath();
                    ctx.fillStyle = '#000';
                    ctx.arc(point.x, point.y, 2, 0, (Math.PI * 2), false);
                    ctx.fill();
                }
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
    <div class="rna-levels-graph">

        <canvas
                :id="id"
                :width="width"
                :height="height"></canvas>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .rna-levels-graph {

        canvas {
            background: #ddd;
        }
    }
</style>