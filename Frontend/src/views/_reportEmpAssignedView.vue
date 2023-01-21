<template>
    <div class="row justify-content-center">
        <p class="fs-1 text-center" >Employee Assignment Report For:</p>
        <p class="fs-2 text-center" > {{ this.report[0].e_firstname + ' ' + this.report[0].e_lastname }}</p>

        <div class="d-flex justify-content-start">
            <input type="text" v-model="search1" placeholder="Search all fields" aria-label="First name" class="form-control" >
        </div>
        <p></p>
        <div class="d-flex justify-content-start">
            <div class="form-check form-check-inline">
                <input class="form-check-input" v-model="filter" type="radio" name="filter" id="all" value="all" checked>
                <label class="form-check-label" for="all">All</label>
            </div>
            <div class="form-check form-check-inline">
                <input class="form-check-input" v-model="filter" type="radio" name="filter" id="incomplete" value="incomplete" checked>
                <label class="form-check-label" for="all">Incomplete</label>
            </div>
            <div class="form-check form-check-inline">
                <input class="form-check-input" v-model="filter" type="radio" name="filter" id="complete" value="complete" checked>
                <label class="form-check-label" for="all">Complete</label>
            </div>
        </div>
        <p></p>

        <table class="table table-striped table-hover" >
            <thead class="table table-secondary">
                <tr>
                    <th>Customer Name</th>
                    <th>Customer Home #</th>
                    <th>Vehicle Details</th>
                    <th>Service Completed?</th>
                    <th>Service Description</th>
                    <th>Service Authorized?</th>
                    <th>Is Quick?</th>
                </tr>
            </thead>
            <tbody>

                <tr v-for="rec in completedReportFilter" :key="rec.vehicle_id">
                    <td>{{ rec.firstname + ' ' + rec.lastname}}</td>
                    <td>{{ rec.c_home }}</td>
                    <td>{{ rec.color + ' ' + rec.make + ' ' + rec.model }}</td>
                    <td v-if="rec.service_complete">Yes</td>
                    <td v-else>No</td>
                    <td>{{ rec.service_description }}</td>
                    <td v-if="rec.service_authorized">Yes</td>
                    <td v-else>No</td>
                    <td v-if="rec.is_quick">Yes</td>
                    <td v-else>No</td>
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
            report: [],
            search1: '',
            filter: 'all'
        }
    },
    created() {
        console.log(this.$route.params.employee_id);
        
        let apiURL1 = `http://localhost:3001/empAssigned/${this.$route.params.employee_id}`
        axios.get(apiURL1).then(res => {
            this.report = res.data;
            console.log(this.report);
        }).catch(error => {
            console.log(error)
        });
        
    },
    computed:{
        filteredReport: function(){
            return this.report.filter((rep) => {
                if        (rep.firstname.toLowerCase().match(this.search1.toLowerCase())){
                    return true
                } else if (rep.lastname.toLowerCase().match(this.search1.toLowerCase())){
                    return true
                } else if (rep.c_home.toLowerCase().match(this.search1.toLowerCase())){
                    return true
                } else if (rep.make.toLowerCase().match(this.search1.toLowerCase())){
                    return true;
                } else if (rep.model.toLowerCase().match(this.search1.toLowerCase())){
                    return true;
                } else if (rep.color.toLowerCase().match(this.search1.toLowerCase())){
                    return true;
                } else if (rep.service_description.toLowerCase().match(this.search1.toLowerCase())){
                    return true;
                }  else if ((rep.service_complete == 0 && this.search1.toLowerCase() == 'no') || 
                            (rep.service_complete == 1 & this.search1.toLowerCase() == 'yes') ){
                    return true;
                } else if ((rep.service_authorized == 0 && this.search1.toLowerCase() == 'no') || 
                            (rep.service_authorized == 1 & this.search1.toLowerCase() == 'yes') ){
                    return true;
                } else if ((rep.is_quick == 0 && this.search1.toLowerCase() == 'no') || 
                            (rep.is_quick == 1 & this.search1.toLowerCase() == 'yes') ){
                    return true;
                }
            });
        },
        completedReportFilter: function(){
            console.log(this.filter)
            return this.filteredReport.filter((car) => {
                if (this.filter == 'all'){
                    return true
                } else if (this.filter == 'incomplete') {
                    if (car.service_complete == 0){
                        return true
                    }
                } else if (this.filter == 'complete') {
                    if (car.service_complete == 1){
                        return true
                    }
                }
            });
        }
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