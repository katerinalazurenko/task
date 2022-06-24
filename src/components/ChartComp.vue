<template>
  <div>
    <div class="chart" ref="chartdiv"></div>
  </div>
</template>
<script>

import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

export default {
  name: "ChartComp",
  computed: {
    chartData() {
      return this.$store.getters.getData
    }
  },

  methods: {    
    renderChart(){
    
      let root = am5.Root.new(this.$refs.chartdiv);

      root.setThemes([
        am5themes_Animated.new(root)
      ]);

      root.dateFormatter.setAll({
        dateFormat: "yyyy-MM-dd",
        dateFields: ["valueX"]
      });

      // Create chart
      // https://www.amcharts.com/docs/v5/charts/xy-chart/
      let chart = root.container.children.push(am5xy.XYChart.new(root, {
        focusable: true,
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        pinchZoomX:true
      }));

      // Chart title
      chart.children.unshift(am5.Label.new(root, {
        text: "Аналитика по визитам",
        fontSize: 15,
        fontWeight: "400",
        textAlign: "center",
        x: am5.percent(90),
        centerX: am5.percent(50),
        y: am5.percent(0),
        centerY: am5.percent(0),
      }));

      // Create axes
      // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
      let xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
        maxDeviation: 0,
        baseInterval: {
          timeUnit: "day",
          count: 5
        },
        renderer: am5xy.AxisRendererX.new(root, {
          minGridDistance: 30, pan:"zoom"
        }),
        tooltip: am5.Tooltip.new(root, {})
      }));

      let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
        maxDeviation: 1,
        renderer: am5xy.AxisRendererY.new(root, {pan:"zoom"})
      }));

      // Add series
      // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
      let series = chart.series.push(am5xy.SmoothedXLineSeries.new(root, {
        minBulletDistance: 10,
        connect: false,
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "visits",
        valueXField: "date",
        tooltip: am5.Tooltip.new(root, {
          pointerOrientation: "vertical",
          labelText: "{valueY}"
        })
      }));

      series.fills.template.setAll({ fillOpacity: 0.2, visible: true });

      // Add series axis range for a different stroke/fill
      // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/axis-ranges/#Series_axis_ranges
      let rangeDataItem = yAxis.makeDataItem({
        value: 0,
        endValue: 1000
      });

      let color = chart.get("colors").getIndex(3);

      let range = series.createAxisRange(rangeDataItem);

      range.strokes.template.setAll({
        stroke: color
      });

      range.fills.template.setAll({
        fill: color,
        fillOpacity: 0.2,
        visible: true
      });

      // Set up data processor to parse string dates
      // https://www.amcharts.com/docs/v5/concepts/data/#Pre_processing_data
      series.data.processor = am5.DataProcessor.new(root, {
        dateFormat: "yyyy-MM-dd",
        dateFields: ["date"]
      });

      series.data.setAll(this.chartData);

      series.bullets.push(function() {
        let circle = am5.Circle.new(root, {
          radius: 4,
          fill: series.get("fill"),
          stroke: root.interfaceColors.get("background"),
          strokeWidth: 2
        })

        circle.adapters.add("fill", function(fill) {
          let dataItem = circle.dataItem;
          if (dataItem.get("valueY") >= 0) {
            return color;
          }
          return fill
        })

        return am5.Bullet.new(root, {
          sprite: circle
        })
      });

      // Add cursor
      // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
      let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
        xAxis: xAxis
      }));
      cursor.lineY.set("visible", false);

      // Make stuff animate on load
      // https://www.amcharts.com/docs/v5/concepts/animations/
      chart.appear(1000, 100);

      this.root = root;
    }
  },
  created() {
    this.$store.dispatch('fetchData')
  },
  mounted(){
    this.renderChart()
  },

  watch: {
    chartData() {
      if (this.root) {
        this.root.dispose();
      }
      this.renderChart()
    }
  }
}
</script>

<style lang="scss" scoped>
.chart {
  min-width: 1000px;
  height: 500px;
}
</style>
