import type { Route } from "./+types/home";
import { MapPage } from "../layouts/MapPage";
import {parser} from "../utils/xmlparser";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "geoXML-map" },
    { name: "geoXML map", content: "geoXML map" },
  ];
}

export async function clientLoader() {
    const res = await fetch('/api/all')
    const data = await res.json();

    let xmlMap = data.data

    Object.keys(xmlMap).map((key : string) => {
      xmlMap[key] = xmlMap[key][0]
    })

    return xmlMap
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