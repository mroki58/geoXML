import React, { useRef, useState } from 'react'
import Skeleton from "../components/Skeleton";
import { MdEdit, MdDelete } from "react-icons/md"
import { useNavigate } from 'react-router';
import { getAllBackendData } from '../utils/fetchContent'

function deleteByName(name: string, setData: Function, id: number)
{
    fetch(`/api/deposit/name?nodeName=deposit&attrName=name&attrValue=${name}`, {
        method: 'delete'
    }).then(res => res.json())
    .then(res => {
        // usuniecie z localstorage
        const storedData = localStorage.getItem('data');
        let data = storedData ? JSON.parse(storedData) as any : {};
        delete data[id]
        localStorage.setItem('data', JSON.stringify(data))
        setData(data)
        alert(JSON.stringify(res))
    })
}

function ListItem({no, deposit, setData, id}: any)
{
    let navigate = useNavigate()

    return (
        <li>
            <div className="border-5 border-[green] pl-10 pr-5 py-4 mb-1 mr-2 flex items-center">
                <span className="pr-5">{no}. {deposit.deposit['@name']}</span>
                <button
                    id={id}
                    onClick={() => navigate(`/modify/${id}`)}
                    className="hover:cursor-pointer bg-blue-500 hover:bg-blue-600 text-white rounded px-3 py-2 ml-2 transition-shadow shadow-sm hover:shadow-blue-200 flex items-center"
                >
                    <MdEdit size={24} />
                </button>
                <button
                    id={id}
                    onClick={() => deleteByName(deposit.deposit['@name'], setData, id)}
                    className="hover:cursor-pointer bg-red-500 hover:bg-red-600 text-white rounded px-3 py-2 ml-2 transition-shadow shadow-sm hover:shadow-red-200 flex items-center"
                >
                    <MdDelete size={24} />
                </button>
            </div>
        </li>
    )
}

function List({content, setData}: any)
{
    return (
        <ul className="flex flex-wrap justify-center items-stretch">
            {Object.keys(content).map((key: string, id: number) => {
                return <ListItem key={key} id={key} no={id} deposit={content[key]} setData={setData}/>
            })}
        </ul>
    )
}

const Button = ({label, onClick, className}: React.ComponentProps<any>) => 
    <button onClick={onClick} className={className}>
        {label}
    </button>

const HeaderButtons = ({locationUI, setLocationUI, refreshData}: any) => {
    async function dropWhereQuantityLessThan100() {
        await fetch("/api/deposit/quantity?maxValue=100", {
            method: 'delete'
        })
        .then(res => res.json())
        .then(res => {
            alert(JSON.stringify(res))
            refreshData();
        })
    }

    function toggleLocationUI() {
        setLocationUI((prev: boolean) => !prev)
    }
    
    return (<div>
        <Button label="Zlikwiduj znikające złoża" className="hover:cursor-pointer bg-red-500 hover:bg-red-600 text-white rounded px-3 py-2 transition-shadow shadow-sm hover:shadow-red-200 mr-3" onClick={dropWhereQuantityLessThan100}/>
        <Button label="Usuń region" className="hover:cursor-pointer bg-red-500 hover:bg-red-600 text-white rounded px-3 py-2  transition-shadow shadow-sm hover:shadow-red-200 mr-60" onClick={toggleLocationUI}/>
    </div>)
}

function ModalCenter({ open, children, onClose }: { open: boolean, children: React.ReactNode, onClose: () => void }) {
    if (!open) return null;
    return (
        <> 
            <div
                className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
                onClick={onClose}
            />
            <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
                <div
                    className="bg-white rounded-lg shadow-lg p-8 min-w-[300px] pointer-events-auto"
                    onClick={e => e.stopPropagation()}
                >
                    {children}
                </div>
            </div>
        </>
    );
}

export function ListPage({content}: any) {
    const [data, setData] = useState<any>(content)
    const [locationUI, setLocationUI] = useState<boolean>(false)
    const inputRef = useRef<HTMLInputElement>(null);

    // Funkcja do pobrania nowych danych z backendu (jak w routes/list.tsx)
    async function refreshData() {
        const loadedData = await getAllBackendData();
        // Parsowanie jak w routes/list.tsx
        const { parser } = await import("../utils/xmlparser");
        let parsedData: any = {};
        Object.keys(loadedData).forEach((key) => {
            parsedData[key] = parser.parse(loadedData[key]);
        });
        setData(parsedData);
        localStorage.setItem('data', JSON.stringify(parsedData));
    }

    async function handleFetch() {
        const value = inputRef.current?.value || "";
        await fetch(`/api/deposit/location?nodeValue=${value}`, { method: "DELETE" })
            .then(res => res.json())
            .then(res => {
                alert(JSON.stringify(res));
                refreshData();
            })
    }

    return (
        <Skeleton headerChildren={<HeaderButtons setLocationUI={setLocationUI} locationUI={locationUI} refreshData={refreshData}/>}> 
            <div className="col-span-3 row-span-3 h-[100%] overflow-auto flex justify-center">
                <List content={data} setData={setData}/> 
            </div>
            <ModalCenter open={locationUI} onClose={() => setLocationUI(false)}>
                <div className="text-center">
                    <h2 className="text-xl font-bold mb-4">Podaj nazwę lokacji, której złoża chcesz zlikwidować</h2>
                    <input
                        type="text"
                        ref={inputRef}
                        className="border border-gray-300 rounded px-3 py-2 w-full mb-4"
                        placeholder="Wpisz coś..."
                    />
                    <button
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-blue-600"
                        onClick={handleFetch}
                    >
                        Usuń
                    </button>
                    <button
                        className="mt-6 px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 ml-4"
                        onClick={() => setLocationUI(false)}
                    >
                        Zamknij
                    </button>
                </div>
            </ModalCenter>
        </Skeleton>
    );
}