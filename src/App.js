import React, { useState } from 'react';
import {AppBar, Toolbar, Typography, IconButton, Drawer, ListItem, ListItemIcon, ListItemText} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import InvoiceList from './InvoiceList';
import InvoiceDetail from './InvoiceDetail';
import InvoiceForm from './InvoiceForm';
import List from './List'


import './App.css';

import { useState } from 'react';
function App() {
  const [drawOpen, setDrawerOpen] = useState(false);
  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };
  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <Router>
      <AppBar Position = "Static">
        <Toolbar>
          <IconButton
            Size="large"
            edge="start"
            color="red"
            aria-label="menu"
            sx={{ mr:2 }}
            onClick={handleDrawerOpen}
          >
          <MenuIcon />
          </IconButton>
          <Typography variant = "h6" noWrap component="div" sx={{ flexGrow: 1}}>
          Invoice App
          </Typography>
        </Toolbar>
      </AppBar>
        anchor="left"
        open={drawerOpen}
        onClose = {handleDrawerClose}
        <List>
          <ListItem button onClick={handleDrawerClose}>
            <ListItemIcon>
              <ChevronRightIcon />
            </ListItemIcon>
            <ListItemText primary="Invoices" />
          </ListItem>
        </List>
      <Routes>
        <Route path="/" element={<InvoiceList />} />
        <Route path="/invoices/:id" element={<InvoiceDetail />} />
        <Route path="/invoices/new" element={<InvoiceForm />} />
        <Route path="/invoices/:id/edit" element={<InvoiceForm />} />
      </Routes>
    </Router>
  );
    
}

export default App;
