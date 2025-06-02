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
  let data = getAllBackendData()
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