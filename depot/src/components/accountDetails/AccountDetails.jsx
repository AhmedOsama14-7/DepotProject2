import React, { useEffect, useState } from "react";
import { accountDetails } from "../../api/api";
import Loader from "../loader/Loader";
export default function AccountDetails() {
  const [id, setId] = useState(localStorage.getItem("id"));

  const { data, isLoading } = accountDetails(id);
  if (isLoading) return <Loader />;
  return (
    <div className="accountDetails">
      {data?.data ? (
        <ul>
          <li>
            <h6>Display Name :</h6>

            <p> {data?.data?.username} </p>
          </li>
          <li>
            <h6>Email :</h6>

            <p> {data?.data?.email} </p>
          </li>
          {data?.data?.apartmentAddress ? (
            <>
              <li>
                <h6>First Name :</h6>

                <p> {data?.data?.firstName} </p>
              </li>
              <li>
                <h6>Second Name :</h6>

                <p> {data?.data?.secondName} </p>
              </li>
              {data?.data?.companyName ? (
                <li>
                  <h6>Company Name :</h6>

                  <p> {data?.data?.companyName} </p>
                </li>
              ) : (
                ""
              )}
              <li>
                <h6>Country :</h6>

                <p> {data?.data?.country} </p>
              </li>
              <li>
                <h6>state :</h6>

                <p> {data?.data?.state} </p>
              </li>
              <li>
                <h6>town :</h6>

                <p> {data?.data?.town} </p>
              </li>
              <li>
                <h6>Street Address :</h6>

                <p> {data?.data?.streetAddress} </p>
              </li>
              <li>
                <h6>Apartment Address :</h6>

                <p> {data?.data?.apartmentAddress} </p>
              </li>
            </>
          ) : (
            ""
          )}
        </ul>
      ) : (
        ""
      )}
    </div>
  );
}
