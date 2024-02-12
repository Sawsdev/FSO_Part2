import { useState, useEffect } from 'react'

function App() {
  const [filter, setFilter] = useState('')

  const handleFilter = (event) => {
    const text = event.target.value.toLowerCase()
    setFilter(text)
  }

  return (
    <div>
      <form >
        <div>
          Find countries <input type="text" onChange={handleFilter} value={filter}/>
        </div>
      </form>
    </div>
  )
}

export default App
