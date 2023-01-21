<template>
	<div class="container">

		<div class="row">
			<p class="fs-1 text-center" >Update Repair</p>
		</div>

      	<form @submit.prevent="handleUpdateForm">
        	<div class="row">
				<div class="col">
					<label>Customer</label>
					<input type="text" class="form-control" v-model="this.customer_name" disabled>
				</div>
				<div class="col">
					<label>Select Vehicle*</label>
					<div class="input-group mb-3">
						<label class="input-group-text" for="inputGroupSelect01">Options</label>
						<select class="form-select" id="inputGroupSelect01" v-model="this.repairInformation.vehicle_id">
							<option disabled>Choose...</option>
							<option v-for="vehicle in customerVehicles" :key="vehicle.vehicle_id" v-bind:value="vehicle.vehicle_id">
								<p> {{ vehicle.year + ' ' + vehicle.make + ' ' + vehicle.model }}</p>
								<!--<p v-else> {{org.orgName}}</p>-->
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
								<!--<p v-else> {{org.orgName}}</p>-->
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
								<!--<p v-else> {{org.orgName}}</p>-->
							</option>
						</select>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col">
					<label>Checkin Date*</label>
					<div class="input-group mb-3">
						<input class="form-control" type="date" id="DOB" name="DOB" min="1979-01-01" v-model="this.checkin_date" required>
					</div>
				</div>
				<div class="col">
					<label>Checkout Date</label>
					<div class="input-group mb-3">
						<input class="form-control" type="date" id="DOB" name="DOB" min="1979-01-01" v-model="this.checkout_date">
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col">
					<div class="form-check form-check-inline">
						<input class="form-check-input" type="checkbox" id="flexCheckDefault" v-model="this.service_authorized">
						<label class="form-check-label" for="flexCheckDefault">
							Service Authorized?
						</label>
					</div>
					<div class="form-check form-check-inline">
						<input class="form-check-input" type="checkbox" id="flexCheckDefault" v-model="this.service_complete">
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
						<textarea class="form-control" aria-label="With textarea" v-model="this.mechanic_notes"></textarea>
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
			repairInformation: {},
			employees: {},
			customerVehicles: {},
			services: {},
			checkin_date: null,
			checkout_date: null,
			customer_name: ''
		};
	},
	created() {
		let apiURL = `http://localhost:3001/repair_history/${this.$route.params.id}`;
		axios.get(apiURL).then((res) => {
			this.repairInformation = res.data[0];
			this.checkin_date = new Date(this.repairInformation.checkin_date).toISOString().slice(0,10);
			if (this.repairInformation.checkout_date != null) {
				this.checkout_date = new Date(this.repairInformation.checkout_date).toISOString().slice(0,10);
			}
			this.customer_name = this.repairInformation.firstname + ' ' + this.repairInformation.lastname;
			this.employee_name = this.repairInformation.e_firstname + ' ' + this.repairInformation.e_lastname;
			this.mechanic_notes = this.repairInformation.mechanic_notes;
			if (this.repairInformation.service_authorized == 1) {
				this.service_authorized = true
			} else {
				this.service_authorized = false
			}
			if (this.repairInformation.service_complete == 1) {
				this.service_complete = true
			} else {
				this.service_complete = false
			}

			
			let apiURL2 = `http://localhost:3001/cust_vehicles/${this.repairInformation.customer_id}`;
			axios.get(apiURL2).then((res) => {
				this.customerVehicles = res.data;
			});
		});
		
		let apiURL3 = `http://localhost:3001/employeesAll`;
		axios.get(apiURL3).then((res) => {
			this.employees = res.data;
		});

		let apiURL4 = `http://localhost:3001/services`;
		axios.get(apiURL4).then((res) => {
			this.services = res.data;
		});

	},
	methods: {
		handleUpdateForm() {
			let apiURL = `http://localhost:3001/editRepair/${this.$route.params.id}`;
			this.repairInformation.checkin_date = this.checkin_date;
			this.repairInformation.checkout_date = this.checkout_date;
			this.repairInformation.service_authorized = this.service_authorized;
			this.repairInformation.service_complete = this.service_complete;
			this.repairInformation.mechanic_notes = this.mechanic_notes;
			axios
				.put(apiURL, this.repairInformation)
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