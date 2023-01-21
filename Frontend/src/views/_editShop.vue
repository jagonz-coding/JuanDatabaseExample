<template>
    <!--Add Customer form -->
    <div class="row justify-content-center">
        <div class="col-md-6">
						<p class="fs-1 text-center" >Edit Shop</p>
            <form @submit.prevent="handleSubmitForm">

                <div class="form-group">
                    <label>Address*</label>
                    <input type="text" class="form-control" v-model="this.viewShop[0].address" required>
                </div>

                <div class="form-group">
                    <label>City*</label>
                    <input type="text" class="form-control" v-model="this.viewShop[0].city" required>
                </div>

                <div class="form-group">
                    <label>State*</label>
                    <input type="text" class="form-control" v-model="this.viewShop[0].state" required>
                </div>

                <div class="form-group">
                    <label>Zipcode*</label>
                    <input type="text" class="form-control" v-model="this.viewShop[0].zipcode" required>
                </div>

                <button class="btn btn-success mt-3">Update</button>

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
            viewShop: []
        }
    },
    created() {
        let apiURL = `http://localhost:3001/shops/${this.$route.params.id}`
        axios.get(apiURL).then(res => {
            this.viewShop = res.data
        }).catch(error => {
            console.log(error)
        })
    },
    methods: {
        // Submit entered in data and post to backend API
        handleSubmitForm() {
            let apiURL2 = `http://localhost:3001/shop/${this.$route.params.id}`;
            axios.put(apiURL2, this.viewShop).then((res) => {
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