const DisplaySelectableCountry = ({country, handleClick}) => {

    return (<div>
        <p>{country.name.common} <button onClick={handleClick} data-name={country.name.common}>show</button></p>
    </div>)

}

export default DisplaySelectableCountry