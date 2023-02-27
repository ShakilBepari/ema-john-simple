import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { userContext } from '../../App';
import './Shipment.css';
const Shipment = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);
  
   const [logedInUser] = useContext(userContext)
    
    return (
      <form className='ship-form' onSubmit={handleSubmit(onSubmit)}>
        <input defaultValue={logedInUser.name} {...register("name", { required: true }) } placeholder='Your Name' />
        {errors.name && <span className='error'>This field is required</span>}
        <input defaultValue={logedInUser.email} {...register("email", { required: true })} placeholder='Your Email' />
        {errors.email && <span className='error'>This field is required</span>}
        <input {...register("address", { required: true })} placeholder='Your Address' />
        {errors.address && <span className='error'>This field is required</span>}
        <input {...register("phone", { required: true })} placeholder='Your Phone Number' />
        {errors.phone && <span className='error'>This field is required</span>}
        <input type="submit" />
      </form>
    );
};

export default Shipment;