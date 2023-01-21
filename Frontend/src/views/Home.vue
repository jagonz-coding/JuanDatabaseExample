
<template>
  <div class="text-justify">
    <p class="fs-1 text-center">Parallax</p>
    <h5 class="text-muted mb-5">User Manual</h5>
		<h7>This page is meant to give users a high-level overview of how to use the application. Please click the link for a <a href="Parallax_ApplicationUserManual.pdf" target="_blank" >detailed user manual</a></h7>
		<p></p>
    <div class="accordion" id="accordionExample">

			<div class="accordion-item">
				<h2 class="accordion-header" id="headingOne">
					<button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
						Customers
					</button>
				</h2>
				<div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
					<div class="accordion-body">
						<strong>Manage customers in one place. </strong> 
						The customers view allows users to manage customers in a central location by providing a means of adding new customers as well update information to existing ones.
						<li>
							<i>All Customers:</i> View, search, and edit all existing customers
						</li>
						<li>
							<i>Create Customers:</i>  A form to add a new customer. Upon submitting, user will be re-routed to the "Add Vehicle" form for further information
						</li>
					</div>
				</div>
			</div>

			<div class="accordion-item">
				<h2 class="accordion-header" id="headingTwo">
					<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
						Vehicles
					</button>
				</h2>
				<div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
					<div class="accordion-body">
						<strong>Manage customer vehicles in one place. </strong> 
						The Vehicles view allows users to manage customer vehicles in a central location by providing a means of adding new vehicles as well update information to existing ones.
						<li>
							<i>View All:</i> View, search, and edit all existing vehicles
						</li>
						<li>
							<i>Add Vehicle:</i>  A form to add a new vehicle. The user will be required to find an existing customer before a vehicle can be added
						</li>
					</div>
				</div>
			</div>

			<div class="accordion-item">
				<h2 class="accordion-header" id="headingThree">
					<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
						Repairs
					</button>
				</h2>
				<div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
					<div class="accordion-body">
						<strong>Manage vehicle repairs in one place. </strong> 
						The Repairs view allows users to manage both completed and non-completed repairs for Reyes Auto.
						<li>
							<i>Repair History:</i> View, search, and edit all existing repairs. Searches can be made by customer name, phone number, repair type, etc
						</li>
						<li>
							<i>New Vehicle:</i> This form can be used to add the details of a new repair requested by the customer or advised by the mechanic
						</li>
					</div>
				</div>
			</div>

			<div class="accordion-item">
				<h2 class="accordion-header" id="headingFour">
					<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
						Employees
					</button>
				</h2>
				<div id="collapseFour" class="accordion-collapse collapse" aria-labelledby="headingFive" data-bs-parent="#accordionExample">
					<div class="accordion-body">
						<strong>Manage user information. </strong> 
						The Employees view allows users to manage their information as well as add new hires. Currently, the application does not support login functionality, so all user data is accessible. This will change in a future release.
						<li>
							<i>View all:</i> View, search, and edit all existing employees. Searches can be made by employee name, phone number, occupation, etc
						</li>
						<li>
							<i>Add Vehicle:</i> This form can be used to add the details of a new employee
						</li>
					</div>
				</div>
			</div>

			<div class="accordion-item">
				<h2 class="accordion-header" id="headingFive">
					<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
						Services
					</button>
				</h2>
				<div id="collapseFive" class="accordion-collapse collapse" aria-labelledby="headingFive" data-bs-parent="#accordionExample">
					<div class="accordion-body">
						<strong>Manage Services. </strong> 
						The Services view allows users to manage services performed by Reyes Auto.
						<li>
							<i>View All:</i> View, search, and edit all existing services. Searches can be made by service description or the "quick service" tag
						</li>
						<li>
							<i>New Service:</i> This form can be used to add the details of a new service
						</li>
					</div>
				</div>
			</div>

			<div class="accordion-item">
				<h2 class="accordion-header" id="headingSix">
					<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
						Reports
					</button>
				</h2>
				<div id="collapseSix" class="accordion-collapse collapse" aria-labelledby="headingSix" data-bs-parent="#accordionExample">
					<div class="accordion-body">
						<strong>View Custom Reports. </strong> 
						The Reports view allows users to see custom reports and insights made specifically for Reyes Auto
						<li>
							<i>Employeees Assignment:</i> View currently assigned repairs that need to be worked on
						</li>
						<li>
							<i>Completed Repairs:</i> View all completed Repiars
						</li>
						<li>
							<i>Incomplete Repairs:</i> View all incomplete Repiars
						</li>
						<li>
							<i>Repair Distrobution:</i> View the frequency distribution of repairs by repair type
						</li>
						<li>
							<i>Vehicle Distribution:</i> View the frequency distribution of repairs by vehicle manufacturer
						</li>
						<li>
							<i>Vehicles Checked In:</i> View vehicles checked in within a certain date
						</li>
						<li>
							<i>Vehicles Checked Out:</i> View vehicles checked out within a certain date
						</li>
					</div>
				</div>
			</div>

		</div>

  </div>
</template>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.img-responsive{
  display: block;
  max-width: 10%;
  height: auto;
}

li{
padding-left:20px;
}
</style>