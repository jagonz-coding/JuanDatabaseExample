<template>
    <!--Add Customer form -->
    <div class="row justify-content-center">
        <div class="col-md-6">
						<p class="fs-1 text-center" >Edit Customer</p>
            <form @submit.prevent="handleSubmitForm">

                <div class="form-group">
                    <label>First Name*</label>
                    <input type="text" class="form-control" v-model="this.viewCustomer[0].firstname" required>
                </div>

                <div class="form-group">
                    <label>Last Name*</label>
                    <input type="text" class="form-control" v-model="this.viewCustomer[0].lastname" required>
                </div>

                <div class="form-group">
                    <label>Home Phone*</label>
                    <input type="text"  class="form-control" v-model="this.viewCustomer[0].homephone" v-mask="['(###) ###-####']" required>
                </div>

                <div class="form-group">
                    <label>Cell Phone</label>
                    <input type="text"  class="form-control" v-model="this.viewCustomer[0].cellphone" v-mask="['(###) ###-####']">
                </div>

                <div class="form-group">
                    <label>Work Phone</label>
                    <input type="text"  class="form-control" v-model="this.viewCustomer[0].workphone" v-mask="['(###) ###-####']">
                </div>

                <div class="form-group">
                    <label>Email*</label>
                    <input type="email" class="form-control" v-model="this.viewCustomer[0].email" @blur="validateEmail" required>
                </div>

                <div class="form-group">
                    <label>Address*</label>
                    <input type="text" class="form-control" v-model="this.viewCustomer[0].address" required>
                </div>

                <div class="form-group">
                    <label>Suite Number*</label>
                    <input type="text" class="form-control" v-model="this.viewCustomer[0].suite_num">
                </div>

                <div class="form-group">
                    <label>City*</label>
                    <input type="text" class="form-control" v-model="this.viewCustomer[0].city" required>
                </div>

                <div class="form-group">
                    <label>State*</label>
                    <input type="text" class="form-control" v-model="this.viewCustomer[0].state" required>
                </div>

                <div class="form-group">
                    <label>Zipcode*</label>
                    <input type="text" class="form-control" v-model="this.viewCustomer[0].zipcode" required>
                </div>

                <button class="btn btn-success mt-3">Update</button>

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
            viewCustomer: []
        }
    },
    created() {
        let apiURL = `http://localhost:3001/customer/${this.$route.params.id}`
        axios.get(apiURL).then(res => {
            this.viewCustomer = res.data
        }).catch(error => {
            console.log(error)
        })
    },
    methods: {
        // Submit entered in data and post to backend API
        handleSubmitForm() {
            let apiURL2 = `http://localhost:3001/customer/${this.$route.params.id}`;
            axios.put(apiURL2, this.viewCustomer).then((res) => {
                this.$router.push('/customers')
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