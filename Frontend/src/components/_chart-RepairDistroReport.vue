<template>
  <canvas ref="myChart" width="250" height="100"></canvas>
</template>

<script>
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables);
export default {
  props: {
    chartData: {
      type: Array,
    },
  },
  async mounted() {
    await new Chart(this.$refs.myChart, {
      type: "bar",
      data: {
        datasets: [
          {
            label: "Repair Count",
            backgroundColor: "rgba(144,238,144 , 0.9 )",
            data: this.chartData,
          },
        ],
      },
      options: {
        scales: {
            y: {
                min: 0
            }
        },
				parsing: {
					xAxisKey: 'service_description',
        	yAxisKey: 'count(*)'
				}
      }
    });
  },
};
</script>