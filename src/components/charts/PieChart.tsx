import { Box, Typography, Stack } from "@mui/material";
import React from "react";

import { PieChartProps } from "interfaces/home";
import ReactApexChart from "react-apexcharts";
const PieChart = ({ title, value, series, colors }: PieChartProps) => {
  return (
    <Box
    id="Chart"
    flex={1}
    display={"flex"}
    bgcolor={"#fcfcfc"}
    flexDirection={"row"}
    justifyContent={"space-between"}
    alignItems={"center"}
    pl={3.5}
    py={2}
    gap={2}
    borderRadius={"15px"}
    minHeight={"110px"}
    width={"fit-content"}
    >
      <Stack direction="column">
        <Typography fontSize={16} color="#808191">
          {title}
        </Typography>
        <Typography fontSize={26} color="#11142D" fontWeight={700} mt={1}>
          {value}
        </Typography>
      </Stack>

      <ReactApexChart
        options={{
          chart: {
            type: "donut",
          },
          colors: colors,
          legend: { show: false },
          dataLabels: { enabled: false },
        }}
        series={series}
        type="donut"
        width="120px"
      />
    </Box>
  );
};

export default PieChart;
