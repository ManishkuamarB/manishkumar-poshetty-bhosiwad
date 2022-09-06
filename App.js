import React from "react";
import { useForm } from "react-hook-form";
import react,{useState,useEffect} from 'react';
import "./App.css";

function App() {
  const {register, handleSubmit, formState: { errors } } = useForm();


  
  return (
    <div className="App"style={{backgroundColor:"rgb(12, 7, 8)"}}>
      
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"></link>
      <div class="container  d-flex justify-content-center">
        <div class="card mt-4 col-md-6  ">
            <div class="card-body m-2">
            <h2 class=" text-center">B-Tech Coffee</h2>
                <h5 class=" text-center">Registration Form</h5>
        <form   action='../../Sign' method="post">
          <center>
          <div className="col-md-6 mb-6">
            <label className="form-label">First name</label>
            <input type="text"  class="form-control" name="fname" {...register("fname",{ required: true,maxLength:10 })}/>
            {errors.name && <span style={{ color: "red" }}>
            *Name* is mandatory </span>}
                       
          </div>
          <div class="col-md-6 mb-3">
                        <label class="form-label">Last name</label>
                        <input type="text" class="form-control" name="lname"   {...register("lname", { required: true })}
                        onkeyup="this.value=this.value.replace(/[^A-z]/g,'');"/>
                      
                        {errors.lname && <span style={{ color: "red" }}>
                        *Last Name* is mandatory </span>}
                    </div>
                    <div class="col-md-6">
                       
                       <label class="form-label">Mobile</label>
                       <input type="text" name="mobile" class="form-control"  {...register("mobile", { required: true })}
                       onkeyup="if(!$.isNumeric(this.value)){this.value = this.value.slice(0,-1)}" pattern="[0-9]+" maxlength="10" minlength="10"
                       title="Mobile number should contain only 10 digits!"required />

                       {errors.mobile && <span style={{ color: "red" }}>
                        *Mobile Number* is mandatory </span>}

                   </div>
                    <div class="col-md-6 mb-3">
                        <label class="form-label">Email</label>
                        <input type="email" required class="form-control" name="email" {...register("email", { required: true })}/>
                        <br></br>
                        {errors.email && <span style={{ color: "red" }}>
                        *Email* is mandatory </span>}
                     </div>   
                    <div class="col-md-6 mb-3" >
                        <label for="validationCustom04" class="form-label">State</label>
                        <select class="form-select" id="validationCustom04" name="select1"{...register("select1", { required: true })}>
                            <option selected disabled value="">select State</option>
                            <option>Maharashtra</option>
                            <option>Goa</option>
                            <option>MP</option>
                            <option>UP</option>
                            <option>Delhi</option>
                        </select>
                        {errors.select1 && <span style={{ color: "red" }}>
                        *State* is mandatory </span>}
                        
                    </div>
                    <div class="col-md-6 mb-3 mb-3">
                        <label class="form-label">City</label>
                        <input type="text" class="form-control" name="city" {...register("city", { required: true })}/>
                        {errors.city && <span style={{ color: "red" }}>
                        *city* is mandatory </span>}
                    </div>
                    <div class="col-md-6 mb-3">
                        <label class="form-label">Password</label>
                        <input type="password" class="form-control" minlength="6" name="password" id="password1" {...register("password", { required: true })}/>
                        {errors.password && <span style={{ color: "red" }}>
                        *password* is mandatory </span>}
                    </div>
                    <div class="col-md-6 mb-3">
                        <label class="form-label">Confirm Password</label>
                      
                        <input type="password" name="cpassword" class="form-control" {...register("cpassword", { required: true })}/>
                        {errors.cpassword && <span style={{ color: "red" }}>email
                        *State* is mandatory </span>}
                    </div>
                    <div class=" mt-2 d-flex justify-content-center">
                        <button class="btn btn-primary col-md-2" type="submit" onclick="location.href='login.html'">Register</button>
                    </div>

         </center>
        </form>
        </div>
    </div>
    </div>
    </div>
  );
}
export default App;