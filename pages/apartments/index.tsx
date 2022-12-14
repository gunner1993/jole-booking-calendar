import { NextPage } from "next";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import PageLoader from "../../src/components/Shared/Loader/PageLoader";

const DynamicApartmentsCalendarPage = dynamic(
  () => import("../../src/components/Calendar/Apartments/Apartments"),
  {
    suspense: true,
  }
);

type Props = {};

const Apartments: NextPage = (props: Props) => {
  return (
    <Suspense fallback={<PageLoader />}>
      <title>Apartments</title>
      <DynamicApartmentsCalendarPage />
    </Suspense>
  );
};

export default Apartments;
