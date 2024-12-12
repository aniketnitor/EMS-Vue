import { createRouter, createWebHistory } from "vue-router";
// import RegisterEmployee from "@/views/RegisterEmployee.vue";
import EmployeeList from "@/views/EmployeeList.vue";
import EmployeeForm from "./components/EmployeeForm.vue";
const routes = [
 { path: "/", component: EmployeeForm },
 { path: "/employees", name: "EmployeeList", component: EmployeeList },
 {
    path: '/employees/new',
    name: 'NewEmployee',
    component: EmployeeForm
  },
  {
    path: '/employees/edit/:id',
    name: 'EditEmployee',
    component: EmployeeForm
  }
];
const router = createRouter({
 history: createWebHistory(),
 routes,
});
export default router;