import type { Route } from "./+types/home";
import { useParams } from "react-router";
import { ModifyPage } from "../layouts/ModifyPage"


export async function clientLoader() {
    const data = localStorage.getItem('data')
    const jsonData = data ? JSON.parse(data) : {}
    return jsonData
}

export default function Modify({loaderData}: Route.ComponentProps) {
    const { id } = useParams();
    const content = loaderData && id ? loaderData[id] : {}
    
    return (
        <ModifyPage content={content} id={id}/>
    );
}