<script>
    import GGD from "@/classes/GGD";
    import * as d3 from "d3";
    import ageGroups from "./age-groups";


    export default {
        name: 'age-distribution-graph',
        components: {
            ageGroups
        },
        props: {
            ggd: {
                type: GGD,
                required: true
            }
        },
        data() {
            return {
                svg: null,
                lineContainer: null,
                width: 280,
                height: 250,
                step: 20,
            }
        },
        computed: {
            ageGroups() {
                return this.$store.state.ageGroups.all.filter(a => a.active);
            },
            currentDateOffset() {
                return this.$store.state.settings.currentDateOffset;
            },
            todayInMs() {
                return this.$store.state.ui.today.getTime() - (this.currentDateOffset * this.msPerDay);
            },
            msPerDay() {
                return 1000 * 3600 * 24;
            },
            report() {
                return this.ggd.report;
            },
            lines(){
                function getPercentageForAgeGroup(day, ageGroupTitle) {
                    let ageGroup = day.ageGroups.find(ageGroup => ageGroup.title === ageGroupTitle);
                    if (ageGroup) {
                        return ageGroup.percentage;
                    } else {
                        return 0;
                    }
                }

                return this.ageGroups.map(ageGroup => {
                    let cases = this.report.map(day => {
                        return {
                            date: day.date,
                            percentage: getPercentageForAgeGroup(day, ageGroup.title)
                        }
                    });
                    return {
                        title: ageGroup.title,
                        color: ageGroup.color,
                        cases
                    }
                })
            }
        },
        methods: {
            init(){
                this.svg = d3.select(this.$refs.container).select('svg');
                this.lineContainer = this.svg.append('g').attr('class', 'line-container');
                this.draw();
            },
            draw() {
                this.clear();
                this.drawGraph();
            },
            clear() {
                this.lineContainer.selectAll('*').remove();
            },
            drawGraph() {
                this.drawLines();
            },
            drawLines() {
                let lineFunction, getX, getY, scale;
                scale = this.scale;

                getX = (date) => {
                    let dateInMs, daysOffset;
                    dateInMs = new Date(date).getTime();
                    daysOffset = (this.todayInMs - dateInMs) / this.msPerDay;
                    return this.width - (daysOffset * this.step);
                };

                getY = (day) => {
                    return this.height - (this.height * day.percentage);
                };

                lineFunction = d3.line()
                    .x((day) => {
                        return getX(day.date);
                    })
                    .y((day) => {
                        return getY(day);
                    });

                this.lineContainer.selectAll('path')
                    .data(this.lines)
                    .enter()
                    .append('path')
                    .attr('d', (d) => {
                        return lineFunction(d.cases)
                    })
                    .attr('stroke-width', 1)
                    .attr('stroke', (d) => {
                        return d.color;
                    })
                    .on('mouseover', (d) => {
                        let ageGroup = this.$store.getters['ageGroups/getItemByProperty']('title', d.title);
                        this.$store.commit('ageGroups/setCurrent', ageGroup);
                    })
                    .on('mouseout', (d) => {
                        this.$store.commit('ageGroups/setCurrent', {key: 'currentAgeGroup', value: null});
                    })

            },
        },
        mounted() {
            this.init();
        },
        watch: {
            ggd: {
                handler: function() {
                    setTimeout(() => {
                        this.draw();
                    })
                }
            },
            currentDateOffset: {
                handler: function() {
                    setTimeout(() => {
                        this.draw();
                    })
                }
            },
            ageGroups: {
                handler: function() {
                    setTimeout(() => {
                        this.draw();
                    })
                },
                deep: true
            }
        }
    }
</script>


<template>
    <div
        ref="container"
        class="age-distribution-graph">
        <svg :style="{width: width + 'px', height: height + 'px'}"></svg>

        <age-groups/>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .age-distribution-graph {
            display: flex;

            svg {
                background: #eee;
                margin-right: 6px;

                path {
                    fill: transparent;
                }
            }

            .age-groups {

            }
    }
</style>