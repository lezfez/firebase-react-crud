import { useState, useEffect } from "react";
import "./App.css";
import { db } from "./firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

function App() {
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState(0);
  const [newKat, setNewKat] = useState("");

  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");

  const createUser = async () => {
    //console.log('create')
    let timestamp = new Date()
    await addDoc(usersCollectionRef, { 
      name: newName, 
      age: Number(newAge),
      kat: newKat,
      timestamp: timestamp
     });
    getUsers()
  };

  const refresh = async () => {
    console.log('create')
    getUsers();
  };

  const updateUser = async (id, age) => {
    const userDoc = doc(db, "users", id);
    const newFields = { age: age + 1 };
    await updateDoc(userDoc, newFields);
  };

  const deleteUser = async (id) => {
    //console.log('Lösche User '+id)
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
    getUsers();
  };

  const getUsers = async () => {
    const data = await getDocs(usersCollectionRef);
    setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const setKat = async (e) => {
    //setKat = (e)
    console.log (e)
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="App">
    
      <input
        placeholder="Name..."
        onChange={(event) => {
          setNewName(event.target.value);
        }}
      />
      <input
        type="number"
        placeholder="Age..."
        onChange={(event) => {
          setNewAge(event.target.value);
        }}
      />
      
      <label htmlFor="cars">Kat: </label>

      <select name="kat" id="kat" onChange={(e) => setNewKat(e.target.value)}>
        <option value="o">O</option>
        <option value="ho">HO</option>
        <option value="ft">FT</option>
        <option value="za">ZA</option>
      </select>
    
    <br></br>
    <button onClick={createUser}> Speichere Tag {newName}</button>
    <br></br>
    <button onClick={refresh}> Refresh</button>

      {users.map((user, index) => {
        let newId = index+1
        return ( <div key={user.id}>
            <h1>#{newId} - {user.name}</h1>
            <p><span>{user.id}</span>
            <span>({user.age})</span>
            <span>{user.kat}</span></p>
            <button onClick={ ()=>{ deleteUser (user.id)} }>Lösche {user.name}</button>
          </div> )
        })
      }

    </div>
  );
}

export default App;
