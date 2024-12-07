import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../Firebase";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../Firebase";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import googleLogo from "../assets/Google.jpg";

function Registerpage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conformpassword, setConformPassword] = useState("");
  const navigate = useNavigate();

  const googleProvider = new GoogleAuthProvider();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      await setDoc(doc(db, "users", user.email), {
        name: user.displayName,
        email: user.email,
      });

      console.log("User signed in with Google:", user);
      navigate("/profil");
    } catch (error) {
      console.error("Error during Google sign-in:", error.message);
    }
  };
  const handileRegister = async (e) => {
    e.preventDefault();
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        setDoc(doc(db, "users", userCredential?.user?.email), {
          name,
          email,
        }).then(() => {
          navigate("/profil");
        });

        // ...
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-400">
      <div className="w-full max-w-md p-8 bg- rounded shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
        <section>
          <label className="block text-gray-700">name</label>
          <input
            type="name"
            className="w-full px-4 py-2 border rounded-md "
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-md "
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300">password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-md "
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <label className="block text-gray-300">conformpassword</label>
          <input
            type="conformpassword"
            className="w-full px-4 py-2 border-3 border-black rounded-md "
            value={conformpassword}
            required
            onChange={(e) => setConformPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white mt-5 "
            onClick={handileRegister}
          >
            submit
          </button>
          <button
            type="button"
            className="w-full py-2 px-4 bg-white text-black rounded-md flex items-center justify-center mt-6"
            onClick={handleGoogleSignIn}
          >
            <img src={googleLogo} alt="Google Logo" className="w-6 h-6 mr-2" />
            <span className="text-center">Continue with Google</span>
          </button>
        </section>
      </div>
    </div>
  );
}

export default Registerpage;
