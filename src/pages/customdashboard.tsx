import { Box, Stack, Typography } from "@mui/material";
import { useList } from "@refinedev/core";

import {
  PropertyCard,
  PieChart,
  PropertyReferrals,
  TotalRevenue,
  TopAgent,
} from "components";

const CustomDashboard = () => {
  return (
    <Box>
      <Typography fontSize={25} fontWeight={700} color="#11142D">
        Dashboard
      </Typography>

      {/* Putting the piecharts */}

      <Box mt="20px" display="flex" flexWrap="wrap" gap={4}>
        <PieChart
          title="Properties for sale"
          value={684}
          series={[75, 25]}
          colors={["#475BE8", "#E4E8EF"]}
        />
        <PieChart
          title="Properties for Rent"
          value={550}
          series={[60, 40]}
          colors={["#475BE8", "#E4E8EF"]}
        />
        <PieChart
          title="Total Customers"
          value={6894}
          series={[75, 25]}
          colors={["#475BE8", "#E4E8EF"]}
        />
        <PieChart
          title="Properties for Cities"
          value={6894}
          series={[50, 50]}
          colors={["#475BE8", "#E4E8EF"]}
        />
      </Box>

      <Stack mt="25px" width={"100%"} direction={{ xs: "column", lg: "row" }} gap={2}>
        <TotalRevenue />
        <PropertyReferrals />
      </Stack>
    </Box>
  );
};

export default CustomDashboard;
