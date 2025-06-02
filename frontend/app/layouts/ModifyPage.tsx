import Skeleton from "../components/Skeleton";
import { useState } from "react";
import {MdCheck} from "react-icons/md"

const MyInput = ({ name, value, setValue, label, id, type = "text", step, min, max }: any) => {
    const updateField = async (field: string, value: string | number) => {
       
        let payload = {} as any;
        payload[field] = value;

        console.log(payload)

        await fetch(`/api/deposit/${field}/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        })
            .then(res => res.json())
            .then(res => {
                alert(JSON.stringify(res));
            });
    };

    return (
        <div className="flex items-center gap-2 my-2 justify-end">
            <label className="w-120 font-medium">{label}:</label>
            <input

                type={type}
                name={name}
                value={value}
                onChange={e => setValue(e.target.value) }
                className="w-140 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                {...(type === "number" ? { step, min, max } : {})}
            />
            <button
                type="button"
                onClick={() => updateField(name, value)}
                className="hover:cursor-pointer bg-green-500 hover:bg-green-600 text-white rounded px-3 py-2 ml-2 transition-shadow shadow-sm hover:shadow-green-200"
            >
                <MdCheck />
            </button>
        </div>
    );
};

export function ModifyPage({ content, id }: any) {
    const record = content?.deposit || {};

    const [name, setName] = useState(record['@name'] || "");
    const [latitude, setLatitude] = useState(record.geography.latitude || "");
    const [longitude, setLongitude] = useState(record.geography.longitude || "");
    const [radius, setRadius] = useState(record.geography.radius || "");
    const [quantity, setQuantity] = useState(record.geology.estimatedVolume || "");

    return (
        <Skeleton>
            <span className="col-span-3 flex justify-center mb-4 text-lg font-semibold">Edytuj element o id = {id}</span>
            <div className="col-span-3 row-span-3 flex flex-col items-center">
                <MyInput label="Nazwa" name="name" value={name} setValue={setName} id={id} type="text" />
                <MyInput
                    label="Szerokość geograficzna"
                    name="latitude"
                    value={latitude}
                    setValue={setLatitude}
                    id={id}
                    type="number"
                    step="0.000001"
                    min={-90}
                    max={90}
                />
                <MyInput
                    label="Długość geograficzna"
                    name="longitude"
                    value={longitude}
                    setValue={setLongitude}
                    id={id}
                    type="number"
                    step="0.000001"
                    min={-180}
                    max={180}
                />
                <MyInput
                    label="Promień (km)"
                    name="radius"
                    value={radius}
                    setValue={setRadius}
                    id={id}
                    type="number"
                    step="0.01"
                    min={0}
                />
                <MyInput
                    label="Ilość (t)"
                    name="quantity"
                    value={quantity}
                    setValue={setQuantity}
                    id={id}
                    type="number"
                    step="0.01"
                    min={0}
                />
            </div>
        </Skeleton>
    );
}