<template>
    <!--Add Customer form -->
    <div class="row justify-content-center">
        <div class="col-md-6">
						<p class="fs-1 text-center" >Add Shop</p>
            <form @submit.prevent="handleSubmitForm">

                <div class="form-group">
                    <label>Address*</label>
                    <input type="text" class="form-control" v-model="shop.address" required>
                </div>

                <div class="form-group">
                    <label>City*</label>
                    <input type="text" class="form-control" v-model="shop.city" required>
                </div>

                <div class="form-group">
                    <label>State*</label>
                    <input type="text" class="form-control" v-model="shop.state" required>
                </div>

                <div class="form-group">
                    <label>Zipcode*</label>
                    <input type="number" class="form-control" v-model="shop.zipcode" required>
                </div>

                <button class="btn btn-success mt-3">Create</button>

            </form>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { mask } from 'vue-the-mask';
export default {
    directives: { mask },
    data() {
        return {
            // Initialize client data object to hold empty data (e.g., so UI fields appear empty)
            shop: {}
        }
    },
    methods: {
        // Submit entered in data and post to backend API
        handleSubmitForm() {
            let apiURL = 'http://localhost:3001/shops/';
            axios.post(apiURL, this.shop).then((res) => {
                this.$router.push('/shops')
            }).catch(error => {
                console.log(error)
            });
        }
    }
}
</script>

<style>
body {
    background-color: rgb(255, 255, 255) !important
}
</style>