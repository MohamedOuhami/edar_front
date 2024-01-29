import React from "react";
import { Add } from "@mui/icons-material";
import { useTable } from "@refinedev/core";
import {
  Box,
  Typography,
  Stack,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CustomButton, PropertyCard } from "components";

const AllProperties = () => {
  const navigate = useNavigate();

  const {
    tableQueryResult: { data, isLoading, isError },
    current,
    setCurrent,
    pageSize,
    setPageSize,
    pageCount,
    sorters,
    setSorters,
    filters,
    setFilters,
  } = useTable();

  const allProperties = data?.data ?? [];

  if (isLoading) return <Typography>...Loading</Typography>;
  if (isError) return <Typography>There was an error</Typography>;

  return (
    <Box>
      <Box mt="20px" sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
        <Stack direction={"column"} width={"100%"}>
          <Typography fontSize={25} fontWeight={700} color={"#11142d"}>
            {!allProperties.length
              ? "There are no properties"
              : "All properties"}
          </Typography>

          <Box
            mb={2}
            mt={3}
            display={"flex"}
            width={"84%"}
            justifyContent={"space-between"}
            flexWrap={"wrap"}
          >
            <Box
              display={"flex"}
              gap={2}
              flexWrap={"wrap"}
              mb={{ xs: "20px", sm: 0 }}
            >
              <CustomButton
                title={`Sort price`}
                handleClick={() => {}}
                backgroundColor="#475be8"
                color="#fcfcfc"
              />
              <TextField
                variant="outlined"
                color="info"
                placeholder="Search by Title"
                value={""}
                onChange={() => {}}
              />
              <Select
                variant="outlined"
                color="info"
                displayEmpty
                required
                inputProps={{ "aria-label": "Without label" }}
                defaultValue=""
                value=""
                onChange={() => {}}
              >
                <MenuItem>All</MenuItem>
              </Select>
            </Box>
          </Box>
        </Stack>
      </Box>

      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <CustomButton
          title="Add Property"
          handleClick={() => navigate("/properties/create")}
          backgroundColor="#475be8"
          color="#fcfcfc"
          icon={<Add />}
        />
      </Stack>

      <Box
        mt={"20px"}
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
        }}
      >
        {allProperties.map((property) => (
          <PropertyCard
            key={property.id}
            id={property.id}
            title={property.title}
            location={property.location}
            price={property.price}
            photo={property.photo}
          />
        ))}
      </Box>

      {allProperties.length > 0 && (
        <Box display={"flex"} gap={2} mt={3} flexWrap={"wrap"}>
          <CustomButton
            title="Previous"
            handleClick={() => setCurrent((prev) => prev - 1)}
            backgroundColor="#475be8"
            color="#fcfcfc"
            disabled={!(current > 1)}
          />

          <Box
            display={{ xs: "hidden", sm: "flex" }}
            alignItems={"center"}
            gap={"5px"}
          >
            Page{" "}
            <strong>
              {current} of {pageCount}
            </strong>
          </Box>

          <CustomButton
            title="Next"
            handleClick={() => setCurrent((prev) => prev + 1)}
            backgroundColor="#475be8"
            color="#fcfcfc"
            disabled={!(current === pageCount)}
          />

          <Select
            variant="outlined"
            color="info"
            displayEmpty
            required
            inputProps={{ "aria-label": "Without label" }}
            defaultValue={10}
            value=""
            onChange={() => {}}
          >

            {[10,20,30,40,50].map((size) => (
            <MenuItem key={size} value={size}>Show {size}</MenuItem>

            ))}
          </Select>
        </Box>
      )}
    </Box>
  );
};

export default AllProperties;
