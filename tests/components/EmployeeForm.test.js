import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import EmployeeForm from '../../src/components/EmployeeForm.vue';
import { useRouter, useRoute } from 'vue-router';

// Mocking the vue-router
vi.mock('vue-router', () => ({
  useRouter: vi.fn(),
  useRoute: vi.fn(),
}));

describe('EmployeeForm.vue', () => {
  let mockRouter;
  let mockRoute;

  beforeEach(() => {
    mockRouter = { push: vi.fn() };
    mockRoute = { params: {} };
    useRouter.mockReturnValue(mockRouter);
    useRoute.mockReturnValue(mockRoute);
  });

  it('renders all input fields correctly', async () => {
    const wrapper = mount(EmployeeForm);

    // Check if all inputs are rendered
    const nameInput = wrapper.find('input[placeholder="Name"]');
    expect(nameInput.exists()).toBe(true);

    const aadharInput = wrapper.find('input[placeholder="Aadhar Number"]');
    expect(aadharInput.exists()).toBe(true);

    const ageInput = wrapper.find('input[placeholder="Age"]');
    expect(ageInput.exists()).toBe(true);

    const salaryInput = wrapper.find('input[placeholder="Salary"]');
    expect(salaryInput.exists()).toBe(true);

    const employeeIdInput = wrapper.find('input[placeholder="Employee ID"]');
    expect(employeeIdInput.exists()).toBe(true);

    const genderSelect = wrapper.find('select');
    expect(genderSelect.exists()).toBe(true);

    const designationSelect = wrapper.findAll('select')[1];
    expect(designationSelect.exists()).toBe(true);

    const departmentInput = wrapper.find('input[placeholder="Department"]');
    expect(departmentInput.exists()).toBe(true);

    const joiningDateInput = wrapper.find('input[type="date"]');
    expect(joiningDateInput.exists()).toBe(true);

    const submitButton = wrapper.find('button[type="submit"]');
    expect(submitButton.exists()).toBe(true);
    expect(submitButton.text()).toBe('Register Employee');
  });

  it('submits the form correctly for employee registration', async () => {
    const wrapper = mount(EmployeeForm);

    // Mock fetch API
    const mockFetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      })
    );
    global.fetch = mockFetch;

    // Mock the alert function
    const mockAlert = vi.fn();
    global.alert = mockAlert;

    // Fill in the form data
    await wrapper.find('input[placeholder="Name"]').setValue('John Doe');
    await wrapper.find('input[placeholder="Aadhar Number"]').setValue('123456789012');
    await wrapper.find('input[placeholder="Age"]').setValue(30);
    await wrapper.find('input[placeholder="Salary"]').setValue(50000);
    await wrapper.find('input[placeholder="Employee ID"]').setValue('EMP001');
    await wrapper.find('input[placeholder="Department"]').setValue('Engineering');
    await wrapper.find('input[type="date"]').setValue('2024-01-15');
    await wrapper.find('select').setValue('MALE');
    await wrapper.findAll('select')[1].setValue('JUNIOR_DEVELOPER');

    // Submit the form
    await wrapper.find('form').trigger('submit.prevent');

    // Check that fetch was called correctly
    expect(mockFetch).toHaveBeenCalledWith('http://localhost:8080/api/employees', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'John Doe',
        aadharNumber: '123456789012',
        gender: 'MALE',
        age: 30,
        salary: 50000,
        employeeId: 'EMP001',
        designation: 'JUNIOR_DEVELOPER',
        department: 'Engineering',
        joiningDate: '2024-01-15',
      }),
    });

    // Check that alert was called
    expect(mockAlert).toHaveBeenCalledWith('Employee registered successfully!');
    expect(mockRouter.push).toHaveBeenCalledWith('/employees');
  });

//   it('submits the form correctly for employee update', async () => {
//     // Mock the route to simulate editing an employee
//     mockRoute.params.id = 'EMP001';
//     const wrapper = mount(EmployeeForm);

//     // Mock fetch for updating
//     const mockFetch = vi.fn(() =>
//       Promise.resolve({
//         ok: true,
//         json: () => Promise.resolve({}),
//       })
//     );
//     global.fetch = mockFetch;

//     const mockAlert = vi.fn();
//     global.alert = mockAlert;

//     // Fill in the form data
//     await wrapper.find('input[placeholder="Name"]').setValue('John Doe');
//     await wrapper.find('input[placeholder="Aadhar Number"]').setValue('123456789012');
//     await wrapper.find('input[placeholder="Age"]').setValue(30);
//     await wrapper.find('input[placeholder="Salary"]').setValue(50000);
//     await wrapper.find('input[placeholder="Employee ID"]').setValue('EMP001');
//     await wrapper.find('input[placeholder="Department"]').setValue('Engineering');
//     await wrapper.find('input[type="date"]').setValue('2024-01-15');
//     await wrapper.find('select').setValue('MALE');
//     await wrapper.findAll('select')[1].setValue('JUNIOR_DEVELOPER');

//     // Submit the form
//     await wrapper.find('form').trigger('submit.prevent');

//     // Check that fetch was called correctly for update
//     expect(mockFetch).toHaveBeenCalledWith('http://localhost:8080/api/employees/EMP001', {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         name: 'John Doe',
//         aadharNumber: '123456789012',
//         gender: 'MALE',
//         age: 30,
//         salary: 50000,
//         employeeId: 'EMP001',
//         designation: 'JUNIOR_DEVELOPER',
//         department: 'Engineering',
//         joiningDate: '2024-01-15',
//       }),
//     });

//     // Check that alert was called
//     expect(mockAlert).toHaveBeenCalledWith('Employee updated successfully!');
//     expect(mockRouter.push).toHaveBeenCalledWith('/employees');
//   });

  it('handles errors during employee registration', async () => {
    // Mock fetch failure
    const mockFetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
      })
    );
    global.fetch = mockFetch;

    const wrapper = mount(EmployeeForm);

    await wrapper.find('input[placeholder="Name"]').setValue('John Doe');
    await wrapper.find('input[placeholder="Aadhar Number"]').setValue('123456789012');
    await wrapper.find('input[placeholder="Age"]').setValue(30);
    await wrapper.find('input[placeholder="Salary"]').setValue(50000);
    await wrapper.find('input[placeholder="Employee ID"]').setValue('EMP001');
    await wrapper.find('input[placeholder="Department"]').setValue('Engineering');
    await wrapper.find('input[type="date"]').setValue('2024-01-15');
    await wrapper.find('select').setValue('MALE');
    await wrapper.findAll('select')[1].setValue('JUNIOR_DEVELOPER');

    const mockAlert = vi.fn();
    global.alert = mockAlert;

    // Submit the form
    await wrapper.find('form').trigger('submit.prevent');

    // Check that error alert was shown
    expect(mockAlert).toHaveBeenCalledWith('Failed to register employee.');
  });

  it('handles fetch error when editing employee', async () => {
    mockRoute.params.id = 'EMP001';
    const wrapper = mount(EmployeeForm);

    // Mock fetch failure when fetching employee details
    const mockFetch = vi.fn(() => Promise.reject(new Error('Failed to fetch employee details.')));
    global.fetch = mockFetch;

    const mockAlert = vi.fn();
    global.alert = mockAlert;

    // Check if employee details were not fetched and redirected
    await wrapper.vm.$nextTick();

    expect(mockAlert).toHaveBeenCalledWith('Failed to fetch employee details.');
    expect(mockRouter.push).toHaveBeenCalledWith('/employees');
  });
});
