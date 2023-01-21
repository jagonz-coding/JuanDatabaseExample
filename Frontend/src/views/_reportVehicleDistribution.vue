<template>
<section class="container">
		<p class="fs-1 text-center">Repair Count by Auto Manufacturer</p>
    <div class="columns">
    <div class="column">
        <p>This Bar Chart represents the year-to-date repairs by each auto manufacturer:</p>
				<!--Import Bar Chart Component-->
        <BarChart
        v-if="!loading && !error"
        :label="labels"
        :chart-data="repairCount"
        ></BarChart>
    </div>
    </div>
</section>
</template>

<script>
import axios from "axios";
//Import the barchart component to be used in the template section
import BarChart from "@/components/_chart-VehicleDistroReport.vue";

export default {
  components: {
    BarChart,
    //EnrollmentBar,
  },
  data() {
    return {
      labels: [],
      turnout: [],
      loading: false,
      error: null,
      data: [],
      totals: []
    };
  },
  methods: {
    async fetchData() {
      try {
        this.error = null;
        this.loading = true;

        const url = `http://localhost:3001/vehicleTotals`;
        const response = await axios.get(url);
        this.repairCount = response.data

      } catch (err) {
        if (err.response) {
          // client received an error response (5xx, 4xx)
          this.error = {
            title: "Server Response",
            message: err.message,
          };
        } else if (err.request) {
          // client never received a response, or request never left
          this.error = {
            title: "Unable to Reach Server",
            message: err.message,
          };
        } else {
          // There's probably an error in your code
          this.error = {
            title: "Application Error",
            message: err.message,
          };
        }
      }
      this.loading = false;
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>