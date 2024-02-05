const PersonForm = ({name, handleName, number, handleNumber, handleSubmit}) => {

    return <form onSubmit={handleSubmit}>
                <div>
                name: <input
                    value={name}
                    onChange={handleName}
                />
                </div>
                <div>
                number: <input 
                    value={number} 
                    onChange={handleNumber}
                />
                </div>
                <div>
                <button type="submit">
                    add
                </button>
                </div>
            </form>

}


export default PersonForm