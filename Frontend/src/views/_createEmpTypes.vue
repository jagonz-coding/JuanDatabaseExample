<template>
    <!--Add Customer form -->
    <div class="row justify-content-center">
        <div class="col-md-6">
						<p class="fs-1 text-center" >New Employee Type</p>
            <form @submit.prevent="handleSubmitForm">

                <div class="form-group">
                    <label>Employee Description*</label>
                    <input type="text" class="form-control" v-model="empType.type_desc" required>
                </div>

                <div class="form-group">
                    <label>Base Salary*</label>
                    <input type="number" class="form-control" v-model="empType.base_salary" required>
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
            empType: {}
        }
    },
    methods: {
        // Submit entered in data and post to backend API
        handleSubmitForm() {
            let apiURL = 'http://localhost:3001/emptype';
            axios.post(apiURL, this.empType).then((res) => {
                console.log(this.empType);
                this.$router.push('/empTypes')
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