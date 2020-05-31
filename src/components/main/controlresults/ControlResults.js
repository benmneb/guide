import React from 'react';
import './controlresults.css';
import BackToCategories from './BackToCategories'
import ResultsInfo from './ResultsInfo'
import SortBy from './SortBy'

const ControlResults = () => {
  return (
    <div id='cr-div'>
      <BackToCategories />
      <ResultsInfo />
      <SortBy />
    </div>
  )
}

export default ControlResults;
