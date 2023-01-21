<template>
    <!--<ExChildComp/>-->
  	<div class="row justify-content-center">
      <div class="col-md-6">
					<p class="fs-1 text-center" >Edit Employee</p>
          <form @submit.prevent="handleSubmitForm">

                <!--
                <div class="input-group mb-3">
                    <label class="input-group-text" for="inputGroupSelect01">Select a Profile</label>
                    <select @change="updateUser($event)" class="form-select" id="inputGroupSelect01" v-model="client_id">
                        <option selected disabled>Choose...</option>
                        <option v-for="client in clientNames" :key="client._id" v-bind:value="client._id">
                            {{client.firstName}} {{client.lastName}}
                        </option>
                    </select>
                </div>
            </div>
            -->
            
<p></p>
<p></p>
<p></p>
<p></p>
<h5 class="text-center">Name</h5>
                <div class="form-group">
                    <label>First Name*</label>
                    <input type="text" class="form-control" v-model="this.viewEmployees[0].e_firstname" required>
                </div>

                <div class="form-group">
                    <label>Last Name*</label>
                    <input type="text" class="form-control" v-model="this.viewEmployees[0].e_lastname" required>
                </div>
<p></p>
<p></p>

<h5 class="text-center">Contact Information</h5>
                <div class="form-group-indent">
                    <label>Home Phone*</label>
                    <input type="phone" class="form-control" v-model="this.viewEmployees[0].homephone" v-mask="['(###) ###-####']" required>
                </div>
                
                <div class="form-group">
                    <label>Cell Phone</label>
                    <input type="phone" class="form-control" v-model="this.viewEmployees[0].cellphone" v-mask="['(###) ###-####']" >
                </div>

<p></p>
<p></p>
                <!-- ////new -->
                <div class="form-group">
                <h5 class="text-center">Address Information</h5>
										<label>Address*</label>
                    <input type="text" class="form-control" v-model="this.viewEmployees[0].address" required>
                </div>
                
                <div class="form-group">
                    <label>Suite Num</label>
                    <input type="text" class="form-control" v-model="this.viewEmployees[0].suite_num">
                </div>
                
                <div class="form-group">
                    <label>City*</label>
                    <input type="text" class="form-control" v-model="this.viewEmployees[0].city" required>
                </div>
                <div class="form-group">
                    <label>State*</label>
                    <input type="text" class="form-control" v-model="this.viewEmployees[0].state" required>
                </div>
                
                <div class="form-group">
                    <label>Zipcode*</label>
                    <input type="text" class="form-control" v-model="this.viewEmployees[0].zipcode" required >
                </div>

                <!-- //// -->
<p></p>
<p></p>
                <div class="form-group">
                    <h5 class="text-center">Job Information</h5>
                    <div class="input-group mb-3">
                        <label class="input-group-text" for="inputGroupSelect01">Options</label>
                        <select class="form-select" id="inputGroupSelect01" v-model="this.viewEmployees[0].employee_type_id">
                            <option selected disabled>Choose...</option>
                            <option v-for="employee_type in employee_types" :key="employee_type._id" v-bind:value="employee_type.employee_type_id">
                                {{ employee_type.type_desc }}
                            </option> 
                        </select>
                    </div>
                </div>


                <div class="form-group">
                    <label>Salary</label>
                    <input type="integer" class="form-control" v-model="this.viewEmployees[0].paid_salary" required>
                </div>


                <div class="form-group">
                    <label>Shop Location</label>
                    <div class="input-group mb-3">
                        <label class="input-group-text" for="inputGroupSelect01">Options</label>
                        <select class="form-select" id="inputGroupSelect01" v-model="this.viewEmployees[0].shop_id" required>
                            <option selected disabled>Choose...</option>
                            <option v-for="shop in shops" :key="shop._id" v-bind:value="shop.shop_id">
                                {{ shop.address + ' | ' + shop.city + ' | ' + shop.state + ' | ' + shop.zipcode          
                                }}
                            </option>
                        </select>
                    </div>
                </div>


                <button class="btn btn-success mt-3">Submit</button>
              
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
                // organizations: {},
                viewEmployees: [],
            // initialize emptypes data object so dropdown box can be populated

                employee_types: {},
            
            // initialize shops data object so dropdown box can be populated
            shops: {}
            }
        },
        created() {
            // let apiURL = `http://localhost:3001/organizations`;
            // axios.get(apiURL).then((res) => {
            //     this.organizations = res.data;
            // });

            let apiURL2 = `http://localhost:3001/employees/${this.$route.params.id}`;
            axios.get(apiURL2).then((res) => {
                this.viewEmployees = res.data;
            });
            
			let apiURL3 = `http://localhost:3001/emptype`;
			axios.get(apiURL3).then((res) => {
				this.employee_types = res.data;
                console.log(this.employee_types)

			});


			let apiURL4 = `http://localhost:3001/shops`;
			axios.get(apiURL4).then((res) => {
				this.shops = res.data;
                console.log(this.shops)

			});




        },
        methods: {
            handleSubmitForm() {
                let apiURL = `http://localhost:3001/employees/${this.$route.params.id}`;
                axios.put(apiURL, this.viewEmployees).then((res) => {
                    this.$router.push('/')
                }).catch(error => {
                    console.log(error)
                });
            // },
            // updateUser(e) {
            //     let apiURL = `http://localhost:3001/clients/${e.target.value}`;
            //     axios.get(apiURL).then((res) => {
            //     this.client = res.data;
            //     this.client_id = e.target.value
            //     console.log(this.client)
            //     this.seen=true;
            // })
            }
        }  
    }
</script>

<style>


body { 
  background-color:rgb(255, 255, 255) !important
}
</style>