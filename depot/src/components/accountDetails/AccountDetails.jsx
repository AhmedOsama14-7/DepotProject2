import { Form, Formik, validateYupSchema } from "formik";
import React, { useState } from "react";
import Input from "../input/Input";
import { profileValidations } from "../../validations/Validations";
import { useMutation } from "react-query";
import { AxiosConfig } from "../../axios/axiosConfig";

export default function AccountDetails() {
  const [name, setName] = useState(localStorage.getItem("name"));
  const [email, setEmail] = useState(localStorage.getItem("email"));
  const [jwt, setJwt] = useState(localStorage.getItem("jwt"));
  const [country, setCountry] = useState(localStorage.getItem("country"));
  const [region, setRegion] = useState(localStorage.getItem("region"));
  const [firstName, setFirstName] = useState(localStorage.getItem("firstName"));
  const [secondName, setSecondName] = useState(
    localStorage.getItem("secondName")
  );
  const [companyName, setCompanyName] = useState(
    localStorage.getItem("companyName")
  );
  const [town, setTown] = useState(localStorage.getItem("town"));
  const [streetAddress, setStreetAddress] = useState(
    localStorage.getItem("streetAddress")
  );
  const [apartmentAddress, setApartmentAddress] = useState(
    localStorage.getItem("apartmentAddress")
  );

  return (
    <div className="accountDetails">
      <ul>
        <li>
          <h6>Display Name :</h6>

          <p> {name} </p>
        </li>
        <li>
          <h6>Email :</h6>

          <p> {email} </p>
        </li>
        {country ? (
          <>
            { companyName ?<li>
              <h6>Company Name :</h6>

              <p> {companyName} </p>
            </li> : ""}
            <li>
              <h6>First Name :</h6>

              <p> {firstName} </p>
            </li>
            <li>
              <h6>Second Name :</h6>

              <p> {secondName} </p>
            </li>
            <li>
              <h6>Country :</h6>

              <p> {country} </p>
            </li>
            <li>
              <h6>state :</h6>

              <p> {region} </p>
            </li>
            <li>
              <h6>town :</h6>

              <p> {town} </p>
            </li>
            <li>
              <h6>Street Address :</h6>

              <p> {streetAddress} </p>
            </li>
            <li>
              <h6>Apartment Address :</h6>

              <p> {apartmentAddress} </p>
            </li>
          </>
        ) : (
          ""
        )}
      </ul>
    </div>
  );
}
