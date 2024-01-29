import React, { useEffect, useState } from "react";
import { Typography, Stack, Box } from "@mui/material";
import { useDelete, useGetIdentity, useShow } from "@refinedev/core";
import { useParams, useNavigate } from "react-router-dom";
import {
  ChatBubble,
  Delete,
  Edit,
  Phone,
  Star,
  Place,
} from "@mui/icons-material";
import { CustomButton } from "components";
import axios from "axios";

const PropertyDetails = () => {
  const navigate = useNavigate();
  const [property, setProperty] = useState<any>();
  const [isLoading, setLoading] = useState(true);

  const { data: user } = useGetIdentity();
  const { id } = useParams();
  const { mutate } = useDelete();

  function checkImage(url: any) {
    const img = new Image();
    img.src = url;
    return img.width !== 0 && img.height !== 0;
  }

  const handleDeleteProperty = () => {
    const response = window.confirm("Are you sure you want to delete this property?");
    if (response) {
      mutate(
        {
          resource: "properties",
          id: id as string,
        },
        {
          onSuccess: () => {
            navigate("/properties");
          },
        }
      );
    }
  };

  const getProperty = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/properties/${id}`
      );
      setProperty(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };

  useEffect(() => {
    getProperty();
  }, [id]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <Box
      padding={"20px"}
      borderRadius={"15px"}
      bgcolor={"#fcfcfc"}
      width={"fit-content"}
    >
      <Typography fontSize={25} fontWeight={700} color={"#11142d"}>
        Details
      </Typography>

      <Box
        mt={"20px"}
        display={"flex"}
        flexDirection={{ sx: "column", lg: "row" }}
        gap={4}
      >
        <Box flex={1} maxWidth={746}>
          <img
            src={property?.photo}
            alt={property?.title}
            height={546}
            style={{ objectFit: "cover", borderRadius: "10px" }}
            className="property_details-img"
          />

          <Box mt={"15px"}>
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              flexWrap={"wrap"}
              alignItems={"center"}
            >
              <Typography
                fontSize={18}
                fontWeight={500}
                color={"#11142d"}
                textTransform={"capitalize"}
              >
                {property?.propertyType}
              </Typography>
              <Box>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={`star-${star}`} sx={{ color: "#f2c94c" }} />
                ))}
              </Box>
            </Stack>

            <Stack
              direction="row"
              flexWrap="wrap"
              justifyContent="space-between"
              alignItems="center"
              mt={2}
            >
              <Typography
                fontSize={26}
                fontWeight={700}
                color={"#11142d"}
                textTransform={"capitalize"}
              >
                {property?.title}
              </Typography>
              <Stack direction={"row"} gap={2}>
                <Place />
                <Typography sx={{ color: "#808191" }}>
                  {property?.location}
                </Typography>
              </Stack>
            </Stack>

            <Stack mt="25px" direction="column" gap="10px">
              <Typography fontSize={18} color="#11142D">
                Description
              </Typography>
              <Typography fontSize={14} color="#808191">
                {property?.description}
              </Typography>
            </Stack>
          </Box>
        </Box>

        <Box
          width="100%"
          flex={1}
          maxWidth={326}
          display="flex"
          flexDirection="column"
          gap="20px"
        >
          <Stack
            width="100%"
            p={2}
            direction="column"
            justifyContent="center"
            alignItems="center"
            border="1px solid #E4E4E4"
            borderRadius={2}
          >
            <Stack
              mt={2}
              justifyContent="center"
              alignItems="center"
              textAlign="center"
            >
              <img
                src={
                  checkImage(property.owner.avatar)
                    ? property.owner.avatar
                    : "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"
                }
                alt="avatar"
                width={90}
                height={90}
                style={{
                  borderRadius: "100%",
                  objectFit: "cover",
                }}
              />

              <Box mt="15px">
                <Typography fontSize={18} fontWeight={600} color="#11142D">
                  {property.owner.name}
                </Typography>
                <Typography
                  mt="5px"
                  fontSize={14}
                  fontWeight={400}
                  color="#808191"
                >
                  Agent
                </Typography>
              </Box>

              <Stack mt="15px" direction="row" alignItems="center" gap={1}>
                <Place sx={{ color: "#808191" }} />
                <Typography fontSize={14} fontWeight={400} color="#808191">
                  Casablanca, Morocco
                </Typography>
              </Stack>

         
            </Stack>

            <Stack
              width="100%"
              mt="25px"
              direction="row"
              flexWrap="wrap"
              gap={2}
            >
              <CustomButton
                title={!user ? "Message" : "Edit"}
                backgroundColor="#475BE8"
                color="#FCFCFC"
                fullWidth
                icon={!user ? <ChatBubble /> : <Edit />}
                handleClick={() => {
                  if (user) {
                    navigate(`/properties/edit/${property.id}`);
                  }
                }}
              />
              <CustomButton
                title={!user ? "Call" : "Delete"}
                backgroundColor={!user ? "#2ED480" : "#d42e2e"}
                color="#FCFCFC"
                fullWidth
                icon={!user ? <Phone /> : <Delete />}
                handleClick={() => {
                  if (user) handleDeleteProperty();
                }}
              />
            </Stack>
          </Stack>

          <Stack>
            <img
              src="https://serpmedia.org/scigen/images/googlemaps-nyc-standard.png?crc=3787557525"
              width="100%"
              height={306}
              style={{ borderRadius: 10, objectFit: "cover" }}
            />
          </Stack>

          <Box>
            <CustomButton
              title="Book Now"
              backgroundColor="#475BE8"
              color="#FCFCFC"
              fullWidth
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PropertyDetails;
