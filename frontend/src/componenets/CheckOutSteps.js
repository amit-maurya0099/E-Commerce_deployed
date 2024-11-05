import { StepLabel, Stepper, Typography,Step } from '@mui/material'
import React from 'react'
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
const CheckOutSteps = ({activeStep}) => {
    const steps=[
        {
            label:<Typography>Shipping Details</Typography>,
            icon:<LocalShippingIcon/>
        },
        {
            label:<Typography>Confirm Order </Typography>,
            icon:<LibraryAddCheckIcon/>
        },
        {
            label:<Typography>Payment</Typography>,
            icon:<AccountBalanceIcon/>
        }

    ]
  return (
    <>
    <Stepper alternativeLabel activeStep={activeStep} className='box-border mt-8'>
        {steps.map((item,index)=> 
        <Step
         key={index}
         active={activeStep === index ? true:false}
         completed={activeStep >= index ? true:false}
        >
         <StepLabel icon={item.icon} className={`${activeStep>= index ? 'text-orange-600':'[rgba(0,0,0,0.649)]'}`}>{item.label}</StepLabel>
        </Step>
        )}

    </Stepper>
      
    </>
  )
}

export default CheckOutSteps
