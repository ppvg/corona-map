<script>
    export default {
        name: 'embed-popup',
        components: {},
        props: {},
        computed: {},
        methods: {}
    }
</script>


<template>
    <div class="embed-popup">
        <div class="embed__article">
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse pulvinar tincidunt eros non eleifend. Ut tempus urna vitae nunc pulvinar, quis euismod justo elementum. Nulla a tristique nisi. Praesent quis ipsum at turpis tincidunt luctus et in arcu. Nam eleifend mi at placerat interdum. Cras lacinia sapien id leo finibus, vitae luctus tellus feugiat. Morbi ac quam dictum libero varius auctor accumsan consequat sem. Cras dictum vestibulum sodales. Sed vehicula ex ut ex lobortis luctus.
            </p>
            <div class="embed__size">
                <iframe src="http://localhost:8080/#/?city=Amsterdam"></iframe>
            </div>
            <p>
                Aenean volutpat erat at justo sodales accumsan. Etiam ultricies metus vel maximus molestie. Fusce tortor quam, tempus aliquet urna et, luctus tempus odio. Aliquam erat volutpat. Vestibulum feugiat lacinia laoreet. Etiam bibendum urna nec sodales accumsan. Suspendisse id lacus ac odio consequat egestas. Vestibulum hendrerit vitae libero congue imperdiet. Pellentesque porttitor sed massa congue auctor. Quisque mattis nisl quis semper sagittis. In dui dui, euismod ac feugiat ac, imperdiet vel metus.
            </p>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .embed-popup {
        position: fixed;
        left: 20px;
        top: 20px;
        width: calc(100% - 40px);
        height: calc(100% - 40px);
        background: #ddd;
        z-index: 10;
        font-size: 16px;
        box-shadow: 2px 2px 12px rgba(0,0,0,0.2);
        padding: 20px;

        .embed__article {
            width: 600px;
            max-width: 100%;
            background: #fff;
            box-shadow: 2px 2px 12px rgba(0,0,0,0.2);
            padding: 20px;
            height: 100%;
            overflow: hidden;
            font-size: 12px;

            p {
                width: 400px;
                max-width: 100%;
            }

            .embed__size {
                width: 500px;
                height: 300px;

                iframe {
                    width: 100%;
                    height: 100%;
                    border: 0;
                }
            }

        }

    }
</style>