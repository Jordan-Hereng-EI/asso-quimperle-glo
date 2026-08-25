import type { Metadata } from "next";
import { AlbumPage } from "./AlbumPage";

export const metadata: Metadata = {
  title: "Album photo",
};

export default function Page() {
  return <AlbumPage />;
}
