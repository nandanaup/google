import { auth } from "../Firebase";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../Firebase";
function Profile() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const fetchUser = async () => {
    const authe = auth.currentUser;
    const docRef = doc(db, "users", authe?.email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setName(docSnap.data().name);
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setEmail(user?.email);
        fetchUser();
      }
    });
  }, []);
  console.log("current user", auth.currentUser);
  return (
    <div className="min-w-screen min-h-screen bg-blue-400 flex items-center justify-center">
      <div className="w-[50%] h-[20vh] bg-white rounded-lg shadow-lg p-8 flex flex-col justify-center items-center border border-gray-300">
        <div className="flex flex-col justify-center items-center w-full">
          <p className="bg-gray-100 w-full h-10 my-2 p-2 rounded-md text-gray-800 font-semibold shadow-inner">
            Name: {name}
          </p>
          <p className="bg-gray-100 w-full h-10 my-2 p-2 rounded-md text-gray-800 font-semibold shadow-inner">
            Email: {email}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
