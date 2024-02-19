const Search = ({filter, handleFilter}) => {
        
        return(
            <div>
                Find countries <input 
                type="text" 
                onChange={handleFilter} 
                value={filter}/>
            </div>
        )
}

export default Search
