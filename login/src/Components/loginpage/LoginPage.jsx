// import React, { useState } from "react";
// import "./LoginPage.css";
// import { MdEmail } from "react-icons/md";
// import { FaUser } from "react-icons/fa";
// import { RiLockPasswordFill } from "react-icons/ri";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export const LoginPage = () => {
//   const [action, setAction] = useState("SIGN UP");
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   // Email validation regex
//   const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();

//     // Basic validation
//     if (action === "SIGN UP" && !formData.name) {
//       toast.error("Name is required for signup!");
//       return;
//     }

//     if (!isValidEmail(formData.email)) {
//       toast.error("Invalid email format!");
//       return;
//     }

//     if (formData.password.length < 6) {
//       toast.error("Password must be at least 6 characters long!");
//       return;
//     }

//     try {
//       const url =
//         action === "SIGN UP"
//           ? "http://localhost:3000/auth/signup"
//           : "http://localhost:3000/auth/login";

//       const payload =
//         action === "SIGN UP"
//           ? formData
//           : {
//               email: formData.email,
//               password: formData.password,
//             };

//       const response = await fetch(url, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         if (action === "SIGN UP") {
//           toast.success("Signup Successful!");
//         } else {
//           localStorage.setItem("token", data.token);
//           toast.success("Login Successful!");
//         }
//       } else {
//         toast.error(data.message || "Something went wrong! Please try again.");
//       }
//     } catch (error) {
//       toast.error("Error connecting to the server. Please try again later.");
//     }
//   };

//   return (
//     <div className="wrapper">
//       <form>
//         <h1>{action}</h1>
//         {action === "LOGIN" ? null : (
//           <div className="input-box">
//             <input
//               type="text"
//               name="name"
//               placeholder="Name"
//               required
//               value={formData.name}
//               onChange={handleInputChange}
//             />
//             <FaUser className="icon" />
//           </div>
//         )}

//         <div className="input-box">
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             required
//             value={formData.email}
//             onChange={handleInputChange}
//           />
//           <MdEmail className="icon" />
//         </div>
//         <div className="input-box">
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             required
//             value={formData.password}
//             onChange={handleInputChange}
//           />
//           <RiLockPasswordFill className="icon" />
//         </div>
//       </form>

//       {action === "LOGIN" ? (
//         <div className="forgot-password">
//           <a href="#">Forgot password?</a>
//         </div>
//       ) : null}

//       <div className="submit-container">
//         <div
//           className={action === "LOGIN" ? "submit gray" : "submit"}
//           onClick={() => setAction("SIGN UP")}
//         >
//           Sign Up
//         </div>
//         <div
//           className={action === "SIGN UP" ? "submit gray" : "submit"}
//           onClick={() => setAction("LOGIN")}
//         >
//           Log In
//         </div>
//       </div>

//       {/* Centered Submit Button */}
//       <div className="center-submit-container">
//         <button
//           type="button"
//           className="submit-button"
//           onClick={handleFormSubmit}
//         >
//           Submit
//         </button>
//       </div>

//       {/* ToastContainer will render the toasts on the screen */}
//       <ToastContainer />
//     </div>
//   );
// };



import React, { useState } from "react";
import "./LoginPage.css";
import { MdEmail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const LoginPage = () => {
  const [action, setAction] = useState("SIGN UP");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Email validation regex
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const resetFormData = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
    });
  };

  const handleActionChange = (newAction) => {
    setAction(newAction);
    resetFormData();
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (action === "SIGN UP" && !formData.name) {
      toast.error("Name is required for signup!");
      return;
    }

    if (!isValidEmail(formData.email)) {
      toast.error("Invalid email format!");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long!");
      return;
    }

    try {
      const url =
        action === "SIGN UP"
          ? "http://localhost:3000/auth/signup"
          : "http://localhost:3000/auth/login";

      const payload =
        action === "SIGN UP"
          ? formData
          : {
              email: formData.email,
              password: formData.password,
            };

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        if (action === "SIGN UP") {
          toast.success("Signup Successful!");
        } else {
          localStorage.setItem("token", data.token);
          toast.success("Login Successful!");
        }
      } else {
        toast.error(data.message || "Something went wrong! Please try again.");
      }
    } catch (error) {
      toast.error("Error connecting to the server. Please try again later.");
    }
  };

  return (
    <div className="wrapper">
      <form>
        <h1>{action}</h1>
        {action === "LOGIN" ? null : (
          <div className="input-box">
            <input
              type="text"
              name="name"
              placeholder="Name"
              required
              value={formData.name}
              onChange={handleInputChange}
            />
            <FaUser className="icon" />
          </div>
        )}

        <div className="input-box">
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={handleInputChange}
          />
          <MdEmail className="icon" />
        </div>
        <div className="input-box">
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={handleInputChange}
          />
          <RiLockPasswordFill className="icon" />
        </div>
      </form>

      {action === "LOGIN" ? (
        <div className="forgot-password">
          <a href="#">Forgot password?</a>
        </div>
      ) : null}

      <div className="submit-container">
        <div
          className={action === "LOGIN" ? "submit gray" : "submit"}
          onClick={() => handleActionChange("SIGN UP")}
        >
          Sign Up
        </div>
        <div
          className={action === "SIGN UP" ? "submit gray" : "submit"}
          onClick={() => handleActionChange("LOGIN")}
        >
          Log In
        </div>
      </div>

      {/* Centered Submit Button */}
      <div className="center-submit-container">
        <button
          type="button"
          className="submit-button"
          onClick={handleFormSubmit}
        >
          Submit
        </button>
      </div>

      {/* ToastContainer will render the toasts on the screen */}
      <ToastContainer />
    </div>
  );
};
