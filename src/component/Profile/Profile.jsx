import { useAuth0 } from "@auth0/auth0-react";
import React, { useState } from "react";
import axios from "axios";
const ZAPIER_API = "http://localhost:8082/v1/invoices";

const Profile = () => {
  const { user, isAuthenticated, isLoading, logout } = useAuth0();

  const [invoiceDetail, setInvoiceDetail] = useState({
    date: "",
    message: "",
    dueAmount: 0,
    email: ""
  });
  const [result, setResult] = useState("");

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`${ZAPIER_API}`, { loggedIn:`${isAuthenticated}`, invoice: `${invoiceDetail}`});
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
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <input
            type="email"
            placeholder="Enter Email"
            value={invoiceDetail.message}
            onChange={(e) =>
              setInvoiceDetail({ ...invoiceDetail, email: e.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="Enter Message"
            value={invoiceDetail.message}
            onChange={(e) =>
              setInvoiceDetail({ ...invoiceDetail, message: e.target.value })
            }
            required
          />
          <input
            type="date"
            placeholder="Enter Date"
            value={invoiceDetail.date}
            onChange={(e) =>
              setInvoiceDetail({ ...invoiceDetail, date: e.target.value })
            }
            required
          />
          <input
            type="number"
            placeholder="Enter Amount"
            value={invoiceDetail.dueAmount}
            onChange={(e) =>
              setInvoiceDetail({ ...invoiceDetail, dueAmount: e.target.value })
            }
            required
          />
          <button type="Submit">Submit</button>
        </form>
        {result.length > 0 ? <>{result}</> : false}
        <button className="log-Btn bg-red" onClick={() => logout()}>
          {" "}
          Logout{" "}
        </button>
      </div>
    )
  );
};

export default Profile;
