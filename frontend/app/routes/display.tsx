import type { Route } from "./+types/home";
import { MapPage } from "../layouts/MapPage";
import {parser} from "../utils/xmlparser";
import {getAllBackendData} from "../utils/fetchContent"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "geoXML-map" },
    { name: "geoXML map", content: "geoXML map" },
  ];
}

export async function clientLoader() {
    return await getAllBackendData();
}

export default function Home({loaderData}: Route.ComponentProps) {
  let loadedData = loaderData as any;
  let parsedData = {} as any;
  
  Object.keys(loadedData).map((key) => {
    parsedData[key] = parser.parse(loadedData[key]);
  });
  
  return (
    <MapPage content={parsedData}/>
  );
}