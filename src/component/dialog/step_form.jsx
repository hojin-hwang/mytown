import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LocationEditByMap from '../contents/location_edit_by_map';
import ShopInfoEdit from './shop_info_edit';
import ShopSignEdit from './shop_sign_edit';
import validate from '../../service/validate'
import useForm from '../../service/use_form';

const useStyles = makeStyles((theme) => ({
  root : {
        padding : "1em",
  },
  default : {
      display:"none",
  },
  currentStep : {
    display:"block",
    backgroundColor : "pink",
  },
  stepper : {
    position: "fixed",
    bottom: 0,
    right: 0,
    left: 0,
  },
  hide: { display: 'none',}
}));

export default function StepForm({shop_data, FileInput}) {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const [firstStep, setFirstStep] = React.useState(true);
  const [secondStep, setSecondStep] = React.useState(false);
  const [thirdStep, setThirdStep] = React.useState(false);


  const { values, errors, submitting, handleChange, handleSubmit, locationChagne } = useForm({
    initialValues: {
      user_id : shop_data.user_id,  
      id : shop_data.id, 
      shop_name : shop_data.shop_name, 
      lat : shop_data.lat, 
      lng :  shop_data.lng, 
      city_name : shop_data.city_name, 
      town_name : shop_data.town_name, 
      address : shop_data.address, 
      shop_sign : shop_data.shop_sign, 
      shop_tel : shop_data.shop_tel, 
      shop_desc : shop_data.shop_desc },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2))
    },
    validate,
  })

    
  const maxSteps = 3;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    
    setCurrentForm(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setCurrentForm(activeStep -1);
  };

  const setCurrentForm = (activeStep) => {
    (activeStep === 0) ? setFirstStep(true)  : setFirstStep(false);
    (activeStep === 1) ? setSecondStep(true)  : setSecondStep(false);
    (activeStep === 2) ? setThirdStep(true)  : setThirdStep(false);
  }

  return (
    <div >
          <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
              <div className={clsx({ [classes.hide]: !firstStep })}>
                  <LocationEditByMap  shop_data={shop_data} locationChagne={locationChagne}/>
              </div> 
              <div className={clsx({ [classes.hide]: !secondStep })} >
                  <ShopInfoEdit shop_data={shop_data} handleChange={handleChange}/>
              </div> 
              <div className={clsx({ [classes.hide]: !thirdStep })}>
                  <ShopSignEdit shop_data={shop_data} FileInput={FileInput} handleChange={handleChange}/>
              </div>
          </form>    

      <MobileStepper
        className = {classes.stepper}
        steps={maxSteps}
        position="static"
        variant="dots"
        activeStep={activeStep}
        nextButton={
          <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
            Next
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            Back
          </Button>
        }
      />

    </div>
  );
}