<script>
    import SewageTreatmentPlant from '@/classes/SewageTreatmentPlant';
    import * as d3 from 'd3';
    import {format, sub} from 'date-fns'
    import {nl} from "date-fns/locale";

    export default {
        name: 'rna-levels-graph',
        components: {},
        props: {
            sewageTreatmentPlant: {
                type: SewageTreatmentPlant,
                required: true
            }
        },
        data() {
            return {
                svg: null,
                lineContainer: null,
                textContainer: null,
                height: 150,
                step: 20,
                max: 10000
            }
        },
        computed: {
            // settings
            periodOfFocusLength() {
                return this.$store.state.settings.periodOfFocusLength;
            },
            currentDateOffset() {
                return this.$store.state.settings.currentDateOffset;
            },
            width() {
                return (this.periodOfFocusLength * 2 - 1) * this.step;
            },
            //
            measurementsInRange() {
                let startIndex, endIndex, index;
                startIndex = null;
                endIndex = null;
                index = 0;
                for (let measurement of this.sewageTreatmentPlant.measurements) {
                    if (!startIndex && measurement.dateInMs >= this.startDateInMs) {
                        startIndex = index;
                    }
                    if (!endIndex && measurement.dateInMs > this.endDateInMs) {
                        endIndex = index;
                    }
                    index++;
                }
                // we want the starting index 1 point out of the range
                if (startIndex > 0) {
                    startIndex--;
                }
                // end falls in between range
                if (endIndex === null) {
                    endIndex = index;
                }
                return this.sewageTreatmentPlant.measurements.slice(startIndex, (endIndex + 1));
            },
            points() {
                return this.measurementsInRange.map(measurement => {
                    return {
                        x: this.getX(measurement.dateInMs),
                        y: this.getY(measurement),
                        measurement: measurement
                    }
                })
            },

            msPerDay() {
                return 1000 * 3600 * 24;
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
            startDate() {
                return format(new Date(this.startDateInMs), 'EEEE d MMMM' );
            },
            endDate() {
                return format(new Date(this.endDateInMs), 'EEEE d MMMM' );
            }
        },
        methods: {
            init(){
                this.svg = d3.select(this.$refs.container).select('svg');
                this.lineContainer = this.svg.append('g').attr('class', 'line-container');
                this.textContainer = this.svg.append('g').attr('class', 'text-container');
                this.draw();
            },
            draw() {
                this.clear();
                this.drawGraph();
            },
            clear() {
                this.lineContainer.selectAll('*').remove();
                this.textContainer.selectAll('*').remove();
            },
            getX(dateInMs) {
                return this.width * (dateInMs - this.startDateInMs) / (this.endDateInMs - this.startDateInMs)
            },
            getY(measurement) {
                return this.height - (measurement.RNA_per_ml / this.max * this.height);
            },
            drawGraph() {
                this.drawLine();
                this.drawPoints();
            },
            drawLine() {
                let lineFunction;

                lineFunction = d3.line()
                    .x(function(d) { return d.x; })
                    .y(function(d) { return d.y; });

                this.lineContainer.append('path')
                    .attr('d', lineFunction(this.points))
                    .attr('stroke', 'black')
                    .attr('stroke-width', 1)
                    .attr('fill', 'none');
            },
            drawPoints() {
                let lineContainer, buffer;
                lineContainer = this.lineContainer;
                buffer = this.width - 70;

                function getX(x) {
                    if (x < 10) {
                        return 10;
                    } else if (x < buffer) {
                        return x
                    } else {
                        return buffer;
                    }
                }

                function handleMouseOver(d, i) {
                    d3.select(this)
                        //.attr('fill', '#039dfc')
                        .attr('r', 5);

                    lineContainer.append('text')
                        .attr('id', 'label-date')
                        .attr('class', 'label')
                        .attr('x', function() { return getX(d.x); })
                        .attr('y', function() { return d.y - 30; })
                        .text(function() {
                            return format(new Date(d.measurement.date), 'd MMMM', {locale: nl} );
                        });
                    lineContainer.append('text')
                        .attr('id', 'label-rna')
                        .attr('class', 'label')
                        .attr('x', function() { return getX(d.x); })
                        .attr('y', function() { return d.y - 15; })
                        .text(function() {
                            return d.measurement.RNA_per_ml + ' RNA/ml';
                        });
                }

                function handleMouseOut(d, i) {
                    d3.select(this)
                        .attr('fill', '##000')
                        .attr('r', 2);
                    d3.select('#label-date').remove();
                    d3.select('#label-rna').remove();
                }

                this.lineContainer.selectAll('circle')
                    .data(this.points)
                    .enter()
                    .append('circle')
                    .attr('cx', function(d) {
                        return d.x;
                    })
                    .attr('cy', function(d) {
                        return d.y;
                    })
                    .attr('r', 2);
                    // .on('mouseover', handleMouseOver)
                    // .on('mouseout', handleMouseOut);

                this.textContainer.selectAll('text')
                    .data(this.points.filter(point => point.x > 0 && point.x < this.width))
                    .enter()
                    .append('text')
                    .attr('x', function(d) {
                        return getX(d.x);
                    })
                    .attr('y', function(d) {
                        return d.y - 15;
                    })
                    .text(function(d) {
                        return d.measurement.RNA_per_ml + ' RNA/ml';
                    });
            }
        },
        mounted() {
            this.init();
        },
        watch: {
            sewageTreatmentPlant: function (newValue, oldValue) {
                if (this.sewageTreatmentPlant) {
                    setTimeout(() => {
                        this.draw();
                    })
                }
            },
            currentDateOffset: {
                handler: function(newValue) {
                    setTimeout(() => {
                        this.draw();
                    })
                }
            }
        }
    }
</script>


<template>
    <div
        ref="container"
        class="rna-levels-graph">
        <svg :style="{width: width + 'px', height: height + 'px'}"></svg>
    </div>
</template>


<style lang='scss'>
    @import '@/styles/variables.scss';

    .rna-levels-graph {

        svg {
            background: #ddd;

            .line-container {

                line {

                }

                circle {

                }
            }

            .text-container {

                text {
                    font-size: 10px;
                    fill: #555
                }
            }
        }
    }
</style>