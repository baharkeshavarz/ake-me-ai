import ListProfiles from "./list-profiles";
import { Suspense } from "react";

export default async function Page() {
  return (
    <main>
      <Suspense
        fallback={
          <p style={{ textAlign: "center" }}>loading... on initial request</p>
        }
      >
        <ListProfiles />
      </Suspense>
    </main>
  );
}
