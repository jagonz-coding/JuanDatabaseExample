<template>
    <div class="row justify-content-center">
        <p class="fs-1 text-center" >Vehicles</p>

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
                    <input class="form-check-input" v-model="filter" type="radio" name="filter" id="insured" value="insured">
                    <label class="form-check-label" for="insured">Insured</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" v-model="filter" type="radio" name="filter" id="notinsured" value="notinsured">
                    <label class="form-check-label" for="notinsured">Not Insured</label>
                </div>
        </div>
        <p></p>

        <table class="table table-striped table-hover" >
            <thead class="table table-secondary">
                <tr>
                    <th>Edit</th>
                    <th>Delete</th>
                    <th>Customer Name</th>
                    <th>License Plate</th>
                    <th>Make</th>
                    <th>Model</th>
                    <th>Year</th>
                    <th>Engine</th>
                    <th>Color</th>
                    <th>Miles</th>
                    <th>Is Insured?</th>
                    <th>Wheel Locks?</th>
                </tr>
            </thead>
            <tbody>
                <!-- https://stackoverflow.com/questions/52099089/how-to-get-nested-json-data-in-vue-js-->
                <!-- https://stackoverflow.com/questions/41424354/vue-js-cannot-access-to-nested-properties-of-data-object-->
                <tr v-for="car in completedVehiclesFilter" :key="car.vehicle_id">
                    <td>
                        <router-link :to="{ name: 'editVehicle', params: { id: car.vehicle_id } }" class="btn btn-success">
                            Edit</router-link>
                    </td>
                    <td><button @click.prevent="deleteCar(car.vehicle_id)" class="btn btn-danger mx-2">Delete</button></td>
                    <!-- <td v-if="emp.empDetails.firstName">{{ emp.empDetails.firstName }}</td> -->
                    <td>{{ car.firstname + " " + car.lastname}}</td>
                    <td>{{ car.license_plate }}</td>
                    <td>{{ car.make }}</td>
                    <td>{{ car.model }}</td>
                    <td>{{ car.year }}</td>
                    <td>{{ car.engine }}</td>
                    <td>{{ car.color }}</td>
                    <td>{{ car.miles }}</td>
                    <td v-if="car.is_insured">Yes</td>
                    <td v-else>No</td>
                    <td v-if="car.has_wheel_lock">Yes</td>
                    <td v-else>No</td>
                    <!--<td v-bind:value="getOrgName(emp.orgCode)"> {{ this.organizationName }} </td>-->
                </tr>
                <!-- <router-link :to="{ name: 'addOrganization' }" class="btn btn-success">Add new</router-link> -->
            </tbody>
        </table>
    </div>
    
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            vehicles: [],
            search1: '',
            filter: 'all'
        }
    },
    created() {
        let apiURL = 'http://localhost:3001/vehicle/'
        axios.get(apiURL).then(res => {
            this.vehicles = res.data
        }).catch(error => {
            console.log(error)
        });
    },
    computed:{
        filteredVehicles: function(){
            return this.vehicles.filter((car) => {
                if        (car.firstname.toLowerCase().match(this.search1.toLowerCase())){
                    return true
                } else if (car.lastname.toLowerCase().match(this.search1.toLowerCase())){
                    return true
                } else if (car.license_plate.toLowerCase().match(this.search1.toLowerCase())){
                    return true
                } else if (car.make.toLowerCase().match(this.search1.toLowerCase())){
                    return true;
                } else if (car.model.toLowerCase().match(this.search1.toLowerCase())){
                    return true;
                } else if (car.year.toString().match(this.search1.toLowerCase())){
                    return true;
                } else if (car.engine.toLowerCase().match(this.search1.toLowerCase())){
                    return true;
                } else if (car.color.toLowerCase().match(this.search1.toLowerCase())){
                    return true;
                } else if (car.miles.toString().match(this.search1.toLowerCase())){
                    return true;
                } else if ((car.is_insured == 0 && this.search1.toLowerCase() == 'no') || 
                            (car.is_insured == 1 & this.search1.toLowerCase() == 'yes') ){
                    return true;
                } else if ((car.has_wheel_lock == 0 && this.search1.toLowerCase() == 'no') || 
                            (car.has_wheel_lock == 1 & this.search1.toLowerCase() == 'yes') ){
                    return true;
                }
            });
        },
        completedVehiclesFilter: function(){
            console.log(this.filter)
            return this.filteredVehicles.filter((car) => {
                if (this.filter == 'all'){
                    return true
                } else if (this.filter == 'insured') {
                    if (car.is_insured == 1){
                        return true
                    }
                } else if (this.filter == 'notinsured') {
                    if (car.is_insured == 0){
                        return true
                    }
                }
            });
        }
    },
    methods: {
        // Method used for deleting an employee by using _id value (using id as alias)
        deleteCar(id) {
            let apiURL2 = `http://localhost:3001/del/vehicle/${id}`;
            // Get user confirmation before deleting
            if (window.confirm("Do you really want to delete?")) {
                axios.put(apiURL2).then(() => {
                    this.$router.go()
                }).catch(error => {
                    console.log(error)
                });
            }
        }
    }
}
</script>