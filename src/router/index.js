import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "dashboard",
    component: () =>import("../views/Home.vue"),
    meta: {
      menuId: 0
    }
  },
  {
    path: "/validators",
    name: "validators",
    component: () =>import("../views/validators.vue"),
    meta: {
      menuId: 1
    }
  },
  {
    path: "/groupDetail/:id",
    name: "groupDetail",
    component: () =>import("../views/validatorsDetail/groupDetail.vue"),
  },
  {
    path: "/sitedetail/:id",
    name: "sitedetail",
    component: () =>import("../views/addressDetail/siteDetail.vue")
  },
  {
    path: "/exchange",
    name: "exchange",
    component: () =>import(/* webpackChunkName: "about" */ "../views/Exchange.vue"),
    meta: {
      menuId: 2
    }
  },
  {
    path: "/tokens",
    name: "tokens",
    component: () =>import("../views/Tokens.vue"),
    meta: {
      menuId: 3
    }
  },
  {
    path: "/richlist",
    name: "richlist",
    component: () =>import("../views/RichList.vue"),
    meta: {
      menuId: 4
    }
  },
  {
    path: "/acountdetail/:id",
    name: "acountdetail",
    component: () =>import("../views/addressDetail/siteDetail.vue"),
  },
  {
    path: "/attestations",
    name: "attestations",
    component: () =>import("../views/Attestations.vue"),
    meta: {
      menuId: 5
    }
  },
  {
    path: "/governance",
    name: "governance",
    component: () =>import("../views/Governance.vue"),
    meta: {
      menuId: 6
    }
  },
  {
    path: "/apis",
    name: "apis",
    component: () =>import("../views/APIs.vue"),
    meta: {
      menuId: 7
    }
  },
  {
    path: "/parameters",
    name: "parameters",
    component: () =>import("../views/more/parameters.vue"),
    meta: {
      menuId: 8
    }
  },
  {
    path: "/celotokenreleaseschedule",
    name: "celotokenreleaseschedule",
    component: () =>import("../views/more/CeloSchedule.vue"),
    meta: {
      menuId: 9
    }
  },
  {
    path: "/validatorrewardscalculator",
    name: "validatorrewardscalculator",
    component: () =>import("../views/more/validator.vue"),
    meta: {
      menuId: 10
    }
  }
];

const router = new VueRouter({
  mode: "history",
  // base: process.env.BASE_URL,
  routes,
});

export default router;
