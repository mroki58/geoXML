import type { Route } from "./+types/home";
import { MapPage } from "../layouts/MapPage";
import {parser} from "../utils/xmlparser";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "geoXML-map" },
    { name: "geoXML map", content: "geoXML map" },
  ];
}

export function clientLoader() {
    return {
          "0": "<deposit name=\"zloze miedzi A\"><geology><type>rudy miedzi</type><estimatedVolume>1.2 mln ton</estimatedVolume><depth>300 m</depth><status>eksploatowane</status></geology><geography><location>Sudety, Polska</location><region>Dolnośląskie</region><latitude>50.3001</latitude><longitude>16.4375</longitude><radius>5</radius></geography></deposit>",
          "1": "<deposit name=\"zloze wegla B\"><geology><type>węgiel kamienny</type><estimatedVolume>5 mln ton</estimatedVolume><depth>800 m</depth><status>nieeksploatowane</status></geology><geography><location>Górny Śląsk</location><region>Śląskie</region><latitude>50.2887</latitude><longitude>18.6782</longitude><radius>8</radius></geography></deposit>"
        }
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