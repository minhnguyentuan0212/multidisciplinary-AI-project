const temperatureData = {
    labels: [0,1,2,3,4,5,6,7,8,9],
    datasets: [{
        data: [24,24,25,26,27,26,30,31,31,32],
        fill: false,
        pointRadius: 0,
        borderColor: "Orange"
    }]
}
const humidityData = {
    labels: [0,1,2,3,4,5,6,7,8,9,10,11],
    datasets: [{
        data: [24,24,25,26,27,26,30,31,31,32,10,2],
        fill: false,
        pointRadius: 0,
        borderColor: "Blue"
    }]
}
const chartData = {temperature:temperatureData,humidity:humidityData}
export default chartData;