<template>
<div>
  <p class="fs-1 text-center">All Employees</p>
    

  <div class="d-flex justify-content-start">
    <!-- <form @submit.prevent="handleSubmitForm"> -->
                <input type="text" placeholder="Search all..." aria-label="First name" class="form-control" v-model="search1" required>
                <button class="btn btn-outline-secondary">Search</button>
        <!-- </form> -->
    </div>
    <p></p>

    <div class="d-flex justify-content-start">
            <div class="form-check form-check-inline">
                <input class="form-check-input" v-model="filter" type="radio" name="filter" id="all" value="all" checked>
                <label class="form-check-label" for="all">All</label>
            </div>
        </div>
        <p></p>


        <div class="table-responsive">
            <table class="table table-striped table-hover" >
            <thead class="table table-secondary">
                <tr>
                    <th>Edit</th>
                    <th>Delete</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Home Phone</th>
                    <th>Cell Phone</th>
                    <th>Home Address</th>
                    <th>Occupation</th>
                    <th>Shop Location</th>
                </tr>
            </thead>
            <tbody>
                <!-- https://stackoverflow.com/questions/52099089/how-to-get-nested-json-data-in-vue-js-->
                <!-- https://stackoverflow.com/questions/41424354/vue-js-cannot-access-to-nested-properties-of-data-object-->


                <!-- handles the searchbar filter named completedemployeesfilter -->

                <tr v-for="emp in completedEmployeesFilter" :key="emp.employee_id">
                    
                    <td> 
                        <router-link :to="{ name: 'editEmployee', params: { id: emp.employee_id } }" class="btn btn-success">
                            Edit</router-link>
                    </td>

                    <!-- delete button -->
                    <td><button @click.prevent="deleteEmployee(emp.employee_id)" class="btn btn-danger mx-2">Delete</button></td>

                    <!-- table headings -->

                    <td>{{ emp.e_firstname }}</td>
                    <!-- <td v-if="emp.empDetails.firstName">{{ emp.empDetails.firstName }}</td> -->
                    <td>{{ emp.e_lastname }}</td>
                    <td>{{ emp.homephone }}</td>
                    <td>{{ emp.cellphone }}</td> 
                    <td>{{ emp.address + ', ' + emp.city + ', ' + emp.state + ' '+ emp.zipcode}}</td>          
                                    
                    <td>{{ emp.etype_desc }}</td>              
                    <td>{{ emp.saddress + ', ' + emp.scity + ', ' + emp.sstate + ' '+ emp.szipcode}}</td>          
                    <!-- <td>{{ emp.employee_type_id }}</td>              
                    <td>{{ emp.shop_id }}</td> -->
                    <!--
                    <td v-bind:value="getShopName(emp.address)"> {{ this.address }} </td>
                    <td>
                        <router-link :to="{ name: 'editEmployees', params: { id: emp._id } }" class="btn btn-success">
                            Edit</router-link>
                        <button @click.prevent="deleteEmployee(emp._id)" class="btn btn-danger mx-2">Delete</button>
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

            // employee array holds the data fetched from database
            employees: [],
            // search 1 holds the user input search data
            search1: '',
            // handles the filtering option that selects all records from database table
            filter: 'all'
            
            // ,
            
            // employee_type:{},
            
            // shops:{}
        }
    },
    created() {
        // Get employees from backend assign to employees data object.
        // Uses two way binding to populate into the UI fields
        
        let apiURL = 'http://localhost:3001/employees'
        axios.get(apiURL).then(res => {
            this.employees = res.data
        }).catch(error => {
            console.log(error)
        });

        // fetches data from employee type to fill in array so correct employee type title displays in view table
        
        // let apiURL2 = `http://localhost:3001/emptype`;
        // axios.get(apiURL2).then((res) => {
        //     this.employee_type = res.data;
        //     console.log(this.employee_type)
        // });

        // // Get shop location data and assign to shops data object
        // let apiURL3 = `http://localhost:3001/shops/`;
        // axios.get(apiURL3).then((res) => {
        //     this.shops = res.data;
        //     console.log(this.shops)
        // });

        // let apiURL2 = 'http://localhost:3001/organizations'
        // axios.get(apiURL2).then(res => {
        //     this.organizations = res.data
        // }).catch(error => {
        //     console.log(error)
        // });
    },


    computed:{

        allEmployeesFilter: function(){
            return this.employees.filter((emp) => {
                if (emp.e_firstname.toLowerCase().match(this.search1.toLowerCase())){
                    return true
                } else if (emp.e_lastname.toLowerCase().match(this.search1.toLowerCase())){
                    return true
                } else if (emp.homephone.toLowerCase().match(this.search1.toLowerCase())){
                    return true
                } else if (emp.cellphone.toLowerCase().match(this.search1.toLowerCase())){
                    return true   
                } else if (emp.employee_type_id == this.search1){
                    return true
                }
                else if (emp.shop_id == this.search1){
                    return true
                }
            });
        },
       completedEmployeesFilter: function(){
            console.log(this.filter)
            return this.allEmployeesFilter.filter((emp) => {
                if (this.filter == 'all'){
                    return true
                }
            });
        }
    }
    ,



    methods: {
       // Method used for deleting an employee by using _id value (using id as alias)
       deleteEmployee(id) {
            let apiURL = `http://localhost:3001/del/employees/${id}`;
            // let indexOfArrayItem = this.employees.findIndex(i => i._id === id);
            // Get user confirmation before deleting
            if (window.confirm("Do you really want to delete this employee?")) {
                axios.put(apiURL).then(() => {
                    // this.employees.splice(indexOfArrayItem, 1);
                    this.$router.go()   
                }).catch(error => {
                    console.log(error)
                });
            }
        }
        // ,
        // getShopAddress(id) {
            //     for (let i = 0; i < this.address.length; i++) {
        //         if (id == this.address[i]._id) {
        //             this.address = this.shops[i].address
        //         }
        //     }
        // }
    }
}
</script>