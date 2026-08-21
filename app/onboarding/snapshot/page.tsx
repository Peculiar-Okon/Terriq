import { Suspense } from "react";
import SnapshotPage from "./SnapshotPage";

export default function Page() {
  return (
      <Suspense
            fallback={
                    <main className="flex min-h-screen items-center justify-center bg-[#F5F3ED]">
                              <p className="text-sm text-[#6D7069]">
                                          Preparing your TerrIQ setup...
                                                    </p>
                                                            </main>
                                                                  }
                                                                      >
                                                                            <SnapshotPage />
                                                                                </Suspense>
                                                                                  );
                                                                                  }