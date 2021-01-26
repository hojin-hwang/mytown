import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Menu from './menu_btn';
import Title from './title';
import LocationNameBtn from './location_name_btn';
import MyPlaceBtn from './my_place_btn';
import MyLocationBtn from './my_location_btn';
import ShopForm from '../dialog/shop_form';


const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  appBar : {
    color: '#fff',
    backgroundColor: '#1ca23f',
  },
});

export default function Header({authService, userOnLogin, FileInput}) {
  const classes = useStyles();
  const [locationInfo, setLocationInfo] = useState({townName:'', cityName:'', code:''});
  const [shopOpen, setShopOpen] = useState(false);
  const [userData, setUserData] = useState();
   
  const setLocationInfoFromMap = function(locationInfo)
  {   
      setLocationInfo(locationInfo);
  };

  const setFormOpen = function(form_name){
    if(form_name === 'shop')
    {
      setShopOpen(true);
    } 
    else if(form_name === 'nothing')
    {
      setShopOpen(false);
    }
  };

  const setFormClose = function(form_name){
    if(form_name === 'shop')
    {
      setShopOpen(false);
    } 
  };

  useEffect(() =>{
    authService.onAuthChange(user =>{
        if(user){
          setUserData(user);
        }
    })
},[userData]);

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Menu authService={authService} userOnLogin={userOnLogin} setFormOpen={setFormOpen}  />
          <Title />
          <LocationNameBtn  townName={`${locationInfo.cityName} ${locationInfo.townName}`} />
          {userOnLogin&& <MyPlaceBtn />}
          <MyLocationBtn setLocationInfoFromMap={setLocationInfoFromMap} />
        </Toolbar>
      </AppBar>
      <div>
              <ShopForm userData={userData} locationInfo={locationInfo} openShop={shopOpen} authService={authService} setFormClose={setFormClose} FileInput={FileInput}/>
      </div>
    </div>
  );
}