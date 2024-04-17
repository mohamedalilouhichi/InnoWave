import { Injectable } from '@angular/core';
import { Chart } from 'highcharts';
@Injectable({
  providedIn: 'root'
})
export class ChartserviceService {

  constructor() { }

  ChartCreate(type: any, xAxis: any, title: any, series: any): Chart {
    const chart = new Chart({
      chart: {
        type: type
      },
      title: {
        text: title
      },
      xAxis: {
        categories: xAxis
      },
      credits: {
        enabled: false
      },
      series: series
    });
    
    return chart;
  }

  ChartDestroy(chart: Chart): void {
    chart.destroy();
  }

  ChartRecreate(chart: Chart, type: any, xAxis: any, title: any, series: any): Chart {
    this.ChartDestroy(chart);
    const seriesofchart: any[] = [];
    for (let i = 2; i < series.length; i++) {
      const singleseries = {
        type: 'line', // Assuming you want to recreate a line chart
        name: series[0][i - 2],
        data: series[i]
      };
      seriesofchart.push(singleseries);
    }
    return this.ChartCreate(type, xAxis, title, seriesofchart);
  }

  ChartRecreateBar(chart: Chart, type: any, xAxis: any, title: any, series: any): Chart {
    this.ChartDestroy(chart);
    const seriesofchart: any[] = [];
    for (let i = 2; i < series.length; i++) {
      const singleseries = {
        type: 'bar', // Assuming you want to recreate a bar chart
        name: series[0][i - 2],
        data: series[i]
      };
      seriesofchart.push(singleseries);
    }
    return this.ChartCreate(type, xAxis, title, seriesofchart);
  }
}
