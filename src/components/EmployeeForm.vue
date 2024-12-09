<template>
    <div>
    <h2>Employee Registration</h2>
    <h2 @click="$router.push('/employees')" class="active"> / Employees</h2>
    <form @submit.prevent="registerEmployee">
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
    <input type="text" v-model="formData.employeeId" placeholder="Employee ID" required />
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
    <br>
    <button type="submit">Register Employee</button>
    </form>
    </div>
    </template>
    <script>
    import { ref } from "vue";
    export default {
     name: "EmployeeForm",
     setup() {
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
       const registerEmployee = async () => {
         try {
           const response = await fetch("http://localhost:8080/api/employees", {
             method: "POST",
             headers: { "Content-Type": "application/json" },
             body: JSON.stringify(formData.value),
           });
           if (!response.ok) throw new Error("Failed to register employee.");
           alert("Employee registered successfully!");
           Object.keys(formData.value).forEach((key) => (formData.value[key] = ""));
         } catch (error) {
           alert(error.message);
         }
       };
       return { formData, registerEmployee };
     },
    };
    </script>