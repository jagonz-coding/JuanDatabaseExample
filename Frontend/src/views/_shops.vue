<template>
    <div class="row justify-content-center">
        <p class="fs-1 text-center" >Shops</p>

        <table class="table table-striped table-hover" >
            <thead class="table table-secondary">
                <tr>
                    <th>Edit</th>
                    <th>Delete</th>
                    <th>Address</th>
                    <th>State</th>
                    <th>City</th>
                    <th>Zipcode</th>
                </tr>
            </thead>
            <tbody>
                <!-- https://stackoverflow.com/questions/52099089/how-to-get-nested-json-data-in-vue-js -->
                <!-- https://stackoverflow.com/questions/41424354/vue-js-cannot-access-to-nested-properties-of-data-object -->
                <tr v-for="shop in shops" :key="shop.shop_id">
                    <td>
                        <router-link :to="{ name: 'editShop', params: { id: shop.shop_id } }" class="btn btn-success">
                            Edit</router-link>
                    </td>
                    <td><button @click.prevent="deleteShop(shop.shop_id)" class="btn btn-danger mx-2">Delete</button></td>
                    <td>{{ shop.address }}</td>
                    <td>{{ shop.city }}</td>
                    <td>{{ shop.state }}</td>
                    <td>{{ shop.zipcode }}</td>
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
            shops: []
        }
    },
    created() {
        // Get employees from backend assign to employees data object.
        // Uses two way binding to populate into the UI fields
        let apiURL = 'http://localhost:3001/shops/'
        axios.get(apiURL).then(res => {
            this.shops = res.data
        }).catch(error => {
            console.log(error)
        });
    },
    methods: {
        // Method used for deleting an employee by using _id value (using id as alias)
        deleteShop(id) {
            let apiURL2 = `http://localhost:3001/del/shops/${id}`;
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