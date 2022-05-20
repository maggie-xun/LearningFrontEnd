<template>
  <div :class="className"
       :style="{height:height,width:width}" />
</template>
<script>
import * as echarts from "echarts";
// require("echarts/theme/macarons"); // echarts theme
export default {
  name: "LineChart",
  props: {
    className: {
      type: String,
      default: "",
    },
    height: {
      type: String,
      default: "350px",
    },
    width: {
      type: String,
      default: "100%",
    },
    chartData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      chart: null,
    };
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val);
      },
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
    });
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el);
      this.setOptions(this.chartData);
    },
    setOptions({ expectedData, actualData } = {}) {
      this.chart.setOption({
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          axisTick: {
            show: false,
          },
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 30,
          containLabel: true,
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
          },
          padding: [5, 10],
        },
        yAxis: {
          type: "value",
          axisTick: {
            show: false,
          },
        },
        series: [
          {
            data: expectedData,
            type: "line",
            smooth: true,
          },
          {
            data: actualData,
            type: "line",
            smooth: true,
          },
        ],
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>    