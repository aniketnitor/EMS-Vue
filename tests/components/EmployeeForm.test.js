import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import EmployeeForm from '../../src/components/EmployeeForm.vue';


describe('EmployeeForm.vue', () => {
    it('renders all input fields correctly', async () => {
        const wrapper = mount(EmployeeForm);

        const nameInput = wrapper.find('input[placeholder="Name"]');
        expect(nameInput.exists()).toBe(true);
        expect(nameInput.attributes('type')).toBe('text');

        const aadharInput = wrapper.find('input[placeholder="Aadhar Number"]');
        expect(aadharInput.exists()).toBe(true);
        expect(aadharInput.attributes('type')).toBe('text');

        const employeeIdInput = wrapper.find('input[placeholder="Employee ID"]');
        expect(employeeIdInput.exists()).toBe(true);
        expect(employeeIdInput.attributes('type')).toBe('text');

        const departmentInput = wrapper.find('input[placeholder="Department"]');
        expect(departmentInput.exists()).toBe(true);
        expect(departmentInput.attributes('type')).toBe('text');

        const ageInput = wrapper.find('input[placeholder="Age"]');
        expect(ageInput.exists()).toBe(true);
        expect(ageInput.attributes('type')).toBe('number');

        const salaryInput = wrapper.find('input[placeholder="Salary"]');
        expect(salaryInput.exists()).toBe(true);
        expect(salaryInput.attributes('type')).toBe('number');

        const genderSelect = wrapper.find('select');
        expect(genderSelect.exists()).toBe(true);
        
        const genderOptions = genderSelect.findAll('option');
        expect(genderOptions.length).toBeGreaterThan(1);
        
        const expectedGenderValues = ['', 'MALE', 'FEMALE', 'OTHER'];
        const actualGenderValues = genderOptions.map(option => option.element.value);
        expect(actualGenderValues).toEqual(expectedGenderValues);

        const designationSelect = wrapper.findAll('select')[1];
        expect(designationSelect.exists()).toBe(true);
        
        const designationOptions = designationSelect.findAll('option');
        expect(designationOptions.length).toBeGreaterThan(1);
        
        const expectedDesignationValues = [
            '', 
            'JUNIOR_DEVELOPER', 
            'ANALYST', 
            'PROJECT_MANAGER', 
            'HR_MANAGER', 
            'SENIOR_DEVELOPER', 
            'TEAM_LEAD'
        ];
        const actualDesignationValues = designationOptions.map(option => option.element.value);
        expect(actualDesignationValues).toEqual(expectedDesignationValues);

        const joiningDateInput = wrapper.find('input[type="date"]');
        expect(joiningDateInput.exists()).toBe(true);

        const submitButton = wrapper.find('button[type="submit"]');
        expect(submitButton.exists()).toBe(true);
        expect(submitButton.text()).toBe('Register Employee');
    });

    // it('handles employee registration successfully', async () => {
    //     const mockFetch = vi.fn(() => 
    //         Promise.resolve({
    //             ok: true,
    //             json: () => Promise.resolve({})
    //         })
    //     );
    //     global.fetch = mockFetch;

    //     const mockAlert = vi.fn();
    //     global.alert = mockAlert;

    //     const wrapper = mount(EmployeeForm);

    //     const testData = {
    //         name: 'John Doe',
    //         aadharNumber: '123456789012',
    //         gender: 'MALE',
    //         age: 30,
    //         salary: 75000,
    //         employeeId: 'EMP001',
    //         designation: 'JUNIOR_DEVELOPER',
    //         department: 'Engineering',
    //         joiningDate: '2024-01-15'
    //     };

    //     const formInputs = wrapper.findAll('input, select');
    //     const inputMap = {
    //         'Name': testData.name,
    //         'Aadhar Number': testData.aadharNumber,
    //         'Employee ID': testData.employeeId,
    //         'Department': testData.department,
    //         'Age': testData.age.toString(),
    //         'Salary': testData.salary.toString(),
    //         'date': testData.joiningDate
    //     };

    //     for (const input of formInputs) {
    //         const placeholder = input.attributes('placeholder');
    //         const type = input.attributes('type');
            
    //         if (placeholder && inputMap[placeholder] !== undefined) {
    //             await input.setValue(inputMap[placeholder]);
    //         } else if (type === 'date') {
    //             await input.setValue(inputMap['date']);
    //         } else if (input.element.tagName.toLowerCase() === 'select') {
    //             if (input.attributes('v-model').includes('gender')) {
    //                 await input.setValue(testData.gender);
    //             } else if (input.attributes('v-model').includes('designation')) {
    //                 await input.setValue(testData.designation);
    //             }
    //         }
    //     }

    //     await wrapper.find('form').trigger('submit.prevent');

    //     expect(mockFetch).toHaveBeenCalledWith('http://localhost:8080/api/employees', {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify(testData)
    //     });

    //     expect(mockAlert).toHaveBeenCalledWith('Employee registered successfully!');
    // });

    // it('handles registration error', async () => {
    //     const mockFetch = vi.fn(() => 
    //         Promise.resolve({
    //             ok: false
    //         })
    //     );
    //     global.fetch = mockFetch;

    //     const mockAlert = vi.fn();
    //     global.alert = mockAlert;

    //     const wrapper = mount(EmployeeForm);

    //     const testData = {
    //         name: 'Jane Smith',
    //         aadharNumber: '987654321098',
    //         gender: 'FEMALE',
    //         age: 28,
    //         salary: 65000,
    //         employeeId: 'EMP002',
    //         designation: 'ANALYST',
    //         department: 'Product',
    //         joiningDate: '2024-02-01'
    //     };

    //     const formInputs = wrapper.findAll('input, select');
    //     const inputMap = {
    //         'Name': testData.name,
    //         'Aadhar Number': testData.aadharNumber,
    //         'Employee ID': testData.employeeId,
    //         'Department': testData.department,
    //         'Age': testData.age.toString(),
    //         'Salary': testData.salary.toString(),
    //         'date': testData.joiningDate
    //     };

    //     for (const input of formInputs) {
    //         const placeholder = input.attributes('placeholder');
    //         const type = input.attributes('type');
            
    //         if (placeholder && inputMap[placeholder] !== undefined) {
    //             await input.setValue(inputMap[placeholder]);
    //         } else if (type === 'date') {
    //             await input.setValue(inputMap['date']);
    //         } else if (input.element.tagName.toLowerCase() === 'select') {
    //             if (input.attributes('v-model').includes('gender')) {
    //                 await input.setValue(testData.gender);
    //             } else if (input.attributes('v-model').includes('designation')) {
    //                 await input.setValue(testData.designation);
    //             }
    //         }
    //     }

    //     await wrapper.find('form').trigger('submit.prevent');

    //     expect(mockAlert).toHaveBeenCalledWith('Failed to register employee.');
    // });
});