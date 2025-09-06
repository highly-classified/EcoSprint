import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";

function Feed() {
  const handleLogout = async () => {
    await signOut(auth);
    alert("Logged out!");
  };

  return (
    <div>
      <h2>Product Feed</h2>
      <button onClick={handleLogout}>Logout</button>
      {/* Your product list code */}
    </div>
  );
}

export default Feed;
