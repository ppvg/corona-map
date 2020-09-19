<script>
    export default {
        name: 'time-tools',
        components: {},
        props: {},
        data() {
            return {
                timer: null
            }
        },
        computed: {
            historyLength() {
                return this.$store.state.settings.historyLength;
            },
            isAtEnd() {
                return this.$store.state.settings.currentDateOffset === 0;
            },
            isAtStart() {
                return this.$store.state.settings.currentDateOffset === this.historyLength;
            },
            isPlaying() {
                return this.$store.state.ui.isPlaying;
            }
        },
        methods: {
            rewind() {
                this.$store.commit('settings/updateProperty', {key: 'currentDateOffset', value: this.historyLength});
            },
            play() {
                this.$store.commit('ui/updateProperty', {key: 'isPlaying', value: true});
                this.timer = setInterval(() => {
                    if (this.$store.state.settings.currentDateOffset > 0) {
                        this.$store.commit('settings/updateProperty', {key: 'currentDateOffset', value: (this.$store.state.settings.currentDateOffset -1)});
                    } else {
                        this.stop();
                    }
                }, 200)
            },
            move(value) {
                this.$store.commit('settings/updateProperty', {key: 'currentDateOffset', value: (this.$store.state.settings.currentDateOffset - value)});
            },
            stop() {
                this.$store.commit('ui/updateProperty', {key: 'isPlaying', value: false});
                clearInterval(this.timer);
            }
        }
    }
</script>


<template>
    <div class="time-tools">
        <div
                v-if="isAtEnd"
                @click="rewind()"
                class="icon-button">
            <img src="assets/img/tools/redo.svg">
        </div>

        <div
                v-if="!isPlaying && !isAtEnd"
                @click="play()"
                class="icon-button">
            <img src="assets/img/tools/play.svg">
        </div>

        <div
                v-if="isPlaying"
                @click="stop()"
                class="icon-button">
            <img src="assets/img/tools/stop.svg">
        </div>

        <div
                v-if="!isPlaying && !isAtStart"
                @click="move(-1)"
                class="icon-button">
            <img src="assets/img/tools/back.svg">
        </div>
        <div
                v-if="!isPlaying && !isAtEnd"
                @click="move(1)"
                class="icon-button">
            <img src="assets/img/tools/forward.svg">
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .time-tools {
        display: flex;
        align-items: center;

        .icon-button {
            pointer-events: all;
            margin-right: 8px;
        }
    }
</style>