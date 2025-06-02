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

    return (<li>
        <div>
            {no}. {deposit.deposit['@name']}

            <button id={id} onClick={(e) => {navigate(`/modify/${id}`) }}> <MdEdit/> </button>
            <button id={id} onClick={() => deleteByName(deposit.deposit['@name'], setData)}> <MdDelete /> </button>

        </div>
    </li>)
}

function List({content, setData}: any)
{
    return (<ul>

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
            <List content={data} setData={setData}/> 
        </Skeleton>
    );
}