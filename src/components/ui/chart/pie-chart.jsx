import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { Box, Typography } from '@mui/material';

export default function BasicPie({data, title}) {
  return (
    <Box>
      <Typography variant='h5'>{title}</Typography>
      <Box display={'flex'} justifyContent={'space-between'} height={'400px'}>
        <PieChart
          series={[
            {
              data: data,
            },
          ]}
        />
      </Box>
    </Box>
  );
}