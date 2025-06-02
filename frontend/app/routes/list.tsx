import type { Route } from "./+types/home";
import { useEffect } from "react";
import { ListPage } from "../layouts/ListPage"
import { parser } from "../utils/xmlparser"
import { getAllBackendData } from '../utils/fetchContent'

export function meta({}: Route.MetaArgs) {
  return [
    { title: "geoXML-list" },
    { name: "geoXML list of deposits", content: "geoXML list of deposits" },
  ];
}

export async function clientLoader() {
  let data = {
          "0": "<deposit name=\"zloze miedzi A\"><geology><type>rudy miedzi</type><estimatedVolume>1.2 mln ton</estimatedVolume><depth>300 m</depth><status>eksploatowane</status></geology><geography><location>Sudety, Polska</location><region>Dolnośląskie</region><latitude>50.3001</latitude><longitude>16.4375</longitude><radius>5</radius></geography></deposit>",
          "1": "<deposit name=\"zloze wegla B\"><geology><type>węgiel kamienny</type><estimatedVolume>5 mln ton</estimatedVolume><depth>800 m</depth><status>nieeksploatowane</status></geology><geography><location>Górny Śląsk</location><region>Śląskie</region><latitude>50.2887</latitude><longitude>18.6782</longitude><radius>8</radius></geography></deposit>"
        } // getAllBackendData()
  return data
}

export default function Home({loaderData}: Route.ComponentProps) {
  let loadedData = loaderData as any;
  let parsedData = {} as any;
  
  Object.keys(loadedData).map((key) => {
    parsedData[key] = parser.parse(loadedData[key]);
  });

  // ustawiamy data - mogą wykorzystywać inne komponenty więc nie wyrzucamy
  useEffect(() => {
    localStorage.setItem('data', JSON.stringify(parsedData))
  }, [])
  
  return (
    <ListPage content={parsedData}/>
  );
}