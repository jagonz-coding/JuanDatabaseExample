<template>
    <!--Add Customer form -->
    <div class="row justify-content-center">
        <div class="col-md-6">
						<p class="fs-1 text-center" >Create a Service</p>
            <form @submit.prevent="handleSubmitForm">

                <div class="form-group">
                    <label>Service Description*</label>
                    <input type="text" class="form-control" v-model="services.service_description" required>
                </div>

                <!-- <div class="form-group"> -->
                <p></p>
                    <!-- <input type="boolean" class="form-control" v-model="services.is_quick" required>
                </div> -->


                <!-- updated as dropdown to fix issue -->

                    <label>Is it a quick service?*</label>

                    <div class="input-group mb-3">

                        <label class="input-group-text" for="inputGroupSelect01">Options</label>

                        <select class="form-select" id="inputGroupSelect01" v-model="services.is_quick">

                            <option v-bind:value=1>Quick</option>

                            <option v-bind:value=0>Not Quick</option>

                        </select>


                </div>
                <p></p>

                <button class="btn btn-success mt-3">Create</button>

            </form>
        </div>
    </div>
</template>

<script>
import axios from "axios";
//import { mask } from 'vue-the-mask';
export default {
    //directives: { mask },
    data() {
        return {
            // Initialize client data object to hold empty data (e.g., so UI fields appear empty)

            services: {}

        }

    },
    created() {
        // Get services data and assign to services data object
        // let apiURL = `http://localhost:3001/services`;
        // axios.get(apiURL).then((res) => {
        //     this.services = res.data;
        //     console.log(this.services)
        // })
    },
    methods: {
        // Submit entered in data and post to backend API
        handleSubmitForm() {
            let apiURL = 'http://localhost:3001/addService';
            axios.post(apiURL, this.services).then((res) => {
                this.$router.push('/')
            }).catch(error => {
                console.log(error)
            });
        },
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


