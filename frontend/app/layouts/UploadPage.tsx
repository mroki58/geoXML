import Skeleton from "../components/Skeleton";
import { Form } from "react-router";

// Komponent pola tekstowego
function TextInput({ label, id, name, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
    return (
        <>
            <label htmlFor={id}>{label}</label>
            <input
                id={id}
                name={name}
                {...props}
                className="border border-gray-300 rounded px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
        </>
    );
}

// Komponent selecta statusu
function StatusSelect() {
    return (
        <>
            <label htmlFor="status">Status:</label>
            <select
                id="status"
                name="status"
                required
                className="border border-gray-300 rounded px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
                <option value="eksploatowane">Eksploatowane</option>
                <option value="nieeksploatowane">Nieeksploatowane</option>
                <option value="zidentyfikowane">Zidentyfikowane</option>
                <option value="potencjalne">Potencjalne</option>
                <option value="zlikwidowane">Zlikwidowane</option>
            </select>
        </>
    );
}

// Komponent sekcji geologii
function GeologyFields() {
    return (
        <fieldset className="flex flex-col">
            <legend className="pb-6">Geologia</legend>
            <TextInput label="Typ:" id="type" name="type" type="text" required />
            <TextInput label="Szacowana objętość (m³):" id="estimatedVolume" name="estimatedVolume" type="number" step="0.01" required />
            <TextInput label="Głębokość (m):" id="depth" name="depth" type="number" step="0.01" required />
            <StatusSelect />
        </fieldset>
    );
}

// Komponent sekcji geografii
function GeographyFields() {
    return (
        <fieldset className="flex flex-col">
            <legend className="pb-6">Geografia</legend>
            <TextInput label="Lokalizacja:" id="location" name="location" type="text" required />
            <TextInput label="Region:" id="region" name="region" type="text" required />
            <TextInput
                label="Szerokość geograficzna:"
                id="latitude"
                name="latitude"
                type="number"
                step="0.000001"
                required
                min={-90}
                max={90}
                placeholder="np. 50.3001"
            />
            <TextInput
                label="Długość geograficzna:"
                id="longitude"
                name="longitude"
                type="number"
                step="0.000001"
                required
                min={-180}
                max={180}
                placeholder="np. 16.4375"
            />
            <TextInput label="Promień (km):" id="radius" name="radius" type="number" step="0.01" required />
        </fieldset>
    );
}

async function onFormSubmit(event: any) {
    event.preventDefault();

    const form = event.currentTarget;

    const depositName = (form.elements.namedItem("depositName") as HTMLInputElement)?.value;
    const type = (form.elements.namedItem("type") as HTMLInputElement)?.value;
    const estimatedVolume = (form.elements.namedItem("estimatedVolume") as HTMLInputElement)?.value;
    const depth = (form.elements.namedItem("depth") as HTMLInputElement)?.value;
    const status = (form.elements.namedItem("status") as HTMLSelectElement)?.value;
    const location = (form.elements.namedItem("location") as HTMLInputElement)?.value;
    const region = (form.elements.namedItem("region") as HTMLInputElement)?.value;
    const latitude = (form.elements.namedItem("latitude") as HTMLInputElement)?.value;
    const longitude = (form.elements.namedItem("longitude") as HTMLInputElement)?.value;
    const radius = (form.elements.namedItem("radius") as HTMLInputElement)?.value;

    const payload = {
        name: depositName,
        type,
        estimatedVolume: parseFloat(estimatedVolume),
        depth: parseFloat(depth),
        status,
        location,
        region,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        radius: parseFloat(radius)
    };

    try {
        // Pobieranie XML z backendu - tworzenie go tam
        const xmlResponse = await fetch("/api/xml/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });
        const xml = await xmlResponse.text();

        // Wysłanie go do zapisania w bazie
        const addResponse = await fetch("/api/xml", {
            method: "POST",
            headers: {
                "Content-Type": "application/xml"
            },
            body: xml
        });
        const addResult = await addResponse.text();
        console.log("Odpowiedź z dodawania do bazy:", addResult);
    } catch (error) {
        console.error("Błąd podczas wysyłania danych:", error);
    }
}



export function UploadPage() {
    return (
        <Skeleton>
            <div className="col-span-3 row-span-3 h-[100%]">
                <h2 className="ml-12"><strong>Formularz Złoża</strong></h2>

                <Form onSubmit={onFormSubmit}>
                    <div className="flex gap-32 justify-center mt-20">
                        <div className="flex flex-col mt-40">
                            <TextInput label="Nazwa złoża (name):" id="depositName" name="depositName" type="text" required />
                        </div>
                        <div>
                            <GeologyFields />
                        </div>
                        <div>
                            <GeographyFields />
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <input
                            type="submit"
                            value="Wyślij"
                            className="border border-gray-300 rounded px-3 py-2 mt-2 bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-colors cursor-pointer"
                        />
                    </div>
                </Form>
            </div>
        </Skeleton>
    );
}