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
          <th>Actions</th>
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
          <td>
            <div class="action-buttons">
              <button 
                @click="editEmployee(employee)" 
                class="edit-btn"
              >
                Edit
              </button>
              <button 
                @click="deleteEmployee(employee.id)" 
                class="delete-btn"
              >
                Delete
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "EmployeeTable",
  setup() {
    const router = useRouter();
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

    const editEmployee = (employee) => {
      router.push({ 
        name: 'EditEmployee', 
        params: { id: employee.id } 
      });
    };

    const deleteEmployee = async (employeeId) => {
      if (!confirm('Are you sure you want to delete this employee?')) return;

      try {
        const response = await fetch(`http://localhost:8080/api/employees/${employeeId}`, {
          method: 'DELETE'
        });

        if (!response.ok) throw new Error(`Error ${response.status}`);

        fetchEmployees();
      } catch (err) {
        error.value = `Failed to delete employee: ${err.message}`;
      }
    };

    onMounted(fetchEmployees);

    return { 
      employees, 
      loading, 
      error, 
      editEmployee, 
      deleteEmployee 
    };
  },
};
</script>

