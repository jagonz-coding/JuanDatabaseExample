<template>
    <!--Add Customer form -->
    <div class="row justify-content-center">
        <div class="col-md-6">
						<p class="fs-1 text-center" >Employee Assignment Report</p>
            <form @submit.prevent="handleSubmitForm">

                <div class="form-group">
                    <label>Employee</label>
                    <div class="input-group mb-3">
                        <label class="input-group-text" for="inputGroupSelect01">Employees</label>
                        <select class="form-select" id="inputGroupSelect01" v-model="id.employee_id">
                            <option v-for="emp in employees" :key="emp.employee_id" v-bind:value="emp.employee_id">
                                {{ 'Name: ' + emp.e_firstname + ' ' + emp.e_lastname + ' | Job: ' + emp.etype_desc }}
                            </option>
                        </select>
                    </div>
                </div>

                <p></p>

                <div class="form-group">
                    <router-link :to="{ name: 'reportEmpAssignedView', params: { employee_id: id.employee_id  } }" class="btn btn-success">
                            Create Report</router-link>
                </div>

            </form>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { mask } from 'vue-the-mask';
export default {
    directives: { mask },
    data() {
        return {
            // Initialize client data object to hold empty data (e.g., so UI fields appear empty)
            employees: {},
            id: {}
        }
    },
    created() {
        // Get organizations data and assign to organizations data object
        let apiURL = `http://localhost:3001/employees`;
        axios.get(apiURL).then((res) => {
            this.employees = res.data;
            console.log(this.customers)
        })
    },
    methods: {
        // Submit entered in data and post to backend API
        // handleSubmitForm() {
        //     let apiURL = 'http://localhost:3001/customer/';
        //     axios.post('/', this.dates).then((res) => {
        //         this.$router.push('/')
        //     }).catch(error => {
        //         console.log(error)
        //     });
        // }
    }
}
</script>

<style>
body {
    background-color: rgb(255, 255, 255) !important
}
</style>