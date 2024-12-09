<template>
  <div>
    <h2 @click="$router.push('/')" class="active">Employee Registration</h2>
    <h2> / Employee List</h2>
    <div v-if="loading">Loading employees...</div>
    <div v-if="error" class="error">{{ error }}</div>
    <table class="sc-responsive-table" v-if="employees.length">
      <thead>
        <tr>
          <th>Name</th>
          <th>Employee ID</th>
          <th>Aadhar Number</th>
          <th>Gender</th>
          <th>Age</th>
          <th>Designation</th>
          <th>Department</th>
          <th>Salary</th>
          <th>Joining Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="employee in employees" :key="employee.employeeId">
          <td>{{ employee.name }}</td>
          <td>{{ employee.employeeId }}</td>
          <td>{{ employee.aadharNumber }}</td>
          <td>{{ employee.gender }}</td>
          <td>{{ employee.age }}</td>
          <td>{{ employee.designation }}</td>
          <td>{{ employee.department }}</td>
          <td>{{ employee.salary.toLocaleString("en-IN", { style: "currency", currency: "INR" }) }}</td>
          <td>{{ employee.joiningDate }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import { ref, onMounted } from "vue";
export default {
  name: "EmployeeTable",
  setup() {
    const employees = ref([]);
    const loading = ref(true);
    const error = ref(null);
    const fetchEmployees = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/employees");
        if (!response.ok) throw new Error(`Error ${response.status}`);
        employees.value = await response.json();
      } catch (err) {
        error.value = err.message;
      } finally {
        loading.value = false;
      }
    };
    onMounted(fetchEmployees);
    return { employees, loading, error };
  },
};
</script>