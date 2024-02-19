import Country from "./Country";
import DisplaySelectableCountry from "./DisplayedCountry";

const Countries = ({countries, handleClick}) => {
    console.log("received countries", countries);
    if(!countries || countries.length === 0)
    {
        return <div>

        </div>
    }
    if(countries.length >10 ) {
        return <div>
            <p>Too many matches, specify another filter</p>
        </div>
    }

    else if (countries.length > 1 && countries.length <= 10)
    {
        return <div>
            {countries.map( country =>
                    <DisplaySelectableCountry  key={country.name.common} country={country} handleClick={handleClick}/>
                )
            }
        </div>
    }

    return ( 
        <Country country={countries[0]} />
    )

}

export default Countries
