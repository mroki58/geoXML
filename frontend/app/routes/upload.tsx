import type { Route } from "./+types/home";
import { LandingPage } from "../layouts/LandingPage";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "geoXML-upload" },
    { name: "geoXML form", content: "geoXML form for uploading deposit" },
  ];
}

export default function Home() {
  return <LandingPage />;
}