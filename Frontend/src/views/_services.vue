<template>
<div>
  <p class="fs-1 text-center">All Services</p>
  
<!-- search bar with all/complete/not complete filter-->
<div class="d-flex justify-content-start">
            <input type="text" v-model="search1" placeholder="Search all fields" aria-label="First name" class="form-control" >
        </div>
        <div class="d-flex justify-content-start">
                <div class="form-check form-check-inline">
                    <input class="form-check-input" v-model="filter" type="radio" name="filter" id="all" value="all" checked>
                    <label class="form-check-label" for="all">All</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" v-model="filter" type="radio" name="filter"  id="isquick" value="isquick">
                    <label class="form-check-label" for="isquick">Quick</label>
                </div>
                
                <div class="form-check form-check-inline">
                    <input class="form-check-input" v-model="filter" type="radio" name="filter" id="notquick" value="notquick">
                    <label class="form-check-label" for="notquick">Not Quick</label>
                </div>
        </div>
        <p></p>

<!-- table displaying all services-->
    <div class="table-responsive">
        <table class="table table-striped table-hover" >
            <thead class="table table-secondary">
                <tr>
                    <th>Edit</th>
                    <th>Delete</th>
                    <th>Service Description</th>
                    <th>Quick Service?</th>
                </tr>
            </thead>
            <tbody>
                <!-- https://stackoverflow.com/questions/52099089/how-to-get-nested-json-data-in-vue-js-->
                <!-- https://stackoverflow.com/questions/41424354/vue-js-cannot-access-to-nested-properties-of-data-object-->
                <tr v-for="serv in completedServicesFilter" :key="serv.service_type_id">

                    <td> 
                        <router-link :to="{ name: 'editService', params: { id: serv.service_type_id } }" class="btn btn-success">
                            Edit</router-link>
                    </td>

                    <td><button @click.prevent="deleteService(serv.service_type_id)" class="btn btn-danger mx-2">Delete</button></td>

                    <td>{{ serv.service_description }}</td>
                    <!-- <td v-if="serv.servDetails.firstName">{{ serv.servDetails.firstName }}</td> -->
                    <!-- <td>{{ serv.is_quick }}</td> -->
                    <td v-if="serv.is_quick">Yes</td>
                    <td v-else>No</td>
                    <!--<td v-bind:value="getOrgName(serv.orgCode)"> {{ this.organizationName }} </td>-->
                    <!-- <td>
                        <router-link :to="{ name: 'services', params: { id: serv._id } }" class="btn btn-success">
                            Edit</router-link>
                        <button @click.prevent="deleteEmployee(serv._id)" class="btn btn-danger mx-2">Delete</button>
                    </td> -->
                </tr>
                <!-- <router-link :to="{ name: 'addOrganization' }" class="btn btn-success">Add new</router-link> -->
            </tbody>
        </table>

    </div>
    </div>
    

</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            services: [],
            search1:'',
            filter: 'all'
            // ,
            // organizations: [],
            // organizationName: ""
        }
},

    created() {
        // Get employees from backend assign to employees data object.
        // Uses two way binding to populate into the UI fields
        let apiURL = 'http://localhost:3001/services'
        axios.get(apiURL).then(res => { 
            this.services = res.data;
        }).catch(error => {
            console.log(error)
        });

        // let apiURL2 = 'http://localhost:3001/organizations'
        // axios.get(apiURL2).then(res => {
        //     this.organizations = res.data
        // }).catch(error => {
        //     console.log(error)
        // });
    },
    
    computed:{
        filteredServices: function(){
            return this.services.filter((serv) => {
                if (serv.service_description.toLowerCase().match(this.search1.toLowerCase())){
                    return true
                } else if ((serv.is_quick == 0 && this.search1.toLowerCase() == 'no') || 
                            (serv.is_quick == 1 & this.search1.toLowerCase() == 'yes') ){
                    return true;
                }
            });
        },

        completedServicesFilter: function(){
            return this.filteredServices.filter((serv) => {
                if (this.filter == 'all'){
                    if (serv.is_quick == 0 || serv.is_quick == 1){
                        return true
                    }
                } else if (this.filter == 'isquick') {
                    if (serv.is_quick == 1){
                        return true
                    }
                } else if (this.filter == 'notquick') {
                    if (serv.is_quick == 0){
                        return true
                    }
                }
            });
        }
    }
    ,

    methods: {
        // Method used for deleting an employee by using _id value (using id as alias)
        deleteService(id) {
            let apiURL = `http://localhost:3001/del/services/${id}`;
            // let indexOfArrayItem = this.employees.findIndex(i => i._id === id);
            // Get user confirmation before deleting
            if (window.confirm("Do you really want to delete this service?")) {
                axios.put(apiURL).then(() => {
                    // this.employees.splice(indexOfArrayItem, 1);
                    this.$router.go()   
                }).catch(error => {
                    console.log(error)
                });
            }
        }
        
        // ,
        // getOrgName(id) {
        //     for (let i = 0; i < this.organizations.length; i++) {
        //         if (id == this.organizations[i]._id) {
        //             this.organizationName = this.organizations[i].orgName
        //         }
        //     }
        // }
    }
}
</script>