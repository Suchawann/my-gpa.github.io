import { Container } from "react-bootstrap";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

function LineChart({ semData }) {

    var sem = []
    var gpa = []

    semData.forEach((v) => {
        sem.push(v[0])
        gpa.push(v[1])
    })

    const graphData = {
        labels: sem,
        datasets: [
            {
                label: 'GPA' ,
                data: gpa,
            },
        ],
    };

    return(
        <Container>
            <h3>GPA Progress</h3>
            <Line 
                data={graphData}
                options={
                    {mainAspectRatio: false, 
                    scales:{y:{beginAtZero: false}}}
                }
            />
        </Container>
    )

}

export default LineChart;