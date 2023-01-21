<template>
    <!--Add Customer form -->
    <div class="row justify-content-center">
        <div class="col-md-6">
						<p class="fs-1 text-center">Vehicles Checked-Out Report</p>
            <form @submit.prevent="handleSubmitForm">

                <div class="form-group">
                    <label>Between</label>
                    <input type="date" class="form-control" v-model="dates.date1" required>
                </div>

                <div class="form-group">
                    <label>And</label>
                    <input type="date" class="form-control" v-model="dates.date2" required>
                </div>

                <p></p>

                <div class="form-group">
                    <router-link :to="{ name: 'vehiclesChkdOUTReportView', params: { date1: dates.date1, date2: dates.date2  } }" class="btn btn-success">
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
            dates: {}
        }
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