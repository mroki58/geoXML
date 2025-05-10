import type { Route } from "./+types/home";
import { MapPage } from "../layouts/MapPage";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "geoXML-map" },
    { name: "geoXML map", content: "geoXML map" },
  ];
}

export function clientLoader() {
    return [
    {
        "name": "Złoże Miedzi A",
        "geology": {
        "type": "rudy miedzi",
        "estimatedVolume": "1.2 mln ton",
        "depth": "300 m",
        "status": "eksploatowane"
        },
        "geography": {
        "location": "Sudety, Polska",
        "region": "Dolnośląskie",
        "latitude": 50.3001,
        "longitude": 16.4375,
        "radius": 5
        }
    },
    {
        "name": "Złoże Węgla B",
        "geology": {
        "type": "węgiel kamienny",
        "estimatedVolume": "5 mln ton",
        "depth": "800 m",
        "status": "nieeksploatowane"
        },
        "geography": {
        "location": "Górny Śląsk",
        "region": "Śląskie",
        "latitude": 50.2887,
        "longitude": 18.6782,
        "radius": 8
        }
    }
    ]

}

export default function Home({loaderData}: Route.ComponentProps) {
  return (
    <MapPage content={loaderData}/>
  );
}