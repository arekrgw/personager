import { PageLayout } from "@components/PageLayout";
import type { NextPage } from "next";
import { useRouter } from "next/router";

interface IEventEditPage {}

const EventEditPage: NextPage<IEventEditPage> = () => {
  const router = useRouter();
  return <PageLayout>{router.query.id}</PageLayout>;
};

export default EventEditPage;
