<template>
    <!--Add Customer form -->
    <div class="row justify-content-center">
        <div class="col-md-6">
						<p class="fs-1 text-center" >Edit Customer</p>
            <form @submit.prevent="handleSubmitForm">

                <div class="form-group">
                    <label>Employee Description*</label>
                    <input type="text" class="form-control" v-model="this.viewType[0].type_desc" required>
                </div>

                <div class="form-group">
                    <label>Base Salary*</label>
                    <input type="number" class="form-control" v-model="this.viewType[0].base_salary" required>
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
            viewType: []
        }
    },
    created() {
        let apiURL = `http://localhost:3001/emptype/${this.$route.params.id}`
        axios.get(apiURL).then(res => {
            this.viewType = res.data
        }).catch(error => {
            console.log(error)
        })
    },
    methods: {
        // Submit entered in data and post to backend API
        handleSubmitForm() {
            let apiURL2 = `http://localhost:3001/emptype/${this.$route.params.id}`;
            axios.put(apiURL2, this.viewType).then((res) => {
                this.$router.push('/empTypes')
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