import React, { Fragment } from 'react';
import Hero from './hero/Hero';
import ControlResults from './controlresults/ControlResults';
import ResultsList from './resultslist/ResultsList'

const Main = () => {
  return (
    <Fragment>
      <Hero />
      <ControlResults />
      <ResultsList />
    </Fragment>
  )
}

export default Main;
