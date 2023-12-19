import * as React from 'react';
import { LineChart } from '@mui/x-charts';
import { Box, Typography } from '@mui/material';

export default function CustomLineChart({xaxis, data, title, color}) {
  return (
    <Box>
      <Typography variant='h5'>{title}</Typography>
      <Box display={'flex'} justifyContent={'space-between'} minWidth={'400px'} height={'400px'}>
          <LineChart
            xAxis={[
              {
                id: 'barCategories',
                data: xaxis,
                scaleType: 'time',
              },
            ]}
            series={[
              {
                data: data,
                // area: true,
                color:color
              },
            ]}
          />
      </Box>
    </Box>
  );
}