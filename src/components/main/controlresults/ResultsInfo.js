import React from 'react'

let numOfResults = 213;
let category = 'Confectionary';
let countryCode = 'Australia';

const ResultsInfo = () => {
  return (
    <div id='results-info-div'>
      <span id='results-info'>
        There are {numOfResults} vegan products in {category} within {countryCode}
      </span>
    </div>
  )
}

export default ResultsInfo;
