import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const Login = () => {
  const [togglePassword, setTogglePassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [generalError, setGeneralError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    console.log(email, password);
    e.preventDefault();
    setGeneralError("");
    if (email.length < 10 || email.length > 15) {
      setGeneralError("email harus memiliki 10-15 karakter.");
    } else if (!/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*\W).*$/.test(password)) {
      setGeneralError(
        "Password harus mengandung kombinasi angka, huruf besar, huruf kecil, dan simbol."
      );
    } else {
      // Simpan email ke session
      sessionStorage.setItem("email", email);
      navigate("/home");
    }
  };

  return (
    <main className="h-screen flex flex-col justify-center items-center gap-5 px-5">
      <h1 className="text-3xl font-bold">Halaman Login</h1>
      <form onSubmit={handleLogin}>
        <label htmlFor="email" className="text-lg font-semibold">
          Email
        </label>
        <input
          type="email"
          placeholder="Email"
          className="border-2 border-black p-2 w-full mb-5"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="email"
          autoComplete="off"
          required
        />
        <label htmlFor="password" className="text-lg font-semibold">
          Password
        </label>
        <div className="flex justify-between gap-3">
          <input
            type={togglePassword ? "text" : "password"}
            className="border-2 border-black p-2 w-full mb-5"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            required
          />
          <div
            className="text-black hover:text-black/50 transition-all cursor-pointer pt-1 z-10"
            onClick={() => setTogglePassword(!togglePassword)}
          >
            {togglePassword ? (
              <AiFillEyeInvisible size={30} />
            ) : (
              <AiFillEye size={30} />
            )}
          </div>
        </div>
        {generalError && (
          <p className="text-red-500 text-center font-semibold mb-3">
            {generalError}
          </p>
        )}
        <button
          type="submit"
          className="border-2 border-black p-2 w-full bg-gray-300 font-bold"
        >
          LOGIN
        </button>
      </form>
    </main>
  );
};

export default Login;
