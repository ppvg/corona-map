<script>
    import _Region from "@/classes/_Region";

    export default {
        name: 'test-graph',
        components: {},
        props: {
            region: {
                type: _Region,
                required: true
            }
        },
        computed: {
            canvas() {
                return document.getElementById('test-graph-' + this.region.id);
            },
            ctx() {
                return this.canvas.getContext('2d');
            },
            height() {
                return 200;
            },
            step() {
                return 20;
            },
            width() {
                return this.periodOfFocusLength * 2 * this.step;
            },
            min() {
                return Math.min( ...this.region.getTotalReport().history );
            },
            max() {
                return Math.max( ...this.region.getTotalReport().history );
            },
            difference() {
                return this.max - this.min;
            },
            zoom() {
                return 3;
            },
            periodOfFocusLength() {
                return this.$store.state.settings.periodOfFocusLength;
            },
            offset() {
                return this.$store.state.settings.currentDateOffset;
            },
            dateString() {
                return this.$store.getters['ui/dateString'];
            },
            isColorblind() {
                return this.colorSet === 'colorblind1';
            },
            colorSet() {
                return this.$store.state.ui.color;
            },
            signalingSystem() {
                return this.$store.state.signalingSystems.current;
            }
        },
        methods: {
            redraw() {
                this.clear();
                this.drawThresholds();
                this.drawGrid();
                this.drawTrendLine();
                this.drawDate();
            },
            clear() {
                this.ctx.clearRect(0, 0, this.width, this.height);
            },
            drawDate() {
                let ctx = this.ctx;
                ctx.font = '12px Arial';
                ctx.textAlign = 'right';
                ctx.fillStyle = '#000';
                ctx.fillText(this.dateString, (this.width - 10), 20);
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
                            y = this.height - lastY - height;
                        } else {
                            height = (this.height - lastY);
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
            drawGrid() {
                let ctx, set;
                ctx = this.ctx;
                set = Array.from(Array(2 * this.periodOfFocusLength).keys());
                for (let i of set) {
                    let x = i * this.step;
                    ctx.beginPath();
                    ctx.lineWidth = 1;
                    ctx.strokeStyle = i === 7 ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.1)';
                    ctx.moveTo(x, 0);
                    ctx.lineTo(x, this.height);
                    ctx.stroke();
                    ctx.closePath();
                }
            },
            drawTrendLine() {
                let ctx, step, history, start;
                ctx = this.ctx;
                step = this.step;
                history = this.region.getTotalReport().history;

                const getValue = (value) => {
                    // for the graph we always use 100000, independent from the signaling system
                    let relativeValue = 100000 * value / this.region.getTotalPopulation();
                    return this.height - (relativeValue * this.zoom);
                };

                ctx.beginPath();
                ctx.lineWidth = 1;
                ctx.strokeStyle = 'black';
                // draw 1 point extra, this point is out of the graph on the leftside
                start = history.length - (2 * this.periodOfFocusLength) - this.offset;
                ctx.moveTo((-0.5 * step), getValue(history[start - 1]));
                for (let i = start, l = (history.length - this.offset); i < l; i++) {
                    let value, index;
                    value = getValue(history[i]);
                    index = i - start;
                    ctx.lineTo((step * (index + 0.5)), value);
                }
                ctx.stroke();
                ctx.closePath();
            },
            drawPeriodBorder() {
                let ctx, x1, x2;
                ctx = this.ctx;
                ctx.strokeStyle = 'rgba(255,255,255,0.3)';
                x1 = this.step * (this.periodOfFocusLength - 1);
                x2 = this.step * (2 * this.periodOfFocusLength - 1);
                ctx.beginPath();
                ctx.moveTo(x1, 0);
                ctx.lineTo(x1, this.height);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(x2, 0);
                ctx.lineTo(x2, this.height);
                ctx.stroke();
            }
        },
        mounted() {
            this.redraw();
        },
        watch: {
            region: function (newValue, oldValue) {
                if (this.region) {
                    setTimeout(() => {
                        this.redraw();
                    })
                }
            },
            offset: {
                handler: function(newValue) {
                    setTimeout(() => {
                        this.redraw();
                    })
                }
            },
            colorSet: {
                handler: function(newValue) {
                    setTimeout(() => {
                        this.redraw();
                    })
                }
            },
            signalingSystem: {
                handler: function() {
                    this.redraw();
                }
            }
        }
    }
</script>


<template>
    <div class="test-graph">
        <canvas
            :id="'test-graph-' + region.id"
            :width="width"
            :height="height"></canvas>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .test-graph {

        canvas {
            background: #eee;
        }
    }
</style>