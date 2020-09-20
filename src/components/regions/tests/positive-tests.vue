<script>
    import _Region from "@/classes/_Region";
    import testGraphMixin from "./test-graph-mixin";

    export default {
        name: 'positive-tests',
        components: {},
        mixins: [testGraphMixin],
        props: {
            region: {
                type: _Region,
                required: true
            }
        },
        computed: {
            canvas() {
                return document.getElementById('positive-tests-' + this.region.id);
            },
            colorSet() {
                return this.$store.state.ui.color;
            },
            signalingSystem() {
                return this.$store.state.signalingSystems.current;
            },
            isColorblind() {
                return this.colorSet === 'colorblind1';
            }
        },
        methods: {
            redraw() {
                this.clear();
                this.drawThresholds();
                this.drawGrid();
                if (this.days.length > 0) {
                    this.drawTrendLine();
                }
                this.drawDates();
            },
            drawThresholds() {
                let lastY, ctx, thresholds;
                lastY = 0;
                ctx = this.ctx;
                thresholds = this.signalingSystem.thresholds;
                if (!this.isColorblind) {
                    ctx.globalAlpha = 0.5;
                }
                for (let threshold of thresholds) {
                    if (threshold.n > 0) {
                        let height, x, y;
                        ctx.beginPath();
                        if (threshold.n !== Infinity) {
                            height = (this.zoom * threshold.n / this.signalingSystem.days) - lastY;
                            y = (this.height - this.paddingBottom) - lastY - height;
                        } else {
                            height = (this.height - this.paddingBottom) - lastY;
                            y = 0;
                        }
                        ctx.rect(0, y, this.width, height);
                        ctx.fillStyle = threshold.color[this.$store.state.ui.color];
                        ctx.closePath();
                        ctx.fill();
                        lastY += height;
                    }
                }
                ctx.globalAlpha = 1;
            },
            drawTrendLine() {
                let ctx, step, history, start, days;
                ctx = this.ctx;
                step = this.step;
                history = this.region.getTotalReport().history;

                const getY = (day) => {
                    // for the graph we always use 100000, independent from the signaling system
                    let relativeValue = 100000 * (day.positiveTests / this.currentMap.settings.testDataInterval) / this.region.getTotalPopulation();
                    return (this.height - this.paddingBottom) - (relativeValue * this.zoom);
                };

                ctx.beginPath();
                ctx.lineWidth = 1;
                ctx.strokeStyle = 'black';
                // draw 1 point extra, this point is out of the graph on the leftside
                start = 1;

                ctx.moveTo(this.getX(this.days[0]), getY(this.days[0]));
                days = this.days.slice(1);
                for (let day of days) {
                    ctx.lineTo(this.getX(day), getY(day));
                }
                ctx.stroke();
                ctx.closePath();
            }
        }
    }
</script>


<template>
    <div class="positive-tests">
        <canvas
            :id="'positive-tests-' + region.id"
            :width="width"
            :height="height"></canvas>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .positive-tests {
        margin-bottom: 12px;

        canvas {
            background: #eee;
        }
    }
</style>