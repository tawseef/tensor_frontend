import { useAuth0 } from "@auth0/auth0-react";
import React, { useState } from "react";
import axios from "axios";
import "./profile.style.css";

// const ZAPIER_API = "http://localhost:8082/v1/invoices";
const ZAPIER_API = "https://tensor-backend-fo95.onrender.com";

const Profile = () => {
  const { user, isAuthenticated, isLoading, logout } = useAuth0();

  const [invoiceDetail, setInvoiceDetail] = useState({
    date: "",
    message: "",
    dueAmount: 0,
    to: ""
  });
  const [result, setResult] = useState("");

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  const handleSubmit = async () => {
    console.log(invoiceDetail);
    try {
      const response = await axios.post(`${ZAPIER_API}`, { loggedIn:`${isAuthenticated}`, invoice: {...invoiceDetail}});
      if (response) setResult(response.data);
      else setResult("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    isAuthenticated && (
      <div>
        <h1>User Name: {user.name}</h1>
        <h3>User Email: {user.email}</h3>
        <form className="inputForm"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <input className="inputBox"
            type="email"
            placeholder="Enter Email"
            value={invoiceDetail.to}
            onChange={(e) =>
              setInvoiceDetail({ ...invoiceDetail, to: e.target.value })
            }
            required
          />
          <input className="inputBox"
            type="text"
            placeholder="Enter Message"
            value={invoiceDetail.message}
            onChange={(e) =>
              setInvoiceDetail({ ...invoiceDetail, message: e.target.value })
            }
            required
          />
          <input className="inputBox"
            type="date"
            placeholder="Enter Date"
            value={invoiceDetail.date}
            onChange={(e) =>
              setInvoiceDetail({ ...invoiceDetail, date: e.target.value })
            }
            required
          />
          <input className="inputBox"
            type="number"
            placeholder="Enter Amount"
            value={invoiceDetail.dueAmount}
            onChange={(e) =>
              setInvoiceDetail({ ...invoiceDetail, dueAmount: e.target.value })
            }
            required
          />
          <button className="submitBtn" type="Submit">Submit</button>
        </form>
        {result.length > 0 ? <>{result}</> : false}
        <button className="log-Btn bg-red" onClick={() => logout()}>
          {" "}
          Logout{" "}
        </button>
      </div>
    )
  
);
}

export default Profile;
