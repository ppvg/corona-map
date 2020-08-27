<script>
    import GGD from "@/classes/GGD";
    import * as d3 from "d3";


    export default {
        name: 'case-characteristics-graph',
        components: {},
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
                scale: 6,
                ageGroup: '',
                ageGroups: [
                    {
                        title: '0-9',
                        color: '#008837'
                    }, {
                        title: '10-19',
                        color: '#00A0C6'
                    }, {
                        title: '20-29',
                        color: '#F0047F'
                    }, {
                        title: '30-39',
                        color: '#FD1A16'
                    }, {
                        title: '40-49',
                        color: '#FF8000'
                    }, {
                        title: '50-59',
                        color: '#AEBA17'
                    }, {
                        title: '60-69',
                        color: '#237D26'
                    }, {
                        title: '70-79',
                        color: '#4A007D'
                    }, {
                        title: '80-89',
                        color: '#916F5D'
                    }, {
                        title: '90+',
                        color: '#000'
                    }
                ]
            }
        },
        computed: {
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
                function getCasesForAgeGroup(day, ageGroupTitle) {
                    let ageGroup = day.ageGroups.find(ageGroup => ageGroup.title === ageGroupTitle);
                    if (ageGroup) {
                        return ageGroup.cases;
                    } else {
                        return 0;
                    }
                }

                return this.ageGroups.map(ageGroup => {
                    let cases = this.report.map(day => {
                        return {
                            date: day.date,
                            cases: getCasesForAgeGroup(day, ageGroup.title)
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
                let lineFunction, getX, scale;
                scale = this.scale;

                getX = (date) => {
                    let dateInMs, daysOffset;
                    dateInMs = new Date(date).getTime();
                    daysOffset = (this.todayInMs - dateInMs) / this.msPerDay;
                    return this.width - (daysOffset * this.step);
                };

                lineFunction = d3.line()
                    .x((d) => {
                        return getX(d.date);
                    })
                    .y((d) => {
                        return this.height - (scale * d.cases);
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
                        this.ageGroup = d;
                    })
                    .on('mouseout', (d) => {
                        this.ageGroup = null;
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
            }
        }
    }
</script>


<template>
    <div
        ref="container"
        class="case-characteristics-graph">
        <svg :style="{width: width + 'px', height: height + 'px'}"></svg>
        <div class="case-characteristics-graph__label">
            <div
                v-if="ageGroup"
                class="case-characteristics-graph__age-group">
                <div
                    :style="{'background': ageGroup.color}"
                    class="case-characteristics-graph__age-group-swatch">
                </div>
                <div class="case-characteristics-graph__age-group-title">
                    {{ageGroup.title}}
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .case-characteristics-graph {

            svg {
                background: #eee;

                path {
                    fill: transparent;
                }
            }

            .case-characteristics-graph__label {
                height: 32px;
                padding-top: 4px;

                .case-characteristics-graph__age-group {
                    display: flex;
                    align-items: center;

                    .case-characteristics-graph__age-group-swatch {
                        width: 12px;
                        height: 12px;
                        border-radius: 50%;
                        margin-right: 4px;
                    }
                }
            }
    }
</style>