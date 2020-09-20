<script>
    import _Region from "@/classes/_Region";
    import testGraphMixin from './test-graph-mixin';

    export default {
        name: 'administered-tests',
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
                return document.getElementById('administered-tests-' + this.region.id);
            }
        },
        methods: {
            redraw() {
                this.clear();
                this.drawBackground();
                this.drawGrid();
                this.drawMaxLine();
                if (this.days.length > 0) {
                    this.drawLine();
                }
                this.drawDates();
            },
            drawBackground() {
                let ctx = this.ctx;
                ctx.beginPath();
                ctx.rect(0, 0, this.width, (this.height - this.paddingBottom));
                ctx.fillStyle = '#ddd';
                ctx.fill();
            },
            drawLine() {
                let ctx, step, history, start, days;
                ctx = this.ctx;
                step = this.step;
                history = this.region.getTotalReport().history;

                const getY = (day) => {
                    let percentage = 100 * day.positiveTests / day.administeredTests;
                    return this.getY(percentage);
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
            },
            getY(percentage) {
                let maxPercentage, value, height;
                maxPercentage = 50;
                value = percentage / maxPercentage;
                height = this.height - this.paddingBottom;
                return (this.height - this.paddingBottom) - (value * height);
            },
            drawMaxLine() {
                let ctx, y;
                ctx = this.ctx;
                ctx.lineWidth = 1;
                ctx.strokeStyle = 'red';
                y = this.getY(5);
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(this.width, y);
                ctx.stroke();
                ctx.closePath();
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
    <div class="administered-tests">
        <div class="administered-tests__title">
            Percentage positieve tests
        </div>
        <canvas
                :id="'administered-tests-' + region.id"
                :width="width"
                :height="height"></canvas>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .administered-tests {

        .administered-tests__title {
            margin-bottom: 4px;
        }

        canvas {
            background: #eee;
        }
    }
</style>