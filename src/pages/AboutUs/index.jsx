import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import Layout from "../../layout/Layout";
import CatSvg from "../../assets/svg/aboutUsCat.svg";

const CatEmployee = ({ name }) => {
  return (
    <Grid
      item
      xs={6}
      sm={6}
      md={4}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      textAlign={"center"}
    >
      <img src={CatSvg} alt="svg" width={100} />
      <Typography>{name}</Typography>
    </Grid>
  );
};

const employees = [
  { name: "Egemen Tosunbaş" },
  { name: "Lamia Demirok" },
  { name: "Eda Korkmaz" },
  { name: "Ataberk Öğmen" },
  { name: "Kerim Tuna Kokarcalı" },
  { name: "Hasan Hüseyin Solak" },
];

const AboutUs = () => {
  return (
    <Layout>
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"space-between"}
        alignItems={"center"}
        gap={10}
        paddingY={4}
      >
        <Grid container>
          <Grid item xs={12} textAlign={"center"}>
            <Typography variant="h4" fontWeight={700}>
              WHO ARE WE?
            </Typography>
            <Typography fontSize={18}>
              Welcome to our musical haven, where rhythm meets code, and
              melodies intertwine with algorithms. We are a passionate group of
              six university students who have embarked on a harmonious journey
              to create a unique and dynamic web platform – a platform that goes
              beyond the ordinary, giving you the power to curate your Spotify
              playlists in an extraordinary way.
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} textAlign={"center"}>
            <Typography variant="h4" fontWeight={700}>
              OUR MISSION
            </Typography>
            <Typography fontSize={18}>
              At the core of our project is a shared love for music and
              technology. We believe that everyone deserves a soundtrack that
              resonates with their unique taste. Our mission is to empower you
              to create personalized Spotify playlists effortlessly, adding a
              touch of innovation to your music discovery journey.
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={4}>
          <Grid item xs={12} textAlign={"center"}>
            <Typography variant="h4" fontWeight={700}>
              OUR TEAM
            </Typography>
          </Grid>
          {employees?.map((item, index) => (
            <CatEmployee key={index} name={item.name} />
          ))}
        </Grid>
        <Grid container minHeight={100}>
          <Grid item xs={12} textAlign={"center"}>
            <Typography variant="h4" fontWeight={700}>
              CONTACT US
            </Typography>
          </Grid>
          <Grid item xs={12} textAlign={"center"}>
            <Typography>
              Have a question, feedback, or just want to say hello? We'd love to
              hear from you! Feel free to reach out through the following
              channels:
              <br />
              We don't have one though. (Ooopsies...)
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};

export default AboutUs;
