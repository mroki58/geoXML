import React from 'react'
import Skeleton from "../components/Skeleton";
import { Link } from "react-router";
import { MdEdit, MdDelete } from "react-icons/md"
import { useNavigate } from 'react-router';

function deleteByName(name: string, setData: Function)
{
    fetch(`/api/deposit/name?nodeName=deposit&attrName=name&attrValue=${name}`, {
        method: 'delete'
    }).then(res => res.json())
    .then(res => {
        // usuniecie z localstorage
        const storedData = localStorage.getItem('data');
        let data = storedData ? JSON.parse(storedData) as any : {};
        delete data[name]
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
                    onClick={() => deleteByName(deposit.deposit['@name'], setData)}
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
    return (<ul className="flex">

        {Object.keys(content).map((key: string, id: number) => {
            return <ListItem key={key} id={key} no={id} deposit={content[key]} setData={setData}/>
        })}

        </ul>
    )
}



export function ListPage({content}: any) {
    const [data, setData] = React.useState<any>(content)
    
    return (
        <Skeleton> 
            <div className="col-span-3 row-span-3 w-full h-96 overflow-auto flex justify-center">
                <List content={data} setData={setData}/> 
            </div>
        </Skeleton>
    );
}