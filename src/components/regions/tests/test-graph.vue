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
            // settings
            offset() {
                return this.$store.state.settings.currentDateOffset;
            },
            weeks() {
                return this.$store.state.settings.weeks;
            },
            paddingBottom() {
                return 20;
            },
            colorSet() {
                return this.$store.state.ui.color;
            },
            signalingSystem() {
                return this.$store.state.signalingSystems.current;
            },
            currentMap() {
                return this.$store.state.maps.current;
            },
            // dimensions
            height() {
                return 200;
            },
            step() {
                return this.$store.state.settings.step;
            },
            width() {
                return this.length * this.step;
            },
            length() {
                return this.weeks * 7;
            },
            min() {
                return this.offset + (this.length / this.currentMap.settings.testDataInterval);
            },
            max() {
                return this.offset;
            },
            days() {
                return this.region.report.history.filter(day => {
                    return day.offset <= this.min && day.offset >= this.max;
                })
            },
            zoom() {
                return 3;
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
                this.drawTrendLine();
                this.drawDates();
            },
            clear() {
                let ctx = this.ctx;
                ctx.clearRect(0, 0, this.width, this.height);
                ctx.rect(0, 0, this.width, this.height);
                ctx.fillStyle = '#fff';
                ctx.fill();
            },
            drawDates() {
                let ctx, weeks, index;
                index = 0;
                ctx = this.ctx;
                weeks = Array.from(Array(this.weeks + 1).keys());
                ctx.font = '12px Arial';

                ctx.fillStyle = '#000';
                for (let week of weeks) {
                    let dateString, x, y, offset;
                    offset = (this.offset * this.currentMap.settings.testDataInterval) + ((this.weeks - week) * 7);
                    dateString = this.$store.getters['ui/getDateByOffset'](offset, 'd/M');
                    x = this.step * week * 7;
                    y = this.height - 4;
                    if (index === 0) {
                        ctx.textAlign = 'left';
                    } else if (index === weeks.length - 1) {
                        ctx.textAlign = 'right';
                    } else {
                        ctx.textAlign = 'center';
                    }
                    ctx.fillText(dateString, x, y);
                    index++;
                }
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
            drawGrid() {
                let ctx, set;
                ctx = this.ctx;
                set = Array.from(Array(7 * this.weeks).keys());
                for (let i of set) {
                    let x = i * this.step;
                    ctx.beginPath();
                    ctx.lineWidth = 1;
                    ctx.strokeStyle = (i % 7 === 0) ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.1)';
                    ctx.moveTo(x, 0);
                    ctx.lineTo(x, (this.height - this.paddingBottom));
                    ctx.stroke();
                    ctx.closePath();
                }
            },
            drawTrendLine() {
                let ctx, step, history, start;
                ctx = this.ctx;
                step = this.step;
                history = this.region.getTotalReport().history;

                const getY = (day) => {
                    // for the graph we always use 100000, independent from the signaling system
                    let relativeValue = 100000 * (day.value / this.currentMap.settings.testDataInterval) / this.region.getTotalPopulation();
                    return (this.height - this.paddingBottom) - (relativeValue * this.zoom);
                };

                const getX = (day) => {
                    let offset = day.offset - this.offset;
                    return this.width - (this.step * this.currentMap.settings.testDataInterval * offset);
                };
                ctx.beginPath();
                ctx.lineWidth = 1;
                ctx.strokeStyle = 'black';
                // draw 1 point extra, this point is out of the graph on the leftside
                start = 1;
                ctx.moveTo(getX(history[0]), getY(history[0]));
                for (let day of this.days) {
                    ctx.lineTo(getX(day), getY(day));
                }
                ctx.stroke();
                ctx.closePath();
            },
            drawPeriodBorder() {
                let ctx, x1, x2;
                ctx = this.ctx;
                ctx.strokeStyle = 'rgba(255,255,255,0.3)';
                x1 = this.step * 6;
                x2 = this.step * (7 * this.weeks - 1);
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