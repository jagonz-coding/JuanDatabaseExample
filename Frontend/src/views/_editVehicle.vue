<template>
    <!--Add Customer form -->
    <div class="row justify-content-center">
        <div class="col-md-6">

						<p class="fs-1 text-center" >Edit Vehicle</p>
            <form @submit.prevent="handleSubmitForm">

                <div class="form-group">
                    <label>Make*</label>
                    <input type="text" class="form-control" v-model="this.viewCar[0].make" required>
                </div>

                <div class="form-group">
                    <label>Model*</label>
                    <input type="text" class="form-control" v-model="this.viewCar[0].model" required>
                </div>

                <div class="form-group">
                    <label>Year*</label>
                    <input type="number"  class="form-control" v-model="this.viewCar[0].year" required>
                </div>

                <div class="form-group">
                    <label>Engine*</label>
                    <input type="text"  class="form-control" v-model="this.viewCar[0].engine" required>
                </div>

                <div class="form-group">
                    <label>Color*</label>
                    <input type="text" class="form-control" v-model="this.viewCar[0].color" required>
                </div>

                <div class="form-group">
                    <label>License Plate*</label>
                    <input type="text" class="form-control" v-model="this.viewCar[0].license_plate" required>
                </div>

                <div class="form-group">
                    <label>Miles*</label>
                    <input type="number" class="form-control" v-model="this.viewCar[0].miles" required>
                </div>

                <div class="form-group">
                    <label>Is Insured?*</label>
                    <div class="input-group mb-3">
                        <label class="input-group-text" for="inputGroupSelect01">Options</label>
                        <select class="form-select" id="inputGroupSelect01" v-model="this.viewCar[0].is_insured">
                            <option v-bind:value=1>Yes</option>
                            <option v-bind:value=0>No</option>
                        </select>
                    </div>
                </div>

                <div class="form-group">
                    <label>Has Wheel Locks?*</label>
                    <div class="input-group mb-3">
                        <label class="input-group-text" for="inputGroupSelect01">Options</label>
                        <select class="form-select" id="inputGroupSelect01" v-model="this.viewCar[0].has_wheel_lock">
                            <option v-bind:value=1>Yes</option>
                            <option v-bind:value=0>No</option>
                        </select>
                    </div>
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
            // Initialize client data object to hold empty data (e.g., so UI fields appear empty)
            viewCar: []
        }
    },
    created() {
        // Get organizations data and assign to organizations data object
        let apiURL = `http://localhost:3001/vehicle/${this.$route.params.id}`
        axios.get(apiURL).then(res => {
            this.viewCar = res.data
            console.log(this.viewCar[0]);
        }).catch(error => {
            console.log(error)
        })
    },
    methods: {
        // Submit entered in data and post to backend API
        handleSubmitForm() {
            let apiURL2 = `http://localhost:3001/vehicle/${this.$route.params.id}`;
            axios.put(apiURL2, this.viewCar).then((res) => {
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