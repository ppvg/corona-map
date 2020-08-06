<script>
    import City from "@/classes/City";
    import thresholds from "@/data/thresholds";

    export default {
        name: 'trend-line',
        components: {},
        props: {
            city: {
                type: City,
                required: true
            }
        },
        computed: {
            canvas() {
                return document.getElementById('trend-line-' + this.city.id);
            },
            ctx() {
                return this.canvas.getContext('2d');
            },
            height() {
                return 150;
            },
            step() {
                return 10;
            },
            width() {
                return this.city.report.history.length * this.step;
            },
            min() {
                return Math.min( ...this.city.report.history );
            },
            max() {
                return Math.max( ...this.city.report.history );
            },
            difference() {
                return this.max - this.min;
            },
            zoom() {
                return 2;
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
                let ctx, step, history;
                ctx = this.ctx;
                step = this.step;
                history = this.city.report.history;

                const getValue = (value) => {
                    let relativeValue = 300000 * value / this.city.population;
                    return this.height - (relativeValue * this.zoom);
                };

                ctx.beginPath();
                ctx.lineWidth = 1;
                ctx.strokeStyle = 'black';
                ctx.moveTo(0, getValue(history[0]));
                for (let i = 1, l = history.length; i < l; i++) {
                    let value = getValue(history[i]);
                    ctx.lineTo((step * i), value);
                }
                ctx.stroke();
                ctx.closePath();
            },
            drawPeriodBorder() {
                let ctx, x1, x2;
                ctx = this.ctx;
                ctx.strokeStyle = 'rgba(255,255,255,0.3)';
                x1 = this.step * 6;
                x2 = this.step * 13;
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