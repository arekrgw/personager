import PageLayout from "@components/PageLayout";
import { Typography } from "@mui/material";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <PageLayout>
      <Typography variant="h1">Personager</Typography>
    </PageLayout>
  );
};

export default Home;
