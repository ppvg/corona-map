import Vue from "vue";
import Router from "vue-router";

import main from '@/components/main/main-view'
import sewageTools from '@/components/sewage/sewage-tools'

Vue.use(Router);

const routes = [
    {
        path: "/",
        name: "main",
        component: main
    }, {
        path: "/riool",
        name: "riool",
        component: sewageTools,
    }
];

const router = new Router({routes});


export default router;
