<template>
    <div class="row justify-content-center">
        <p class="fs-1 text-center" >Vehicles Checked-In Between:</p>
        <p class="fs-2 text-center" > {{ this.$route.params.date1 }} and {{ this.$route.params.date2 }}</p>

        <table class="table table-striped table-hover" >
            <thead class="table table-secondary">
                <tr>
                    <th>Customer Name</th>
                    <th>Home #</th>
                    <th>Cell #</th>
                    <th>Work #</th>
                    <th>License Plate</th>
                    <th>Make</th>
                    <th>Model</th>
                    <th>Check-In Date</th>
                    <th>Check-Out Date</th>
                    <th>Service Completed?</th>
                    <th>Service Description</th>
                </tr>
            </thead>
            <tbody>

                <tr v-for="rec in report" :key="rec.vehicle_id">
                    <td>{{ rec.lastname + ', ' + rec.firstname }}</td>
                    <td>{{ rec.homephone }}</td>
                    <td>{{ rec.cellphone }}</td>
                    <td>{{ rec.workphone }}</td>
                    <td>{{ rec.license_plate }}</td>
                    <td>{{ rec.make }}</td>
                    <td>{{ rec.model }}</td>
                    <td>{{ cutDate(rec.checkin_date) }}</td>
                    <td>{{ cutDate(rec.checkout_date) }}</td>
                    <td v-if="rec.service_complete">Yes</td>
                    <td v-else>No</td>
                    <td>{{ rec.service_description }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            report: []
        }
    },
    created() {
        console.log(this.$route.params.date1);
        console.log(this.$route.params.date2);
        
        let apiURL1 = `http://localhost:3001/carsCheckedIn/${this.$route.params.date1}/${this.$route.params.date2}`
        axios.get(apiURL1).then(res => {
            this.report = res.data;
            console.log(this.report);
        }).catch(error => {
            console.log(error)
        });
        
    },
    methods: {
        cutDate(date) {
            if (date == null) {
                return null
            }
            else {
                var newDate = '';
                newDate = date.slice(0,10);
                return newDate;
            }
        }
    }
}
</script>