import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { filterSelected } from './app/store';

import { citiesData, filterCities } from './data';

import './App.css';

const City = ({ city, checked }) => {
  console.log('city', city)
  let timezoneString = 'GMT'
  if (city.timezone > 0) {
    timezoneString = `GMT+${city.timezone}`
  } else if (city.timezone < 0) {
    timezoneString = `GMT${city.timezone}`
  }
  return (
    <div>
      <input type="checkbox" value={city.name} checked={checked} readOnly={true} />{`${city.name} ${timezoneString}`}
    </div>
  )
}

const SearchForm = () => {
  const [timezone, setTimezone] = useState(null)
  const dispatch = useDispatch()
  const findCities = e => {
    e.preventDefault()
    if (timezone >= -12 && timezone <= 12) {
      dispatch(filterSelected(timezone))
    }
  }

  return (
    <form onSubmit={findCities}>
      <label>Filter</label>
      <input type="number" placeholder="" max={12} min={-12} value={timezone} onChange={e => setTimezone(e.target.value)} />
      <button type="button" onClick={findCities}>Find Cities</button>
    </form>
  )
}

const App = () => {
  const timezone = useSelector(state => state.filter.value)
  const result = filterCities(citiesData, timezone)
  console.log('result', result)
  const renderedCities = citiesData.map(c => <City key={c.id} city={c} checked={result.includes(c.id) ? true : false} />)
  return <div className="App">
    <h1>Bit Masks App</h1>
    <section>
      <SearchForm />
    </section>
    <section className="cities-list">
      {renderedCities}
    </section>
  </div>
}

export default App;
