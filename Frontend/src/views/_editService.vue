<template>
    
    <!--Add Customer form -->
    <div class="row justify-content-center">
        <div class="col-md-6">
						<p class="fs-1 text-center" >Edit Service</p>
            <form @submit.prevent="handleSubmitForm">

                <div class="form-group">
                    <label>Service Description*</label>

                    
                    <input type="text" class="form-control" v-model="this.viewServices[0].service_description" required>
                </div>

                <p></p>

                <div class="form-group">
                    <label>Is it Quick?*</label>
                    <div class="input-group mb-3">
                        <label class="input-group-text" for="inputGroupSelect01">Options</label>
                        <select class="form-select" id="inputGroupSelect01" v-model="this.viewServices[0].is_quick" required>
                            <option v-bind:value=1>Yes</option>
                            <option v-bind:value=0>No</option>
                        </select>
                    </div>
                </div>

                <button class="btn btn-success mt-3">Update</button>

            </form>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { mask } from 'vue-the-mask';
// testing const this
export default {
    directives: { mask },
    data() {
        return {
            // Initialize client data object to hold empty data (e.g., so UI fields appear empty)
            
            viewServices: []

            // ,
            // service_description: '',
            // is_quick: 0
            

        };
    }
    ,

    created() 
    {
         // Get organizations data and assign to organizations data object
        // let apiURL = `http://localhost:3001/services/${this.$route.params.id}`
        // console.log(this.$route.params.id);
        // // console.log(viewServices);
        // axios.get(apiURL).then(res => {
            
        //     //this.viewServices = res.data
        //     this.service_description = res.data[0].service_description;
        //     this.is_quick = res_data[0].is_quick;
        //     console.log(this.viewServices);
        // }).catch(error => {
        //     console.log(error)
        // })

        let apiURL = `http://localhost:3001/services/${this.$route.params.id}`
        //console.log(this.$route.params.id);
        // console.log(viewServices);
        axios.get(apiURL).then(res => {            
            this.viewServices = res.data
            // this.viewServices = viewServices;
            // this.service_description = viewServices.service_description;
            // this.is_quick = viewServices.is_quick;
            console.log(this.viewServices[0]);
        }).catch(error => {
            console.log(error)
        })
    
        // // Get organizations data and assign to organizations data object
        // let apiURL = `http://localhost:3001/services/${this.$route.params.id}`
        // console.log(this.$route.params.id);
        // axios.get(apiURL).then(res => {
            
        //     this.services = res.data
        // }).catch(error => {
        //     console.log(error)
        // })
    }
,

    methods: 
    {
        // Submit entered in data and post to backend API
        handleSubmitForm() 
        {
            let apiURL2 = `http://localhost:3001/services/${this.$route.params.id}`;
            axios.put(apiURL2, this.viewServices).then((res) => {
                this.$router.push('/')
            }).catch(error => {
                console.log(error)
            });
        }
        
        // {
        //     let apiURL = `http://localhost:3001/services/${this.$route.params.id}`
        //     axios.put(apiURL, this.services).then((res) => {
        //         this.$router.push('/')
        //     }).catch(error => {
        //         console.log(error)
        //     });
        // }
    }




    // {
    //     // Submit entered in data and post to backend API
    //     handleSubmitForm() {
    //         let apiURL = `http://localhost:3001/addService`;
    //         axios.put(apiURL, this.services).then((res) => {
    //             this.$router.push('/')
    //         }).catch(error => {
    //             console.log(error)
    //         });
    //     }
    // }
}
</script>

<style>
body {
    background-color: rgb(255, 255, 255) !important
}
</style>