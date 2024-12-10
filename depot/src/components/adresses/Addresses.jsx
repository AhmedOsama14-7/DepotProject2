import { ErrorMessage, Form, Formik } from "formik";
import React, { useState } from "react";
import { addressesValidation } from "../../validations/Validations";
import Loader from "../loader/Loader"
import {
  CountryDropdown,
  RegionDropdown,
  CountryRegionData,
} from "react-country-region-selector";
import Input from "../input/Input";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { AxiosConfig } from "../../axios/axiosConfig";
import { accountDetails } from "../../api/api";

export default function Addresses() {
  const [country, setCountry] = useState("");
  const [id, setId] = useState(localStorage.getItem("id"));
  const [region, setRegion] = useState("");
  const [err , setErr ] =useState("")
  const navigate = useNavigate();

  const {data , isLoading} = accountDetails(id)
  const initialValues = {
    firstName: "",
    secondName: "",
    companyName: "",
    town: "",
    streetAdress: "",
    apartmentAddress: "",
    country: "",
    region: "",
  };

  const addressMutation = useMutation({
    mutationFn: async (values) => {
      await AxiosConfig(`users/${id}?populate=*`, {
        method: "PUT",
        data: {
          firstName: values.firstName,
          secondName: values.secondName,
          companyName: values.companyName,
          town: values.town,
          streetAddress: values.streetAddress,
          apartmentAddress: values.apartmentAddress,
          country:country ,
          state: region,
        },
      });
    },
    onSuccess : () =>{
      navigate("/")
    } , onError:(err)=>{
      console.log(err);
      setErr(err)
    }
  });

  const onSubmit = (values) => {
    if (country && region) {
      addressMutation.mutate(values , id)
    } else {
      setErr("Please Fill Country and State");
    }
  };

  if(isLoading) return <Loader ></Loader>
  return (
    <div className="addresses">
      <h4>Shipping Address</h4>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={addressesValidation}
      >
        <Form action="">
          <Input
            name={"firstName"}
            placeHolder={data?.data?.firstName}
            label={"First Name"}
            isDefault={true}
          ></Input>
          <Input
            name={"secondName"}
            placeHolder={data?.data?.secondName}
            label={"Second Name"}
            isDefault={true}
          ></Input>
          <Input
            name={"companyName"}
            placeHolder={data?.data?.companyName}
            label={"Company Name (optional)"}
            isDefault={true}
          ></Input>
          <label for="country">Country</label>
          <CountryDropdown
            value={country}
            onChange={(val) => setCountry(val)}
            id="country"
            classes="option"
            name="country"
          />
          <ErrorMessage name="country" component="p" style={{ color: "red" }} />

          <label for="state">state</label>

          <RegionDropdown
            country={country}
            value={region}
            onChange={(val) => setRegion(val)}
            id="state"
            name="region"
          />
          <ErrorMessage name="region" component="p" style={{ color: "red" }} />
          <Input
            name={"town"}
            placeHolder={data?.data?.town}
            label={"City / town"}
            isDefault={true}
          ></Input>
          <Input
            name={"streetAddress"}
            placeHolder={data?.data?.streetAddress}
            label={"Street Adress"}
            isDefault={true}
          ></Input>
          <Input
            name={"apartmentAddress"}
            placeHolder={data?.data?.apartmentAddress}
            label={"Apartment Address"}
            isDefault={true}
          ></Input>
          <p className="err">{err}</p>
          <input className="submit" type="submit" value={`${addressMutation.isLoading ? "...Loading" : "Save Changes"}`} />
        </Form>
      </Formik>
    </div>
  );
}
