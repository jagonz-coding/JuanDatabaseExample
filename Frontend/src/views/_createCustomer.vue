

<template>
    <!--Add Customer form -->
    <div class="row justify-content-center">
        <div class="col-md-6">
					<p class="fs-1 text-center" >Add Customer</p>
            <form @submit.prevent="handleSubmitForm">

                <div class="form-group">
                    <label>First Name*</label>
                    <input type="text" class="form-control" v-model="customer.firstname" required>
                </div>

                <div class="form-group">
                    <label>Last Name*</label>
                    <input type="text" class="form-control" v-model="customer.lastname" required>
                </div>

                <div class="form-group">
                    <label>Home Phone*</label>
                    <input type="text"  class="form-control" v-model="customer.homephone" v-mask="['(###) ###-####']" required>
                </div>

                <div class="form-group">
                    <label>Cell Phone</label>
                    <input type="text"  class="form-control" v-model="customer.cellphone" v-mask="['(###) ###-####']">
                </div>

                <div class="form-group">
                    <label>Work Phone</label>
                    <input type="text"  class="form-control" v-model="customer.workphone" v-mask="['(###) ###-####']">
                </div>

                <div class="form-group">
                    <label>Email*</label>
                    <input type="email" class="form-control" v-model="customer.email" @blur="validateEmail" required>
                </div>

                <div class="form-group">
                    <label>Address*</label>
                    <input type="text" class="form-control" v-model="customer.address" required>
                </div>

                <div class="form-group">
                    <label>Suite Number</label>
                    <input type="text" class="form-control" v-model="customer.suite_num">
                </div>

                <div class="form-group">
                    <label>City*</label>
                    <input type="text" class="form-control" v-model="customer.city" required>
                </div>

                <div class="form-group">
                    <label>State*</label>
                    <input type="text" class="form-control" v-model="customer.state" required>
                </div>

                <div class="form-group">
                    <label>Zipcode*</label>
                    <input type="text" class="form-control" v-model="customer.zipcode" required>
                </div>

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
            customer: {
                firstname: '',
                lastname: '',
                homephone: '',
                cellphone: '',
                workphone: '',
                email: '',
                address: '',
                suite_num: '',
                city: "",
                state: "",
                zipcode: ""
            }
        }
    },
    methods: {
        // Submit entered in data and post to backend API
        handleSubmitForm() {
            let apiURL = 'http://localhost:3001/customer/';
            axios.post(apiURL, this.customer).then((res) => {
                this.$router.push('/addVehicle')
            }).catch(error => {
                console.log(error)
            });
        },
        validateEmail() {
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email)) {
                this.msg['email'] = 'Please enter a valid email address';
            } else {
                this.msg['email'] = '';
            }
        }
    }
}
</script>

<style>
body {
    background-color: rgb(255, 255, 255) !important
}
</style>