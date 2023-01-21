<template>
    <div class="row justify-content-center">
        <p class="fs-1 text-center" >Completed Repairs</p>

        <p></p>

        <table class="table table-striped table-hover" >
            <thead class="table table-secondary">
                <tr>
                    <th>Customer Name</th>
                    <th>Homephone</th>
                    <th>Vehicle Details</th>
                    <th>Employee Name</th>
                    <th>Service Description</th>
                    <th>Service Complete?</th>
                    <th>Mechanic Notes</th>
                    <th>Checkin Date</th>
                    <th>Checkout Date</th>
                    <th>Address</th>
                    <th>City</th>
                    <th>State</th>
                    <th>Zipcode</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="rep in comRepairs" :key="rep.vehicle_history_id">
                    <td>{{ rep.firstname + ' ' + rep.lastname}}</td>
                    <td>{{ rep.homephone }}</td>
                    <td>{{ rep.color + ' ' + rep.make + ' ' + rep.model + ' ' + rep.year}}</td>
                    <td>{{ rep.e_firstname + ' ' + rep.e_lastname }}</td>
                    <td>{{ rep.service_description }}</td>
                    <td v-if="rep.service_complete">Yes</td>
                    <td v-else>No</td>
                    <td>{{ rep.mechanic_notes }}</td>
                    <td>{{ cutDate(rep.checkin_date) }}</td>
                    <td>{{ cutDate(rep.checkout_date) }}</td>
                    <td>{{ rep.address }}</td>
                    <td>{{ rep.city }}</td>
                    <td>{{ rep.state }}</td>
                    <td>{{ rep.zipcode }}</td>
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
            comRepairs: []
        }
    },
    created() {
        let apiURL = 'http://localhost:3001/repairsCompleted/'
        axios.get(apiURL).then(res => {
            this.comRepairs = res.data
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