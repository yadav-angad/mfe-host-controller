import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useSelector } from 'react-redux';
import { Grid } from '@mui/material';

export default function Header() {
  const { counter } = useSelector((state) => state?.counter) ?? 0;
  return (
    <Grid xs={12} sm={12} md={12} lg={12} xl={12} item>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {'Demo Application'}
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {`Counter: ${counter ?? 0}`}
          </Typography>
        </Toolbar>
      </AppBar>
    </Grid>
  );
}
