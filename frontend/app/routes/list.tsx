import type { Route } from "./+types/home";
import { LandingPage } from "../layouts/LandingPage";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "geoXML-list" },
    { name: "geoXML list of deposits", content: "geoXML list of deposits" },
  ];
}

export default function Home() {
  return <LandingPage />;
}