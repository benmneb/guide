import React from 'react';
import { Button } from '@material-ui/core'

const BackToCategories = () => {
  return (
    <div id='back-button-div'>
      <Button variant="contained" color="primary" size='large' disableElevation>
        View All
      </Button>
    </div>
  )
}

export default BackToCategories;
