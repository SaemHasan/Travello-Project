import Chart from 'chart.js/auto';
import {Bar} from 'react-chartjs-2';
import {Box, Button, Card, CardContent, CardHeader, Divider, useTheme} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export const ShowBarChart = (props) => {
    const theme = useTheme();

    const labels = ["1", "2", "3", "4", "5", "6", "7"];
    const data = {
        labels: labels,
        datasets: [{
            label: 'User visits',
            data: [65, 59, 80, 81, 56, 55, 40],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)'
            ],
            borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)'
            ],
            borderWidth: 1
        }]
    };

    const options = {
        animation: false,
        cornerRadius: 20,
        layout: {padding: 0},
        legend: {display: false},
        maintainAspectRatio: false,
        responsive: true,
        xAxes: [
          {
            ticks: {
              fontColor: theme.palette.text.secondary
            },
            gridLines: {
              display: false,
              drawBorder: false
            }
          }
        ],
        yAxes: [
          {
            ticks: {
              fontColor: theme.palette.text.secondary,
              beginAtZero: true,
              min: 0
            },
            gridLines: {
              borderDash: [2],
              borderDashOffset: [2],
              color: theme.palette.divider,
              drawBorder: false,
              zeroLineBorderDash: [2],
              zeroLineBorderDashOffset: [2],
              zeroLineColor: theme.palette.divider
            }
          }
        ],
    };

    return (
        <Card>
            <CardHeader
                action={(
                    <Button
                        endIcon={<ArrowDropDownIcon fontSize="small"/>}
                        size="small"
                    >
                        Last 7 days
                    </Button>
                )}
                title={props.title}
            />

            <Divider/>

            <CardContent>
                <Box
                    sx={{
                        height: 400,
                        position: 'relative'
                    }}
                >
                    <Bar
                        data={data}
                        options={options}
                    />
                </Box>
            </CardContent>

            <Divider/>
        </Card>
    );
};
