import {createRouter, createWebHashHistory} from "vue-router";
import Home from "@/pages/Home";

export default createRouter({
    //hash모드, 특정페이지에서 새로고침했을때 페이지를찾을수없음 방지
    history: createWebHashHistory(),

    //pages : page를 구분해주는 개념
    routes: [
        {
            //페이지경로
            path: "/",
            name: Home,
            component: Home,
        },
    ]
})