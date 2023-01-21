<template>
    <div class="row justify-content-center">
        <p class="fs-1 text-center" >Customers</p>

        <div class="d-flex justify-content-start">
            <input type="text" v-model="search1" placeholder="Search all fields" aria-label="First name" class="form-control" >
        </div>
        <p></p>
        <div class="d-flex justify-content-start">
            <div class="form-check form-check-inline">
                <input class="form-check-input" v-model="filter" type="radio" name="filter" id="all" value="all" checked>
                <label class="form-check-label" for="all">All</label>
            </div>
        </div>
        <p></p>

        <table class="table table-striped table-hover" >
            <thead class="table table-secondary">
                <tr>
                    <th>Edit</th>
                    <th>Delete</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Cellphone</th>
                    <th>Homephone</th>
                    <th>Workphone</th>
                    <th>Address</th>
                    <th>Suite #</th>
                    <th>City</th>
                    <th>State</th>
                    <th>Zipcode</th>
                </tr>
            </thead>
            <tbody>
                <!-- https://stackoverflow.com/questions/52099089/how-to-get-nested-json-data-in-vue-js -->
                <!-- https://stackoverflow.com/questions/41424354/vue-js-cannot-access-to-nested-properties-of-data-object -->
                <tr v-for="cust in allCustomersFilter" :key="cust.customer_id">
                    <td>
                        <router-link :to="{ name: 'editCustomer', params: { id: cust.customer_id } }" class="btn btn-success">
                            Edit</router-link>
                    </td>
                    <td><button @click.prevent="deleteCustomer(cust.customer_id)" class="btn btn-danger mx-2">Delete</button></td>
                    <td>{{ cust.firstname }}</td>
                    <!-- <td v-if="emp.empDetails.firstName">{{ emp.empDetails.firstName }}</td> -->
                    <td>{{ cust.lastname }}</td>
                    <td>{{ cust.email }}</td>
                    <td>{{ cust.cellphone }}</td>
                    <td>{{ cust.homephone }}</td>
                    <td>{{ cust.workphone }}</td>
                    <td>{{ cust.address }}</td>
                    <td>{{ cust.suite_num }}</td>
                    <td>{{ cust.city }}</td>
                    <td>{{ cust.state }}</td>
                    <td>{{ cust.zipcode }}</td>
                    <!-- <td v-bind:value="getOrgName(emp.orgCode)"> {{ this.organizationName }} </td> -->
                    <!-- <td>
                        <router-link :to="{ name: 'editEmployees', params: { id: emp._id } }" class="btn btn-success">
                            Edit</router-link>
                        <button @click.prevent="deleteEmployee(emp._id)" class="btn btn-danger mx-2">Delete</button>
                    </td> -->
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
            customers: [],
            search1: '',
            filter: 'all'
        }
    },
    created() {
        // Get employees from backend assign to employees data object.
        // Uses two way binding to populate into the UI fields
        let apiURL = 'http://localhost:3001/customer/'
        axios.get(apiURL).then(res => {
            this.customers = res.data
        }).catch(error => {
            console.log(error)
        });

        /*
        let apiURL2 = 'http://localhost:3001/organizations'
        axios.get(apiURL2).then(res => {
            this.organizations = res.data
        }).catch(error => {
            console.log(error)
        });
        */
    },
    computed:{
        customersFilter: function(){
            return this.customers.filter((cust) => {
                if        (cust.firstname.toLowerCase().match(this.search1.toLowerCase())){
                    return true
                } else if (cust.lastname.toLowerCase().match(this.search1.toLowerCase())){
                    return true
                } else if (cust.email.toLowerCase().match(this.search1.toLowerCase())){
                    return true
                } else if (cust.cellphone.toLowerCase().match(this.search1.toLowerCase())){
                    return true
                } else if (cust.homephone.toLowerCase().match(this.search1.toLowerCase())){
                    return true
                } else if (cust.workphone.match(this.search1.toLowerCase())){
                    return true
                }  else if (cust.address.toLowerCase().match(this.search1.toLowerCase())){
                    return true;
                } else if (cust.city.toLowerCase().match(this.search1.toLowerCase())){
                    return true;
                } else if (cust.state.toLowerCase().match(this.search1.toLowerCase())){
                    return true;
                } else if (cust.zipcode.toString().match(this.search1.toLowerCase())){
                    return true;
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
        // Method used for deleting an employee by using _id value (using id as alias)
        deleteCustomer(id) {
            let apiURL2 = `http://localhost:3001/del/customer/${id}`;
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