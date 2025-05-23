import type { Route } from "./+types/home";
import { LandingPage } from "../layouts/LandingPage";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "geoXML" },
    { name: "geoXML landing page", content: "geoXML options!" },
  ];
}

export default function Home() {
  return <LandingPage />;
}
