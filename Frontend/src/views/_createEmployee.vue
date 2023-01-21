<template>
    <!--Add Customer form -->
    <div class="row justify-content-center">
        <div class="col-md-6">
						<p class="fs-1 text-center" >New Employee</p>
            <form @submit.prevent="handleSubmitForm">


            
<p></p>
<p></p>
<p></p>
<p></p>
<h5 class="text-center">Name</h5>
                <div class="form-group">
                    <label>First Name*</label>
                    <input type="text" class="form-control" v-model="employees.e_firstname" required>
                </div>

                <div class="form-group">
                    <label>Last Name*</label>
                    <input type="text" class="form-control" v-model="employees.e_lastname" required>
                </div>

<p></p>
<p></p>

<h5 class="text-center">Contact Information</h5>
                
                <div class="form-group">
                    <label>Home Phone*</label>
                    <input type="text" class="form-control" v-model="employees.homephone" v-mask="['(###) ###-####']" required>
                </div>

                <div class="form-group">
                    <label>Cell Phone (optional)</label>
                    <input type="text" class="form-control" v-model="employees.cellphone" v-mask="['(###) ###-####']">
                </div>
            
<p></p>
<p></p>
                <h5 class="text-center">Address Information</h5>

                <div class="form-group">
                    <label>Address*</label>
                    <input type="text" class="form-control" v-model="employees.address" required>
                </div>

                
                <div class="form-group">
                    <label>Suite Number </label>
                    <input type="text" class="form-control" v-model="employees.suite_num">
                </div>

                <div class="form-group">
                    <label>City*</label>
                    <input type="text" class="form-control" v-model="employees.city" required>
                </div>

                
                <div class="form-group">
                    <label>State*</label>
                    <input type="text" class="form-control" v-model="employees.state" required>
                </div>
                
                <div class="form-group">
                    <label>Zipcode*</label>
                    <input type="text" class="form-control" v-model="employees.zipcode" required>
                </div>
    <p></p>
    <p></p>

                <h5 class="text-center">Job Information</h5>

                <div class="form-group">
                    <label>Job Type*</label>
                    <div class="input-group mb-3">
                        <label class="input-group-text" for="inputGroupSelect01">Options</label>
                        <select class="form-select" id="inputGroupSelect01" v-model="employees.employee_type_id">
                            <option selected disabled>Choose...</option>
                            <option v-for="employee_type in employee_type" :key="employee_type._id" v-bind:value="employee_type.employee_type_id">
                                {{ employee_type.type_desc }}
                            </option> 
                        </select>
                    </div>
                </div>


                <div class="form-group">
                    <label>Salary*</label>
                    <input type="integer" class="form-control" v-model="employees.paid_salary" required>
                </div>


                <div class="form-group">
                    <label>Shop Location*</label>
                    <div class="input-group mb-3">
                        <label class="input-group-text" for="inputGroupSelect01">Options</label>
                        <select class="form-select" id="inputGroupSelect01" v-model="employees.shop_id">
                            <option selected disabled>Choose...</option>
                            <option v-for="shop in shops" :key="shop._id" v-bind:value="shop.shop_id">
                                {{  shop.address + ' | ' + shop.city + ' | ' + shop.state + ' | ' + shop.zipcode      }}
                            </option>
                        </select>
                    </div>
                </div>
                <!-- Drop down object to hold organizations 
                <div class="form-group">
                    <label>How did you hear about us?</label>
                    <div class="input-group mb-3">
                        <label class="input-group-text" for="inputGroupSelect01">Options</label>
                        <select class="form-select" id="inputGroupSelect01" v-model="client.orgCode">
                            <option selected disabled>Choose...</option>
                            <option v-for="org in organizations" :key="org._id" v-bind:value="org._id">
                                {{ org.orgName }}
                            </option>
                        </select>
                    </div>
                </div>
            -->

                <button class="btn btn-success mt-3">Create</button>

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
            // Initialize organizations data object so the dropdown box can be populated (via v-model two way binding)
            employee_type: {},
            
            // initialize shops data object so dropdown box can be populated
            shops: {}
        }
    },
    created() {
        // Get employees data and assign to employees data object
        // let apiURL1 = `http://localhost:3001/employees`;
        // axios.get(apiURL1).then((res) => {
        //     this.employees = res.data;
        //     console.log(this.employees)
        // });

        let apiURL2 = `http://localhost:3001/emptype`;
        axios.get(apiURL2).then((res) => {
            this.employee_type = res.data;
            console.log(this.employee_type)
        });

        // Get shop location data and assign to shops data object
        let apiURL3 = `http://localhost:3001/shops/`;
        axios.get(apiURL3).then((res) => {
            this.shops = res.data;
            console.log(this.shops)
        });

    },
/*
    created() {
        Get employee types data and assign to employee types data object
        let apiURL = `http://localhost:3001/emptypes`;
        axios.get(apiURL).then((res) => {
            this.employee_type = res.data;
            console.log(this.employee_type)
        })
    },
*/  
    /*
    created() {
        // Get shop location data and assign to shops data object
        let apiURL = `http://localhost:3001/shops/`;
        axios.get(apiURL).then((res) => {
            this.shops = res.data;
            console.log(this.shops)
        })
    },
*/
    methods: {
        // Submit entered in data and post to backend API
        handleSubmitForm() {
            let apiURL = 'http://localhost:3001/addEmployee';
            console.log(this.employees)
            axios.post(apiURL, this.employees).then((res) => {
                this.$router.push('/')
            }).catch(error => {
                console.log(error)
            });
        }
//validateEmail() {
            //if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email)) {
                //this.msg['email'] = 'Please enter a valid email address';
            //} else {
                //this.msg['email'] = '';
            //}
        //}
    }
}
</script>

<style>
body {
    background-color: rgb(255, 255, 255) !important
}
</style>