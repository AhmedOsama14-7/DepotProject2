import { ErrorMessage, Form, Formik } from "formik";
import React, { useState } from "react";
import {addressesValidation} from "../../validations/Validations"
import {
  CountryDropdown,
  RegionDropdown,
  CountryRegionData,
} from "react-country-region-selector";
import Input from "../input/Input";
import { useNavigate } from "react-router-dom";

export default function Addresses() {
  const [country, setCountry] = useState(localStorage.getItem("country"));
  const [region, setRegion] = useState(localStorage.getItem("region"));
  const [firstName, setFirstName] = useState(localStorage.getItem("firstName"));
  const [secondName, setSecondName] = useState(localStorage.getItem("secondName"));
  const [companyName, setCompanyName] = useState(localStorage.getItem("companyName"));
  const [town, setTown] = useState(localStorage.getItem("town"));
  const [streetAddress, setStreetAddress] = useState(localStorage.getItem("streetAddress"));
  const [apartmentAddress, setApartmentAddress] = useState(localStorage.getItem("apartmentAddress"));
  const [err , setErr] = useState("")
  const navigate = useNavigate()

    const initialValues ={
        firstName:"",
        secondName:"",
        companyName:"",
        town:"",
        streetAdress:"",
        apartmentAddress:"",
        country:"",
        region:""
    }


    const onSubmit = (values) =>{
        if(country && region) {
            localStorage.setItem("firstName" , values.firstName)
            localStorage.setItem("secondName" , values.secondName )
            localStorage.setItem("companyName" , values.companyName )
            localStorage.setItem("town" , values.town)
            localStorage.setItem("streetAddress" ,values.streetAddress )
            localStorage.setItem("apartmentAddress" ,values.apartmentAddress )
            localStorage.setItem("country" , country )
            localStorage.setItem("region" , region )
            navigate("/")

        } else{
                setErr("Please Fill Country and State")
        }
    }



  return (
    <div className="addresses">
      <h4>Shipping Address</h4>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={addressesValidation}>
        <Form action="">
            <Input name={"firstName"} placeHolder={firstName} label={"First Name"} isDefault={true}></Input>
            <Input name={"secondName"} placeHolder={secondName} label={"Second Name"} isDefault={true}></Input>
            <Input name={"companyName"} placeHolder={companyName} label={"Company Name (optional)"} isDefault={true}></Input>
            <label for="country">Country</label>
          <CountryDropdown
            value={country}
            onChange={(val) => setCountry(val)}
            id="country"
            classes="option"
            name="country"
          />
          <ErrorMessage name="country" component="p" style={{color : "red"}} />

            <label for="state">state</label>

          <RegionDropdown
            country={country}
            value={region}
            onChange={(val) => setRegion(val)}
            id="state"
            name="region"
          />
          <ErrorMessage name="region" component="p" style={{color : "red"}} />
            <Input name={"town"} placeHolder={town} label={"City / town"} isDefault={true}></Input>
            <Input name={"streetAddress"} placeHolder={streetAddress} label={"Street Adress"} isDefault={true}></Input>
            <Input name={"apartmentAddress"} placeHolder={apartmentAddress} label={"Apartment Address"} isDefault={true}></Input>
            <p className="err">{err}</p>
            <input className="submit" type="submit" value="Save Changes" />   
        </Form>
      </Formik>
    </div>
  );
}
