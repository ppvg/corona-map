<script>
    import City from "@/classes/City";
    import SewerageArea from "@/classes/SewerageArea";
    import thresholds from "@/data/thresholds";

    export default {
        name: 'trend-line',
        components: {},
        props: {
            city: {
                type: City | SewerageArea,
                required: true
            }
        },
        computed: {
            report() {
                return this.city.getReport();
            },
            canvas() {
                return document.getElementById('trend-line-' + this.city.id);
            },
            ctx() {
                return this.canvas.getContext('2d');
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
            min() {
                return Math.min( ...this.report.history );
            },
            max() {
                return Math.max( ...this.report.history );
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
            }
        },
        methods: {
            redraw() {
                this.clear();
                this.drawThresholds();
                this.drawTrendLine();
                this.drawPeriodBorder();
            },
            clear() {
                this.ctx.clearRect(0, 0, this.width, this.height);
            },
            drawThresholds() {
                let base, ctx;
                base = 0;
                ctx = this.ctx;
                ctx.globalAlpha = 0.5;
                for (let threshold of thresholds.thresholds) {
                    if (threshold.n > 0) {
                        let height = this.zoom * threshold.n / 7;
                        ctx.beginPath();
                        if (threshold.n !== Infinity) {
                            ctx.rect(0, (this.height - base - height), this.width, height);
                        } else {
                            ctx.rect(0, 0, this.width, (this.height - base));
                        }
                        ctx.fillStyle = threshold.color;
                        ctx.closePath();
                        ctx.fill();
                        base += height;
                    }
                }
                ctx.globalAlpha = 1;
            },
            drawTrendLine() {
                let ctx, step, history, start;
                ctx = this.ctx;
                step = this.step;
                history = this.report.history;

                const getValue = (value) => {
                    let relativeValue = thresholds.perPopulation * value / this.city.getPopulation();
                    return this.height - (relativeValue * this.zoom);
                };

                ctx.beginPath();
                ctx.lineWidth = 1;
                ctx.strokeStyle = 'black';
                start = history.length - (2 * this.periodOfFocusLength) - this.offset;
                ctx.moveTo(0, getValue(history[start]));
                for (let i = (start + 1), l = (history.length - this.offset); i < l; i++) {
                    let value = getValue(history[i]);
                    ctx.lineTo((step * (i - start)), value);
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
            city: function (newValue, oldValue) {
                if (this.city) {
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
            }
        }
    }
</script>


<template>
    <div class="trend-line">
        <canvas
            :id="'trend-line-' + city.id"
            :width="width"
            :height="height"></canvas>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .trend-line {

        canvas {
            background: #eee;
        }
    }
</style>