<script>
    import City from "@/classes/City";

    export default {
        name: 'city',
        components: {},
        props: {
            city: {
                type: City,
                required: true
            }
        },
        computed: {},
        methods: {
            selectCity() {
                this.$store.commit('ui/updateProperty', {key: 'currentCity', value: this.city});
                this.$store.commit('ui/updateProperty', {key: 'searchValue', value: ''});
            }
        }
    }
</script>


<template>
    <div
        @click="selectCity()"
        class="city">
        <div
            :style="{'background-color': city.getThreshold().color}"
            class="city__swatch"></div>
        <div class="city__title">
            {{city.title}}
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .cities__list {
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 20px;

        &:last-child {
        margin-bottom: 0;
        }

        .city__container {
            display: flex;
            align-items: center;
            margin-right: 4px;

            &:last-child {
                margin-right: 0;
            }
        }
    }

    .city {
        display: flex;
        align-items: center;
        margin-right: 4px;
        cursor: pointer;


        .city__swatch {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            margin-right: 2px;
        }

        &:last-child {
            margin-right: 0;
        }
    }
</style>