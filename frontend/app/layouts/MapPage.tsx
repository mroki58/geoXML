import Skeleton from "../components/Skeleton"
import React from 'react'
import { APIProvider, Map } from "@vis.gl/react-google-maps"
import {Circle} from "../components/Circle"

const center = {
  lat: 50.04,
  lng: 19.94,
}

const MapComponent = ({content, setDeposit} : any) => {

  return (
        <APIProvider apiKey={import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY}>
          <Map
            defaultCenter={center}
            defaultZoom={6}
            gestureHandling={'greedy'}
            >
              {
                Object.keys(content).map((key: any) => 
                    <Circle
                      key={key}
                      radius={content[key].deposit.geography.radius * 1000}
                      center={{lat: content[key].deposit.geography.latitude, lng: content[key].deposit.geography.longitude}}
                      onMouseOver={() => {setDeposit(content[key])}}
                      onMouseOut={() => {setDeposit(null)}}
                      strokeColor={'#0c4cb3'}
                      strokeOpacity={1}
                      strokeWeight={3}
                      fillColor={'#3b82f6'}
                      fillOpacity={0.3}
                    />
                )
              }
            
          </Map>
        
        </APIProvider>
  );
}


export const MapPage = ({content} : any) => {

    const [deposit, setDeposit] = React.useState<any>(null);

    

    return (
        <Skeleton>
            <div className = "col-span-2 row-span-3 p-20">
                 <MapComponent content={content} setDeposit={setDeposit}/> 
            </div>
            <div className="row-span-3 bg-neutral-200 mb-10 mr-16" >
              {
                deposit ? (
                  <div className="p-4 flex flex-col items-center h-full justify-between">
                    <h1 className="text-2xl font-bold">{deposit.deposit['@name']}</h1>
                    <p className="text-lg">Surowiec: {deposit.deposit.geology.type}</p>
                    <p className="text-lg">Lokalizacja: {deposit.deposit.geography.location}</p>
                    <p className="text-lg">Region: {deposit.deposit.geography.region}</p>
                    <p className="text-lg">Szacowana ilość: {deposit.deposit.geology.estimatedVolume}</p>
                    <p className="text-lg">Głębokość: {deposit.deposit.geology.depth}</p>
                    <p className="text-lg">Status: {deposit.deposit.geology.status}</p>
                  </div>): <></>
              }
            </div>
        </Skeleton>
    )
}