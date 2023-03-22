
function Record({currencies,actCurrency,number,onCurrencyChange,onNumberChange,currency}) {
    // console.log(currency,parseFloat(number))
    const currencyItems = Array.from(Array(parseFloat(number)).keys())
    // console.log(currencyItems)
    const items = async (currency,number) => {
        try {
            const list = await fetch(`http://api.nbp.pl/api/exchangerates/rates/A/${currency}/last/${number}/`,{
                headers: {Accept: 'application/json'}
            })
                .then(res=>res.json())
            return list
        } catch (e) {
            console.error(e)
        }
    }
    // const currencyItemsList = currencyItems.map(el =>
    //     <li className='list-unstyled'>{date} | 4.7546</li>
    // )
    items(currency,number)
    return (
        <>
            <li className='list-unstyled'>20-03-2023 | 4.7546</li>

        </>
    )
}
export default Record;