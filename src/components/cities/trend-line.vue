<script>
    import City from "@/classes/City";

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
            }
        },
        methods: {
            redraw() {
                let ctx, step, history;
                ctx = this.ctx;
                ctx.clearRect(0, 0, this.width, this.height);
                step = this.step;
                history = this.city.report.history;

                const getValue = (value) => {
                    let relativeValue = 300000 * value / this.city.population;
                    return this.height - (relativeValue);
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