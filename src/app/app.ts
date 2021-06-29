import {DateRangePicker} from '@syncfusion/ej2-calendars';
import {Chart, ColumnSeries, DateTimeCategory, AccumulationChart} from '@syncfusion/ej2-charts';

let pieData: any[] = [{x: 'Aug', y: 25}, {x: 'Sep', y: 21}, {x: 'Oct', y: 15}];
let piechart: AccumulationChart = new AccumulationChart({
    series: [
        {
            dataSource: pieData,
            innerRadius: '40%',
            xName: 'x',
            yName: 'y'
        }
    ],
    title: 'Nouveaux cases (DTH)'
}, '#pie');
Chart.Inject(ColumnSeries, DateTimeCategory);
// creates a simple daterangepicker component
let daterangepicker: DateRangePicker = new DateRangePicker({
//sets the start date in the range
    startDate: new Date("11/9/2017"),
//sets the end date in the range
    endDate: new Date("11/21/2017")
});
daterangepicker.appendTo('#date-range');

let data: any[] = [
    {x: new Date(2000, 6, 11), CA: 10, paires: 30},
    {x: new Date(2000, 6, 12), CA: 11, paires: 10},
    {x: new Date(2000, 6, 13), CA: 11, paires: 10},
    {x: new Date(2000, 6, 14), CA: 11, paires: 10},
    {x: new Date(2000, 6, 15), CA: 11, paires: 10},
    {x: new Date(2000, 6, 16), CA: 11, paires: 10},
    {x: new Date(2000, 6, 17), CA: 11, paires: 10},
    {x: new Date(2000, 6, 18), CA: 11, paires: 10},
    {x: new Date(2000, 6, 19), CA: 11, paires: 10},
    {x: new Date(2000, 6, 20), CA: 11, paires: 10},
    {x: new Date(2000, 6, 21), CA: 11, paires: 10},
    {x: new Date(2000, 6, 22), CA: 11, paires: 10},
    {x: new Date(2000, 6, 23), CA: 11, paires: 10},
    {x: new Date(2000, 6, 24), CA: 11, paires: 10},
    {x: new Date(2000, 6, 25), CA: 11, paires: 10},
    {x: new Date(2000, 6, 26), CA: 11, paires: 10},
    {x: new Date(2000, 6, 27), CA: 11, paires: 10},
    {x: new Date(2000, 6, 28), CA: 11, paires: 10},
    {x: new Date(2000, 6, 29), CA: 11, paires: 10},
    {x: new Date(2000, 6, 30), CA: 11, paires: 10}];
let chart: Chart = new Chart({
    primaryXAxis: {
        // Date time scale in primary X Axis
        valueType: 'DateTimeCategory',
        skeleton: 'Ed',

    },
    series: [{
        dataSource: data,
        xName: 'x',
        yName: 'CA',
        type: 'Column', cornerRadius: {
            topLeft: 10, topRight: 10
        },
    }, {
        dataSource: data,
        xName: 'x',
        yName: 'paires',
        type: 'Column',
        cornerRadius: {
            topLeft: 10, topRight: 10
        },
    }],
    title: "Chiffre d’affaires et nombre de paires"
}, '#chart');

document.querySelector('[data-js-id="updateChart"]').addEventListener('change', (e) => {
    // @ts-ignore
    let newData = data
    const target = e.target as HTMLInputElement;

    if (target.checked) {
        const last = data.slice(-1).pop()
        newData = returnWeek(data, last)
    }
    // @ts-ignore
    chart.series.forEach(series => {
        series.dataSource = newData;
    })
    document.querySelectorAll('.chart-container .labels label').forEach(label => {
        label.classList.toggle('active')
    })
})
const returnWeek = (data: any[], last: { x: number; }) => {
    return data.filter(obj => {
        var diff = Math.abs(obj.x - last.x);
        const diffDays = Math.ceil(diff / (1000 * 60 * 60 * 24));
        return diffDays < 7
    })
}
