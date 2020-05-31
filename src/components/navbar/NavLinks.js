import React from 'react';
import './NavLinks.css';
import { Button } from '@material-ui/core';
import More from './More';
import Advertise from './Advertise';
import AddProducts from './AddProducts'

const NavLinks = () => {
  const [openDialog, setOpenDialog] = React.useState(null);

  const openAdvertise = () => {
    setOpenDialog('Advertise');
  };

  const openAddProducts = () => {
    setOpenDialog('AddProducts');
  };

  const closeDialog = () => {
    setOpenDialog(null);
  };

  return (
    <div id='nav-links-div'>
      <ul>
        <li>
          <Button>
            Donate
          </Button>
        </li>
        <li>
          <Button onClick={openAdvertise}>
            Advertise
          </Button>
        </li>
        <li>
          <Button onClick={openAddProducts} variant='outlined' color='primary'>
            Add Products
          </Button>
        </li>
        <li>
          <More />
        </li>
      </ul>
        <Advertise open={openDialog === 'Advertise'} onClose={closeDialog} />
        <AddProducts open={openDialog === 'AddProducts'} onClose={closeDialog} />
    </div>
  )
}

export default NavLinks;
