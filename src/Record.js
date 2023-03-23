function Record({date, record}) {
    return (
        <>
            <li className='list-unstyled'>{date} | {record}</li>
        </>
    )
}
export default Record;