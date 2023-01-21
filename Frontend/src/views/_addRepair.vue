<template>
	<div class="container">

		<div class="row">
			<p class="fs-1 text-center" >New Repair</p>
		</div>
      	<form @submit.prevent="handleUpdateForm">
        	<div class="row">
				<div class="col">
					<label>Select Customer*</label>
					<div class="input-group mb-3">
						<label class="input-group-text" for="inputGroupSelect01">Options</label>
						<select class="form-select" id="inputGroupSelect01" v-model="this.repairInformation.selectedCustomer_id">
							<option disabled>Choose...</option>
							<option v-for="cust in customers" :key="cust.customer_id" v-bind:value="cust.customer_id">
								<p> {{ cust.firstname + ' ' + cust.lastname + ' | ' + cust.cellphone }}</p>
							</option>
						</select>
					</div>
				</div>
				<div class="col">
					<label>Select Vehicle*</label>
					<div class="input-group mb-3">
						<label class="input-group-text" for="inputGroupSelect01">Options</label>
						<select class="form-select" id="inputGroupSelect01" v-model="this.repairInformation.vehicle_id">
							<option disabled>Choose...</option>
							<option v-for="vehicle in customerVehicles" :key="vehicle.vehicle_id" v-bind:value="vehicle.vehicle_id">
								<p> {{ vehicle.year + ' ' + vehicle.make + ' ' + vehicle.model }}</p>
							</option>
						</select>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col">
					<label>Select Employee*</label>
					<div class="input-group mb-3">
						<label class="input-group-text" for="inputGroupSelect01">Options</label>
						<select class="form-select" id="inputGroupSelect01" v-model="this.repairInformation.employee_id">
							<option disabled>Choose...</option>
							<option v-for="emp in employees" :key="emp.employee_id" v-bind:value="emp.employee_id">
								<p> {{ emp.e_firstname + ' ' +emp.e_lastname }}</p>
							</option>
						</select>
					</div>
				</div>
				<div class="col">
					<label>Select Service*</label>
					<div class="input-group mb-3">
						<label class="input-group-text" for="inputGroupSelect01">Options</label>
						<select class="form-select" id="inputGroupSelect01" v-model="this.repairInformation.service_type_id">
							<option disabled>Choose...</option>
							<option v-for="service in services" :key="service.service_type_id" v-bind:value="service.service_type_id">
								<p> {{ service.service_description }}</p>
							</option>
						</select>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col">
					<label>Checkin Date*</label>
					<div class="input-group mb-3">
						<input class="form-control" type="date" id="DOB" name="DOB" min="1979-01-01" v-model="this.repairInformation.checkin_date" required>
					</div>
				</div>
				<div class="col">
					<label>Checkout Date</label>
					<div class="input-group mb-3">
						<input class="form-control" type="date" id="DOB" name="DOB" min="1979-01-01" v-model="this.repairInformation.checkout_date">
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col">
					<div class="form-check form-check-inline">
						<input class="form-check-input" type="checkbox" id="flexCheckDefault" v-model="this.repairInformation.service_authorized">
						<label class="form-check-label" for="flexCheckDefault">
							Service Authorized?
						</label>
					</div>
					<div class="form-check form-check-inline">
						<input class="form-check-input" type="checkbox" id="flexCheckDefault" v-model="this.repairInformation.service_complete">
						<label class="form-check-label" for="flexCheckDefault">
							Service Complete?
						</label>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col">
					<label>Employee Notes*</label>
					<div class="input-group mb-3">
						<textarea class="form-control" aria-label="With textarea" v-model="this.repairInformation.mechanic_notes"></textarea>
					</div>
				</div>
			</div>
			<button class="btn btn-success mb-3">Submit</button>
    	</form>
	</div>
</template>

<script>
import axios from "axios";
import { mask } from "vue-the-mask";

export default {
	directives: { mask },
	data() {
		return {
			repairInformation: {
				selectedCustomer_id: 0,
				vehicle_id: 0,
				employee_id: 0,
				service_type_id: 0,
				service_authorized: false,
				service_complete: false,
				checkin_date: null,
				checkout_date: null,
				mechanic_notes: ''
			},
			customers: {},
			employees: {},
			vehicles: [],
			services: {},
		};
	},
	created() {
		let apiURL = `http://localhost:3001/customer/`;
		axios.get(apiURL).then((res) => {
			this.customers = res.data;
		});
		
		let apiURL2 = `http://localhost:3001/vehicles`;
		axios.get(apiURL2).then((res) => {
			this.vehicles = res.data;
			console.log(this.vehicles)
		});

		let apiURL3 = `http://localhost:3001/employees`;
		axios.get(apiURL3).then((res) => {
			this.employees = res.data;
		});

		let apiURL4 = `http://localhost:3001/services`;
		axios.get(apiURL4).then((res) => {
			this.services = res.data;
		});

	},
	computed:{
		customerVehicles: function(){
			return this.vehicles.filter((vehicle) => {
					if (vehicle.customer_id == this.repairInformation.selectedCustomer_id){
							return true
					}
			});
	}

	},
	methods: {
		handleUpdateForm() {
			let apiURL = `http://localhost:3001/repair_history`;
			axios
				.post(apiURL, this.repairInformation)
				.then((res) => {
					this.$router.push("/repairs");
				})
				.catch((error) => {
					console.log(error);
				});
		},
	},
};
</script>