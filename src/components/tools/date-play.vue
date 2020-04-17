<script>
    export default {
        name: 'date-play',
        components: {},
        props: {},
        data() {
            return {
                interval: null
            }
        },
        computed: {
            isPlaying() {
                return this.$store.state.settings.playing;
            }
        },
        methods: {
            play() {
                if (this.$store.state.settings.currentDateOffset >= this.$store.getters['settings/getMax']) {
                    this.$store.commit('settings/updateProperty', {key: 'currentDateOffset', value: 0});
                    setTimeout(() =>{
                        this.$store.commit('settings/updateProperty', {key: 'playing', value: true});
                        this.start();
                    }, 1000)
                } else {
                    this.$store.commit('settings/updateProperty', {key: 'playing', value: true});
                    this.start();
                }
            },
            pause() {
                this.$store.commit('settings/updateProperty', {key: 'playing', value: false});
                this.stop();
            },
            start() {
                this.interval = setInterval(() => {
                    this.tick();
                }, 400)
            },
            stop() {
                clearInterval(this.interval);
            },
            tick() {
                if (this.$store.state.settings.currentDateOffset >= this.$store.getters['settings/getMax']) {
                    this.pause();
                } else {
                    this.$store.commit('settings/next');
                }
            }
        }
    }
</script>


<template>
    <div class="date-play">
        <div
            v-if="!isPlaying"
            @click="play()"
            class="date-play__button date-play__button--play">►</div>
        <div
            v-if="isPlaying"
            @click="pause()"
            class="date-play__button date-play__button--pause">&#9616;&#9616;</div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .date-play {
        margin-top: 20px;

        .date-play__button {
            width: 40px;
            height: 40px;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            border: 1px solid #ddd;
            cursor: pointer;
            background: #fff;
            box-shadow: 1px 1px 2px rgba(0,0,0,0.2);
            text-align: center;
            padding: 8px;

            &:hover {
                background: #ddd;
            }

            &.date-play__button--play {
                padding-left: 12px;
            }

            &.date-play__button--pause {
                padding-right: 12px;
            }
        }
    }
</style>