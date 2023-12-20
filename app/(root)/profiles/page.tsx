import Loading from "@/components/shared/Loading";
import ListProfiles from "./list-profiles";
import { Suspense } from "react";

export default async function Page() {
  return (
    <>
      <Suspense
        fallback={<Loading/>}
      >
       <ListProfiles />
      </Suspense>
    </>
  );
}
