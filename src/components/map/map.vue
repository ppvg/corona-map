<script>
    import * as d3 from 'd3';
    import coordinatesTool from "@/tools/coordinates";

    export default {
        name: 'map-netherlands',
        components: {},
        props: {},
        data() {
            return {
                svg: null,
                citiesGroup: null,
                bubblesGroup: null,
                particlesGroup: null
            }
        },
        computed: {
            cities() {
                return this.$store.state.cities.all;
            },
            shiftX() {
                return this.$store.state.settings.shiftX;
            },
            shiftY() {
                return this.$store.state.settings.shiftY;
            },
            zoom() {
                return this.$store.state.settings.zoom;
            },
            canvasWidth() {
                return this.$store.state.settings.canvasWidth;
            },
            canvasHeight() {
                return this.$store.state.settings.canvasHeight;
            },
            mapRatio() {
                return this.$store.state.settings.mapRatio;
            },
            day() {
                return this.$store.state.settings.currentDateOffset;
            },
            currentTime() {
                let date = new Date(this.$store.state.settings.dateStart);
                date.setDate(date.getDate() + this.$store.state.settings.currentDateOffset);
                return date.getTime();
            },
            mode() {
                return this.$store.state.settings.mode;
            }
        },
        methods: {
            init() {
                this.svg = d3.select(this.$refs.map);

                this.createCities();
                this.createBubbles();
                this.createParticles();
                this.createPostcodes();
            },
            createCities() {
                this.citiesGroup = this.svg.selectAll('.city')
                    .data(this.cities)
                    .enter()
                    .append('g')
                    .attr('class', 'city')
                    .attr('data-city', (d) => d.title);
            },
            createBubbles() {
                this.bubblesGroup = this.citiesGroup.append('circle')
                    .attr('class', 'city-admissions-bubble')
                    .attr('transform', (d) => {
                        let postcode = d.postcodes[0];
                        return 'translate(' + this.getLeft(postcode.longitude) + ',' + this.getTop(postcode.latitude) + ')';
                    });
            },
            createParticles() {
                let self = this;

                this.particlesGroup = this.citiesGroup.each(function(city,i) {
                    d3.select(this).selectAll('.day')
                        .data(city.relativeAdmissions)
                        .enter()
                        .append('g')
                        .attr('class', 'day')
                        .attr('data-date', (d) => d.date)
                        .attr('data-n', (d) => d.n)
                        .each(function(d){
                            for (let i = 0; i < d.n; i++) {
                                d3.select(this)
                                    .append('g')
                                    .attr('transform', (d) => {
                                        return 'translate(' + self.getLeft(city.getRandomLong()) + ',' + self.getTop(city.getRandomLat()) + ')';
                                    })
                                    .append('circle')
                                    .attr('class', 'admission')
                                    .attr('r', 1);
                            }
                        })
                })
            },
            createPostcodes() {
                let self = this;

                this.citiesGroup.each(function(d,i) {
                    d3.select(this).selectAll('.postcode')
                        .data(d.postcodes)
                        .enter()
                        .append('g')
                        .attr('class', 'postcode')
                        .attr('data-postcode', (d) => d.postcode)
                        .attr('transform', (d) => {
                            return 'translate(' + self.getLeft(d.longitude) + ',' + self.getTop(d.latitude) + ')';
                        })
                        .append('circle')
                        .attr('class', 'postcode-dot')
                        .attr('r', 1);
                })
            },
            getTop(latitude) {
                return this.canvasHeight - coordinatesTool.getBottom(latitude, this.zoom, this.canvasHeight);
            },
            getLeft(longitude) {
                return coordinatesTool.getLeft(longitude, this.zoom, this.canvasWidth, this.mapRatio);
            },
            getSize(admissions) {
                return Math.sqrt(admissions) * 1;
            },
            setSizeBubbles() {
                this.bubblesGroup.attr('r', (city) => {
                    if (city.hospitalAdmissions[this.day]) {
                        return this.getSize(city.hospitalAdmissions[this.day].n);
                    } else {
                        return 0;
                    }
                })
            },
            showParticles() {
                let self = this;
                d3.selectAll('.day').each(function(d){
                    d3.select(this)
                        .attr('visibility', () => {
                            return d.original.getTime <= self.currentTime ? 'visible' : 'hidden';
                        })
                })
            },
            showMode() {
                // if (this.mode === 'bubbles') {
                //     console.log('bubbles');
                //     d3.selectAll('.city-admissions-bubble')
                //         .style('visibility', 'visible');
                //
                //     d3.selectAll('.admission')
                //         .style('visibility', 'hidden');
                // } else {
                //     console.log('particles');
                //     d3.selectAll('.city-admissions-bubble')
                //         .style('visibility', 'hidden');
                //
                //     d3.selectAll('.admission')
                //         .style('visibility', 'visible');
                // }
            }
        },
        mounted() {
            this.init();
            this.setSizeBubbles();
            this.showParticles();
            this.showMode();
        },
        watch: {
            day() {
                this.setSizeBubbles();
                this.showParticles()
            },
            mode() {
                this.showMode();
            }
        }
    }
</script>


<template>
    <svg
        :class="{'map--particles': mode === 'particles', 'map--bubbles': mode === 'bubbles'}"
        ref="map"
        :style="{width: canvasWidth + 'px', height: canvasHeight + 'px'}"
        class="map">

    </svg>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .map {
        position: relative;
        background: #ddd;

        .city {

            .day {

                .admission {
                    fill: rgba(255,0,0,0.3);
                    transition: all 0.2s ease;
                    opacity: 0;
                }
            }

            .city-admissions-bubble {
                fill: rgba(255,0,0,0.5);
                transition: all 0.5s ease;
                opacity: 0;
            }

            .postcode {

                .postcode-dot {
                    fill: rgba(0,0,0,0.2);
                }
            }
        }

        &.map--particles {

            .city {

                .day {

                    .admission {
                        opacity: 1;
                    }
                }
            }
        }

        &.map--bubbles {

            .city {


                .city-admissions-bubble {
                    opacity: 1;
                }
            }
        }
    }
</style>