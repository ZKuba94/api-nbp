import {useEffect} from "react";
import {useState} from "react";
function Record({number, currency}) {
    const [table,setTable] = useState([])

    useEffect(()=> {
        fetch(`https://api.nbp.pl/api/exchangerates/rates/A/${currency}/last/${number}/`)
            .then(data => data.json()).then(list => setTable(list.rates))},[])
    console.log(table)
    return (
        <>
            {table.map(item => (
                <li className='list-unstyled'>{item.effectiveDate} | {item.mid}</li>
            ))}
        </>
    )
}

export default Record;