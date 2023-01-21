<template>
    <!--Add Customer form -->
    <div class="row justify-content-center">
        <div class="col-md-6">
					<p class="fs-1 text-center" >Add Vehicle</p>
            <form @submit.prevent="handleSubmitForm">

                <div class="form-group">
                    <label>Vehicle Owner*</label>
                    <div class="input-group mb-3">
                        <label class="input-group-text" for="inputGroupSelect01">Options</label>
                        <div class="d-flex justify-content-start">
                            <input type="text" v-model="search1" placeholder="Search by Name or Home#" aria-label="First name" class="form-control" >
                        </div>
                        <select class="form-select" id="inputGroupSelect01" v-model="vehicle.customer_id">
                            <option v-for="cust in allCustomersFilter" :key="cust.customer_id" v-bind:value="cust.customer_id">
                                {{ 'Name: ' + cust.lastname + ', ' + cust.firstname + ' | Home#: ' + cust.homephone }}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="d-flex justify-content-start">
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" v-model="filter" type="radio" name="filter" id="all" value="all" checked>
                        <label class="form-check-label" for="all">All</label>
                    </div>
                </div>

                <p></p>

                <div class="form-group">
                    <label>Make*</label>
                    <input type="text" class="form-control" v-model="vehicle.make" required>
                </div>

                <div class="form-group">
                    <label>Model*</label>
                    <input type="text" class="form-control" v-model="vehicle.model" required>
                </div>

                <div class="form-group">
                    <label>Year*</label>
                    <input type="number"  class="form-control" v-model="vehicle.year" required>
                </div>

                <div class="form-group">
                    <label>Engine</label>
                    <input type="text"  class="form-control" v-model="vehicle.engine" required>
                </div>

                <div class="form-group">
                    <label>Color*</label>
                    <input type="text" class="form-control" v-model="vehicle.color" required>
                </div>

                <div class="form-group">
                    <label>License Plate*</label>
                    <input type="text" class="form-control" v-model="vehicle.license_plate" required>
                </div>

                <div class="form-group">
                    <label>Miles*</label>
                    <input type="number" class="form-control" v-model="vehicle.miles" required>
                </div>

                <div class="form-group">
                    <label>Is Insured?*</label>
                    <div class="input-group mb-3">
                        <label class="input-group-text" for="inputGroupSelect01">Options</label>
                        <select class="form-select" id="inputGroupSelect01" v-model="vehicle.is_insured">
                            <option v-bind:value=1>Yes</option>
                            <option v-bind:value=0>No</option>
                        </select>
                    </div>
                </div>

                <div class="form-group">
                    <label>Has Wheel Locks?*</label>
                    <div class="input-group mb-3">
                        <label class="input-group-text" for="inputGroupSelect01">Options</label>
                        <select class="form-select" id="inputGroupSelect01" v-model="vehicle.has_wheel_lock">
                            <option v-bind:value=1>Yes</option>
                            <option v-bind:value=0>No</option>
                        </select>
                    </div>
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
            vehicle: {},
            // Initialize organizations data object so the dropdown box can be populated (via v-model two way binding)
            customers: {},
            search1: '',
            filter: 'all'
        }
    },
    created() {
        // Get organizations data and assign to organizations data object
        let apiURL = `http://localhost:3001/customer/desc/`;
        axios.get(apiURL).then((res) => {
            this.customers = res.data;
            console.log(this.customers)
        })
    },
    computed:{
        customersFilter: function(){
            return this.customers.filter((cust) => {
                if        (cust.firstname.toLowerCase().match(this.search1.toLowerCase())){
                    return true
                } else if (cust.lastname.toLowerCase().match(this.search1.toLowerCase())){
                    return true
                } else if (cust.cellphone.toLowerCase().match(this.search1.toLowerCase())){
                    return true
                }
            });
        },
        allCustomersFilter: function(){
            console.log(this.filter)
            return this.customersFilter.filter((rep) => {
                if (this.filter == 'all'){
                    return true
                }
            });
        }
    },
    methods: {
        // Submit entered in data and post to backend API
        handleSubmitForm() {
            let apiURL = 'http://localhost:3001/vehicle';
            axios.post(apiURL, this.vehicle).then((res) => {
                this.$router.push('/vehicles')
            }).catch(error => {
                console.log(error)
            });
        }
    }
}
</script>

<style>
body {
    background-color: rgb(255, 255, 255) !important
}
</style>