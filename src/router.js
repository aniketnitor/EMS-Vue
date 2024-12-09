import { createRouter, createWebHistory } from "vue-router";
import RegisterEmployee from "@/views/RegisterEmployee.vue";
import EmployeeList from "@/views/EmployeeList.vue";
const routes = [
 { path: "/", name: "RegisterEmployee", component: RegisterEmployee },
 { path: "/employees", name: "EmployeeList", component: EmployeeList },
];
const router = createRouter({
 history: createWebHistory(),
 routes,
});
export default router;