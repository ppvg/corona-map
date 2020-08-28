<script>
    export default {
        name: 'age-group',
        components: {},
        props: {
            ageGroup: {
                type: Object,
                required: true
            }
        },
        computed: {
            currentAgeGroup() {
                return this.$store.state.ageGroups.current;
            },
            isCurrent() {
                return this.currentAgeGroup && this.currentAgeGroup.title === this.ageGroup.title;
            }
        },
        methods: {
            toggle() {
                this.$store.commit('ageGroups/updatePropertyOfItem', {item: this.ageGroup, property: 'active', value: !this.ageGroup.active});
            }
        }
    }
</script>


<template>
    <div
        @click="toggle()"
        :class="{
            'age-group--current': isCurrent,
            'age-group--inactive': !ageGroup.active
        }"
        class="age-group">
        <div
            :style="{'background': ageGroup.color}"
            class="age-group__swatch"></div>
        <div class="age-group__title">
            {{ageGroup.title}}
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .age-group {
        display: flex;
        align-items: center;
        font-size: 10px;
        padding: 1px 0;
        cursor: pointer;

        .age-group__swatch {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            margin-right: 4px;
        }

        .age-group__title {
            margin-bottom: -2px;
            border-bottom: 1px solid transparent;
        }

        &.age-group--current {

            .age-group__title {
                border-bottom: 1px solid #000;
            }
        }

        &.age-group--inactive {
            opacity: 0.2;
        }
    }
</style>