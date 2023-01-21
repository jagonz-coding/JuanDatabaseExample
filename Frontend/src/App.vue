<template>
  <div>
    <nav class="navbar navbar-expand-sm navbar-light bg-warning">
      <div class="container-fluid">
        <a class="navbar-brand float-left" href="/">Reyes Auto Electric & Mechanic</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDarkDropdown"
          aria-controls="navbarNavDarkDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDarkDropdown">
          <ul class="nav navbar-nav mr-auto">

            <!--About-->
            <li class="nav-item">
              <router-link class="nav-link" to="/">User Manual</router-link>
            </li>

            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button"
                data-bs-toggle="dropdown" aria-expanded="false">
                Customers
              </a>
              <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
                <router-link class="dropdown-item" to="/customers">View All</router-link>
                <router-link class="dropdown-item" to="/addCustomer">Add New</router-link>
              </ul>
            </li>

            <!--Vehicles Dropdown-->
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button"
                data-bs-toggle="dropdown" aria-expanded="false">
                Vehicles
              </a>
              <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
                <router-link class="dropdown-item" to="/vehicles">View All</router-link>
                <router-link class="dropdown-item" to="/addVehicle">Add New</router-link>
              </ul>
            </li>

            <!--Repairs-->
						<li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button"
                data-bs-toggle="dropdown" aria-expanded="false">
                Repairs
              </a>
              <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
                <router-link class="dropdown-item" to="/repairs">View All</router-link>
                <router-link class="dropdown-item" to="/addRepair">Add New</router-link>
              </ul>
            </li>


            <!--Employees Dropdown-->
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button"
                data-bs-toggle="dropdown" aria-expanded="false">
                Employees & More
              </a>
              <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
                <router-link class="dropdown-item" to="/employees">Employees - View All</router-link>
                <router-link class="dropdown-item" to="/addEmployee">Employees - Add New</router-link>
								<div class="dropdown-divider"></div>
                <router-link class="dropdown-item" to="/empTypes">Employee Types - View All</router-link>
                <router-link class="dropdown-item" to="/createEmpTypes">Employees Types - Add New</router-link>
                <div class="dropdown-divider"></div>
                <router-link class="dropdown-item" to="/shops">Shops - View All</router-link>
                <router-link class="dropdown-item" to="/addShop">Shops - Add New</router-link>
								<div class="dropdown-divider"></div>
								<router-link class="dropdown-item" to="/services">Services - View All</router-link>
                <router-link class="dropdown-item" to="/addService">Services - Add New</router-link>
              </ul>
            </li>


            <!-- Reports -->
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button"
                data-bs-toggle="dropdown" aria-expanded="false">
                Reports
              </a>
              <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
                <router-link class="dropdown-item" to="/reportEmpAssignedData">Employee Assignments</router-link>
								<router-link class="dropdown-item" to="/reportCompletedRepairs">Completed Repairs</router-link>
								<router-link class="dropdown-item" to="/reportIncompleteRepairs">Incomplete Repairs</router-link>
								<router-link class="dropdown-item" to="/repairDistrobution">Repair Distribution</router-link>
								<router-link class="dropdown-item" to="/vehicleDistrobution">Vehicle Distribution</router-link>
                <router-link class="dropdown-item" to="/vehiclesChkdInReportData">Vehicles Checked IN</router-link>
                <router-link class="dropdown-item" to="/vehiclesChkdOUTReportData">Vehicles Checked OUT</router-link>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <!-- Router view (This is the content below the navigation pane that actually changes) -->
    <div class="container mt-5">
      <RouterView></RouterView>
    </div>
  </div>
</template>

<style>
@import "./assets/base.css";

body {
  background-color: rgb(255, 255, 255) !important
}
.dropdown-divider{
	background-color:rgb(255, 255, 255)
}
</style>
