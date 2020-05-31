import React from 'react';
import './SearchBar.css';
import { TextField } from '@material-ui/core'

const SearchBar = (props) => {
  return (
    <div id='search-div'>
      <TextField
        id="main-search"
        label="Search for vegan products..."
        type="search"
        variant='outlined'
        size='small'
        fullWidth='true'
      />
    </div>
    // <div id='search-div'>
    //   <input
    //     id='search-bar'
    //     type='text'
    //     placeholder='Search for vegan products...'
    //     autocomplete="off"
    //     autocorrect="off"
    //     autocapitalize="off"
    //     spellcheck="false"
    //   />
    // </div>
  )
}

export default SearchBar;
