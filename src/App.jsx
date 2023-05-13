import React, { useEffect, useState } from 'react';
import './App.css'
const App = () => {
  const [users, setUser] = useState([]);

  useEffect( () => {
    fetch('http://localhost:5000/users')
    .then(res => res.json())
    .then(data => setUser(data))
    .catch(e => console.log(e.message))
  }, [])

  const handleaddUser = e => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = {name, email}
    console.log(user);
    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers:{
        'content-type': 'application/json',
      },
      body: JSON.stringify(user)

    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      const newUsers = [...users, data]
      setUser(newUsers);
      form.reset();
      
    })
  }
  
  return (
    <div>
      <h1>User management system</h1>
      <h3>Number of user: {users.length}</h3>
      <form onSubmit={handleaddUser}>
        <input type="text" name="name" placeholder='enter name' id="" />
        <br />
        <input type="email" name="email" placeholder='enter email' id="" />
        <br />
        <input type="submit" value="Add User" />
      </form>
      <div>
        {
          users.map((user,idx) => <p key={idx}>{user.name}: {user.email}</p> )
        }
      </div>
    </div>
  );
};

export default App;