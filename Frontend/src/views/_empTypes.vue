<template>
    <div class="row justify-content-center">
        <p class="fs-1 text-center" >Employee Types</p>

        <table class="table table-striped table-hover" >
            <thead class="table table-secondary">
                <tr>
                    <th>Edit</th>
                    <th>Delete</th>
                    <th>Employee Description</th>
                    <th>Base Salary</th>
                </tr>
            </thead>
            <tbody>
                <!-- https://stackoverflow.com/questions/52099089/how-to-get-nested-json-data-in-vue-js -->
                <!-- https://stackoverflow.com/questions/41424354/vue-js-cannot-access-to-nested-properties-of-data-object -->
                <tr v-for="et in empTypes" :key="et.employee_type_id">
                    <td>
                        <router-link :to="{ name: 'editEmpTypes', params: { id: et.employee_type_id } }" class="btn btn-success">
                            Edit</router-link>
                    </td>
                    <td><button @click.prevent="deleteEmpType(et.employee_type_id)" class="btn btn-danger mx-2">Delete</button></td>
                    <td>{{ et.type_desc }}</td>
                    <td>{{ et.base_salary }}</td>
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
            empTypes: []
        }
    },
    created() {
        let apiURL = 'http://localhost:3001/emptype'
        axios.get(apiURL).then(res => {
            this.empTypes = res.data
        }).catch(error => {
            console.log(error)
        });

    },
    methods: {
        // Method used for deleting an employee by using _id value (using id as alias)
        deleteEmpType(id) {
            let apiURL2 = `http://localhost:3001/del/emptype/${id}`;
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