import Country from "./Country";

const Countries = ({countries}) => {
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
                    <p key={country.name.common}>{country.name.common}</p>
                )
            }
        </div>
    }

    return ( 
        <Country country={countries[0]} />
    )

}

export default Countries
