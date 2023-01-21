import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import VehicleDistroChartView from '@/views/_reportVehicleDistribution.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Home view route
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/customers',
      name: 'showCustomers',

      component: () => import('../views/_customers.vue')
    },
    {
      path: '/addCustomer',
      name: 'createCustomer',
      component: () => import('../views/_createCustomer.vue')
    },
    {
      path: '/editCustomer',
      name: 'editCustomer',
      component: () => import('../views/_editCustomer.vue')
    },
    {
      path: '/vehicles',
      name: 'showVehicles',
      component: () => import('../views/_vehicles.vue')
    },
    {
      path: '/editVehicle',
      name: 'editVehicle',
      component: () => import('../views/_editVehicle.vue')
    },
    {
      path: '/addVehicle',
      name: 'addVehicle',
      component: () => import('../views/_createVehicle.vue')
    },
    {
      path: '/vehiclesChkdInReportData',
      name: 'vehiclesChkdInReportData',
      component: () => import('../views/_vehiclesChkdInReportData.vue')
    },
    {
      path: '/vehiclesChkdInReportView',
      name: 'vehiclesChkdInReportView',
      component: () => import('../views/_vehiclesChkdInReportView.vue')
    },
    {
      path: '/vehiclesChkdOUTReportData',
      name: 'vehiclesChkdOUTReportData',
      component: () => import('../views/_vehiclesChkdOUTReportData.vue')
    },
    {
      path: '/vehiclesChkdOUTReportView',
      name: 'vehiclesChkdOUTReportView',
      component: () => import('../views/_vehiclesChkdOUTReportView.vue')
    },
		{
			path: '/repairs',
			name: 'showRepairs',
			component: () => import('../views/_repairHistory.vue')
		},
		{
			path: '/editRepair:id',
			name: 'editRepair',
			component: () => import('../views/_editRepair.vue')
		},
		{
			path: '/addRepair',
			name: 'addRepair',
			component: () => import('../views/_addRepair.vue')
		},
		{
			path: '/employees',
			name: 'showEmployees',
			component: () => import('../views/_employees.vue')
		},
		{
			path: '/editEmployee',
			name: 'editEmployee',
			component: () => import('../views/_editEmployee.vue')
		},
    {
			path: '/empTypes',
			name: 'empTypes',
			component: () => import('../views/_empTypes.vue')
		},
		{
			path: '/editEmpTypes',
			name: 'editEmpTypes',
			component: () => import('../views/_editEmpTypes.vue')
		},
    {
			path: '/createEmpTypes',
			name: 'createEmpTypes',
			component: () => import('../views/_createEmpTypes.vue')
		},
		{
			path: '/services',
			name: 'services',
			component: () => import('../views/_Services.vue')
		},
    {
      path: '/addService',
      name: 'createService',
      component: () => import('../views/_createService.vue')
    },
    {
      path: '/addEmployee',
      name: 'createEmployee',
      component: () => import('../views/_createEmployee.vue')
    },
    
    {
      path: '/editService',
      name: 'editService',
      component: () => import('../views/_editService.vue')
    },
    {
      path: '/vehicleDistrobution',
      name: 'vehicleDistrobution',
      component: () => import('../views/_reportVehicleDistribution.vue')
    },
    {
      path: '/repairDistrobution',
      name: 'repairDistrobution',
      component: () => import('../views/_reportRepairDistribution.vue')
    },
    {
      path: '/shops',
      name: 'shops',
      component: () => import('../views/_shops.vue')
    },
    {
      path: '/editShop',
      name: 'editShop',
      component: () => import('../views/_editShop.vue')
    },
    {
      path: '/addShop',
      name: 'addShop',
      component: () => import('../views/_addShop.vue')
    },
    {
      path: '/reportCompletedRepairs',
      name: 'reportCompletedRepairs',
      component: () => import('../views/_reportCompletedRepairs.vue')
    },
    {
      path: '/reportIncompleteRepairs',
      name: 'reportIncompleteRepairs',
      component: () => import('../views/_reportIncompleteRepairs.vue')
    },
    {
      path: '/reportEmpAssignedData',
      name: 'reportEmpAssignedData',
      component: () => import('../views/_reportEmpAssignedData.vue')
    },
    {
      path: '/reportEmpAssignedView',
      name: 'reportEmpAssignedView',
      component: () => import('../views/_reportEmpAssignedView.vue')
    },
  ]
})


export default router
