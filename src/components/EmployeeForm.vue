<template>
  <div>
    <h2>{{ isEditing ? 'Edit Employee' : 'Employee Registration' }}</h2>
    <h2 @click="$router.push('/employees')" class="active"> / Employees</h2>
    <form @submit.prevent="submitEmployee">
      <input type="text" v-model="formData.name" placeholder="Name" required />
      <input type="text" v-model="formData.aadharNumber" placeholder="Aadhar Number" required />
      <select v-model="formData.gender" required>
        <option value="">Select Gender</option>
        <option value="MALE">Male</option>
        <option value="FEMALE">Female</option>
        <option value="OTHER">Other</option>
      </select>
      <input type="number" v-model="formData.age" placeholder="Age" required />
      <input type="number" v-model="formData.salary" placeholder="Salary" step="0.01" required />
      <input 
        type="text" 
        v-model="formData.employeeId" 
        placeholder="Employee ID" 
        required 
        :disabled="isEditing"
      />
      <select v-model="formData.designation" required>
        <option value="">Select Designation</option>
        <option value="JUNIOR_DEVELOPER">Junior Developer</option>
        <option value="ANALYST">Analyst</option>
        <option value="PROJECT_MANAGER">Project Manager</option>
        <option value="HR_MANAGER">HR Manager</option>
        <option value="SENIOR_DEVELOPER">Senior Developer</option>
        <option value="TEAM_LEAD">Team Lead</option>
      </select>
      <input type="text" v-model="formData.department" placeholder="Department" required />
      <input type="date" v-model="formData.joiningDate" required />
      <button class="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none" type="submit">{{ isEditing ? 'Update Employee' : 'Register Employee' }}</button>
    </form>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

export default {
  name: "EmployeeForm",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const isEditing = ref(false);

    const formData = ref({
      name: "",
      aadharNumber: "",
      gender: "",
      age: null,
      salary: null,
      employeeId: "",
      designation: "",
      department: "",
      joiningDate: "",
    });

    const fetchEmployeeDetails = async (employeeId) => {
      try {
        const response = await fetch(`http://localhost:8080/api/employees/${employeeId}`);
        if (!response.ok) throw new Error("Failed to fetch employee details.");
        
        const employeeData = await response.json();
        Object.keys(formData.value).forEach(key => {
          formData.value[key] = employeeData[key];
        });
      } catch (error) {
        alert(error.message);
        router.push('/employees');
      }
    };

    const submitEmployee = async () => {
      try {
        const employeeId = route.params.id;
        const url = isEditing.value 
          ? `http://localhost:8080/api/employees/${employeeId}` 
          : "http://localhost:8080/api/employees";
        
        const method = isEditing.value ? "PUT" : "POST";

        const response = await fetch(url, {
          method: method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData.value),
        });

        if (!response.ok) throw new Error(`Failed to ${isEditing.value ? 'update' : 'register'} employee.`);
        
        alert(`Employee ${isEditing.value ? 'updated' : 'registered'} successfully!`);
        router.push('/employees');
      } catch (error) {
        alert(error.message);
      }
    };

    onMounted(() => {
      const employeeId = route.params.id;
      if (employeeId) {
        isEditing.value = true;
        fetchEmployeeDetails(employeeId);
      }
    });

    return { 
      formData, 
      submitEmployee, 
      isEditing 
    };
  },
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  max-width: 500px;
  margin: 0 auto;
  gap: 0.5rem;
}

input, select {
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

button {
  padding: 0.75rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
  width: 51%;
  margin-left: 25%;  
  height: 35px;
  margin-bottom: 10px;
  padding: 5px;
}

input {
    height: 25px;
    margin-bottom: 10px;
    padding: 5px;
}

select {
    height: 35px;
    margin-bottom: 10px;
    padding: 5px;
}

button:hover {
  background-color: #45a049;
}
</style>