import {Chart, ArcElement, Legend, Tooltip} from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Doughnut, Pie } from 'react-chartjs-2';
import { Box, Card, CardContent, CardHeader, Divider, useTheme } from '@mui/material';

Chart.register(ArcElement);
Chart.register(ChartDataLabels);
Chart.register(Legend);
Chart.register(Tooltip);
export const ShowDoughnut = (props) => {
  const theme = useTheme();

  const data = {
    datasets: [
      {
        data: props.data.count,
        backgroundColor: ['#3F51B5', '#e53935', '#FB8C00', '#43A047', '#FFC107'],
        borderWidth: 8,
        borderColor: '#FFFFFF',
        hoverBorderColor: '#FFFFFF'
      }
    ],
    labels: props.data.labels
  };

  const options = {
    plugins: {
          legend: { display: true, labels: {
          usePointStyle: true,
        }, },

      datalabels: {
        backgroundColor: '#ccc',
        formatter: (val, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];

          // Format the number with 2 decimal places
          const formattedVal = Intl.NumberFormat('en-US', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          }).format(val);

          // Put them together
          return ` ${formattedVal}`;
          // return value + '%';
        }
      }
    },
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    // legend: {
    //   display: fal
    // },
    maintainAspectRatio: false,
    responsive: true,

  };

  return (
    <Card>
      <CardHeader title={props.title} />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 300,
            position: 'relative'
          }}
        >
          <Pie
            data={data}
            options={options}
          />
        </Box>
      </CardContent>
    </Card>
  );
};
