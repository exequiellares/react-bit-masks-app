import { v4 as uuid } from 'uuid';

// -12 => 1000000000000000000000000 => 16777216
// -11 => 0100000000000000000000000 =>
// -10 => 0010000000000000000000000
// -9 =>  0001000000000000000000000
// -8 =>  0000100000000000000000000
// -7 =>  0000010000000000000000000
// -6 =>  0000001000000000000000000
// -5 =>  0000000100000000000000000
// -4 =>  0000000010000000000000000
// -3 =>  0000000001000000000000000
// -2 =>  0000000000100000000000000
// -1 =>  0000000000010000000000000
// 0 =>   0000000000001000000000000 => 4096
// +1 =>  0000000000000100000000000
// +2 =>  0000000000000010000000000
// +3 =>  0000000000000001000000000
// +4 =>  0000000000000000100000000
// +5 =>  0000000000000000010000000
// +6 =>  0000000000000000001000000
// +7 =>  0000000000000000000100000
// +8 =>  0000000000000000000010000
// +9 =>  0000000000000000000001000
// +10 => 0000000000000000000000100
// +11 => 0000000000000000000000010
// +12 => 0000000000000000000000001 => 1



const getMask = (n) => {
  if (Math.abs(n) > 12) {
    throw Error('Not valid timezone')
  }
  let base = 4096 // GMT-0
  let mask = base
  if (n < 0) {
    mask = base << Math.abs(n)
  } else if (n > 0) {
    mask = base >> n
  }
  return mask
}

export const filterCities = (list, timezone) => {
  const maxValue = Math.pow(2, 25) - 1
  const filterMask = getMask(timezone)
  const resultList = list.filter(c => {
    return (getMask(c.timezone) & maxValue) === filterMask
  })
  return resultList.map(c => c.id)
}

export const citiesData = [
  {
    id: uuid(),
    name: 'Moscow',
    timezone: 3,
  },
  {
    id: uuid(),
    name: 'Paris',
    timezone: 2,
  },
  {
    id: uuid(),
    name: 'Berlin',
    timezone: 2,
  },
  {
    id: uuid(),
    name: 'Brussels',
    timezone: 2,
  },
  {
    id: uuid(),
    name: 'Amsterdam',
    timezone: 2,
  },
  {
    id: uuid(),
    name: 'Rome',
    timezone: 2,
  },
  {
    id: uuid(),
    name: 'London',
    timezone: 1,
  },
  {
    id: uuid(),
    name: 'Dublin',
    timezone: 1,
  },
  {
    id: uuid(),
    name: 'New York',
    timezone: -4,
  },
  {
    id: uuid(),
    name: 'Washington, DC',
    timezone: 2,
  },
  {
    id: uuid(),
    name: 'St. Louis',
    timezone: -5,
  },
  {
    id: uuid(),
    name: 'Los Angeles',
    timezone: -7,
  },
  {
    id: uuid(),
    name: 'Tokyo',
    timezone: 9,
  },
  {
    id: uuid(),
    name: 'Beijing',
    timezone: 8,
  },
  {
    id: uuid(),
    name: 'Ho Chi Mihn City',
    timezone: 7,
  },
  {
    id: uuid(),
    name: 'Mumbai',
    timezone: 5,
  },
]