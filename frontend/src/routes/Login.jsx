import { useState } from "preact/hooks";
import { Form, redirect } from "react-router-dom";
import supabase from "../supabase";
import Error from "../pages/Error";

export async function action({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      throw error;
    }

    if (data.session) {
      localStorage.clear();
      localStorage.setItem("user_id", data.user.id);
      localStorage.setItem("access_token", data.session.access_token);
      localStorage.setItem("refresh_token", data.session.refresh_token);
      localStorage.setItem("expiration", data.session.expires_at.toString());
      return redirect("/");
    }
  } catch (error) {
    console.error("ERROR: ", error.message);
    return Error;
  }
  return redirect("/login");
}

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <div className="onloading-background">
        <div className="login-form">
          <div className="login-header">Log In</div>
          <Form method="post">
            <div className="input-container">
              <label>
                Your Email
                <input
                  type="text"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="login-input"
                />
              </label>
            </div>
            <div className="input-container">
              <label>
                Your Password
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="login-input"
                />
              </label>
            </div>
            <button type="submit">Login User</button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Login;
