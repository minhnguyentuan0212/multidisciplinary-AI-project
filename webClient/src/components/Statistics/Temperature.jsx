import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import {Line} from "react-chartjs-2"

function Temperature(data){
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
      );
    const options = {
        plugins: {
            legend: {
                display: false
            }
        },
        // scales: {
        //     x: {
        //         display: false
        //     }
        // }
    }
    return (
        <>
        <div className="my-2 row" style={
            {width:"100%",aspectRatio:"2/0.75",borderRadius:"15%",backgroundColor:"white"}
            }>
                <div className="row d-flex align-items-center ms-2 chivo-reg" style={{height:"50%"}}>
                    <span className="material-icons p-0 w-auto bg-warning me-2 rounded-3">thermostat</span> Temperature
                    {/* <div className='col-6 ms-0 fs-1'>
                    <select className="form-select">
                    <option selected>Today</option>
                    <option value="1">This week</option>
                    </select>
                    </div> */}
                    
                </div>
                <Line
                data={data.data}
                options={options}
                >

                </Line>
        </div>
        </>
    )
}
export default Temperature;