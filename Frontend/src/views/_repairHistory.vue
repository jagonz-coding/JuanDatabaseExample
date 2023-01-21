<template>
    <div class="row justify-content-center">
			<p class="fs-1 text-center" >Repair History</p>
        <div class="d-flex justify-content-start">
            <input type="text" v-model="search1" placeholder="Search all fields" aria-label="First name" class="form-control" >
        </div>
        <div class="d-flex justify-content-start">
                <div class="form-check form-check-inline">
                    <input class="form-check-input" v-model="filter" type="radio" name="filter" id="all" value="all" checked>
                    <label class="form-check-label" for="all">All</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" v-model="filter" type="radio" name="filter" id="completed" value="completed">
                    <label class="form-check-label" for="completed">Completed</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" v-model="filter" type="radio" name="filter" id="notcompleted" value="notcompleted">
                    <label class="form-check-label" for="notcompleted">Not Completed</label>
                </div>
        </div>
        <p></p>
					<table class="table table-striped table-hover" >
							<thead class="table table-secondary">
									<tr>
											<th>Edit</th>
											<th>Mechanic</th>
											<th>Customer</th>
											<th width="150px">Customer Cell</th>
											<th>Vehicle</th>
											<th width="150px">Checkin Date</th>
											<th width="150px">Checkout Date</th>
											<th width="150px">Service Type</th>
											<th>Authorized?</th>
											<th>Complete?</th>
											<th width="150px">Mechanic Notes</th>    
									</tr>
							</thead>
							<tbody>
									<!-- https://stackoverflow.com/questions/52099089/how-to-get-nested-json-data-in-vue-js-->
									<!-- https://stackoverflow.com/questions/41424354/vue-js-cannot-access-to-nested-properties-of-data-object-->
											<tr v-for="rep in completedRepairsFilter" :key="rep.vehicle_history_id">
													<td>
															<router-link :to="{ name: 'editRepair', params: { id: rep.vehicle_history_id } }" class="btn btn-success">
																	Edit</router-link>
													</td>
													<td>{{ rep.e_firstname + ' ' + rep.e_lastname}}</td>
													<td>{{ rep.firstname + ' ' + rep.lastname}}</td>
													<td>{{ rep.cellphone}}</td>
													<!-- <td v-if="emp.empDetails.firstName">{{ emp.empDetails.firstName }}</td> -->
													<td>{{ rep.color + ' ' + rep.make + ' ' + rep.model }}</td>
													<td>{{ formatDate(rep.checkin_date) }}</td>
													<td>{{ formatDate(rep.checkout_date) }}</td>
													<td>{{ rep.service_description }}</td>
													<!-- This v-if-else statement is an example of how to check a value and dynamically change it on the frontend.
													Here, MySQL stores Booleans as eithe a 1 or a 0, so we must manually check if it is true/false and display "Yes" or "No"-->
													<td v-if="rep.service_authorized">Yes</td>
													<td v-else>No</td>
													<td v-if="rep.service_complete">Yes</td>
													<td v-else>No</td>
													<td>{{ rep.mechanic_notes }}</td>
													<!--<td v-bind:value="getOrgName(emp.orgCode)"> {{ this.organizationName }} </td>-->
											</tr>
									<!--<router-link :to="{ name: 'addOrganization' }" class="btn btn-success">Add new</router-link>-->
							</tbody>
					</table>
    </div>       
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            repairs: [],
            search1: '',
            filter: 'all',
            client: {
                lastname: '',
                phonenumber: ''
            }
        }
    },
    created() {
        // Get repair_history from backend and assign to repairs data object.
        // Uses two way binding (v-model) to populate into the UI fields
        // The repairs data object is assigned whatever is returned by the API. 
        // The html tags are bound to different fields within the repairs object.
        // Anytime the data object is updated / changed, so will the html tags.
        let apiURL = 'http://localhost:3001/repair_history'
        axios.get(apiURL).then(res => {
            this.repairs = res.data;
        }).catch(error => {
            console.log(error)
        });

    },
    computed:{
        filteredRepairs: function(){
            return this.repairs.filter((rep) => {
                if        (rep.e_firstname.toLowerCase().match(this.search1.toLowerCase())){
                    return true
                } else if (rep.e_lastname.toLowerCase().match(this.search1.toLowerCase())){
                    return true
                } else if (rep.cellphone.toLowerCase().match(this.search1.toLowerCase())){
                    return true
                } else if (rep.firstname.toLowerCase().match(this.search1.toLowerCase())){
                    return true
                } else if (rep.lastname.toLowerCase().match(this.search1.toLowerCase())){
                    return true
                } else if (rep.checkin_date.match(this.search1.toLowerCase())){
                    return true
                } else if (rep.checkout_date != null){
                    if (rep.checkout_date.match(this.search1.toLowerCase())){
                        return true
                    }
                } else if (rep.make.toLowerCase().match(this.search1.toLowerCase())){
                    return true;
                } else if (rep.model.toLowerCase().match(this.search1.toLowerCase())){
                    return true;
                } else if (rep.color.toLowerCase().match(this.search1.toLowerCase())){
                    return true;
                } else if (rep.firstname.toLowerCase().match(this.search1.toLowerCase())){
                    return true;
                } else if (rep.lastname.toLowerCase().match(this.search1.toLowerCase())){
                    return true;
                } else if (rep.service_description.toLowerCase().match(this.search1.toLowerCase())){
                    return true;
                }

            });
        },
        completedRepairsFilter: function(){
            return this.filteredRepairs.filter((rep) => {
                if (this.filter == 'all'){
                    if (rep.service_complete == 0 || rep.service_complete == 1){
                        return true
                    }
                } else if (this.filter == 'completed') {
                    if (rep.service_complete == 1){
                        return true
                    }
                } else if (this.filter == 'notcompleted') {
                    if (rep.service_complete == 0){
                        return true
                    }
                }
            });
        }

    },
    methods: {
        //Not used
        editRepair(id) {
            let apiURL = `http://localhost:3001/editRepair/${id}`;
            let indexOfArrayItem = this.employees.findIndex(i => i._id === id);
            // Get user confirmation before deleting
            if (window.confirm("Do you really want to delete?")) {
                axios.delete(apiURL).then(() => {
                    this.employees.splice(indexOfArrayItem, 1);
                }).catch(error => {
                    console.log(error)
                });
            }
        },
        //Format date
        formatDate(dateString) {
            if (dateString != null & dateString != '0000-00-00') {
                const date = new Date(dateString);
                return new Intl.DateTimeFormat('fr-CA', {year: 'numeric', month: '2-digit', day: '2-digit'}).format(date);
            } else {
                return 'N/A'
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