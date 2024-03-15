import React from "react";
import { useState } from "preact/hooks";
import { Form, redirect, Link } from "react-router-dom";
import Nav from "../components/Nav";

export async function action({ request }) {
  const formData = await request.formData();
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const registerData = { name, email, password };
  try {
    const url = `${import.meta.env.VITE_SOURCE_URL}/register`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerData),
    };
    console.log(url);
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(response);
    console.log(data);
  } catch (error) {
    console.error("ERROR: ", error);
    return false;
  }
  return redirect("/");
}

const Register = () => {
  return (
    <>
      <div className="onloading-background">
        <div className="login-form">
          <h2>Register</h2>
          <Form method="post">
            <div className="input-container">
              <label>
                Your Name
                <input type="text" name="name" required />
              </label>
            </div>
            <div className="input-container">
              <label>
                Your Email
                <input type="text" name="email" required />
              </label>
            </div>
            <div className="input-container">
              <label>
                Your Password
                <input type="password" name="password" required />
              </label>
            </div>
            <button type="submit">Register User</button>
          </Form>
          <div>------------ or ------------</div>
          <Link to="/login">
            <button>Log in Here</button>
          </Link>
        </div>
      </div>
    </>
  );
};
export default Register;
