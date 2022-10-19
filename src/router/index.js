import { createRouter, createWebHistory } from "vue-router";
import foundmusic from "@/pages/foundmusic";
import songlist from "@/pages/songlist";
import rank from "@/pages/rank";
import lyrics from "@/components/lyrics";
import foundlist from "@/pages/foundlist";

const router = createRouter({
  history: createWebHistory(), // HTML5 模式
  routes: [
    {
      path: "/find",
      component: foundmusic,
    },
    {
      path: "/list/:id",
      component: songlist,
    },
    {
      path: "/rank",
      component: rank,
    },
    {
      path: "/lyric/:id",
      component: lyrics,
    },
    {
      path: "/find/list",
      component: foundlist,
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: "/find",
    },
  ],
});

export default router;
