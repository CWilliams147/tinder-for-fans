import React from "react";
import { useState } from "preact/hooks";
import { Form, redirect, Link } from "react-router-dom";
import Nav from "../components/Nav";
import supabase from "../supabase";

export async function action({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const registerData = { email, password };

  try {
    const { user, session, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }
    return redirect("/createprofile");
  } catch (error) {
    console.error("Error registering user:", error);
    return false;
  }
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
          <div className="or-divider">------------ or ------------</div>
          <Link to="/login">
            <button>Log in Here</button>
          </Link>
        </div>
      </div>
    </>
  );
};
export default Register;
