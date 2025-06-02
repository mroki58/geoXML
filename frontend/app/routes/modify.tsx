import { useParams } from "react-router";

export default function ModifyPage() {
    const { id } = useParams();

    return (
        <div>
            <h1>Modyfikuj rekord</h1>
            <p>ID rekordu: {id}</p>
            {/* Tutaj możesz dodać formularz do edycji rekordu o danym ID */}
        </div>
    );
}