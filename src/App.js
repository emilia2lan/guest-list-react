import { useEffect, useState } from 'react';
import './App.css';
export function handleChange(e) {
  console.log(e.target.value);
}
const baseUrl = 'http://localhost:5000';
function App() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userData, setUserData] = useState([
    { firstName: 'emily ', lastName: 'tulan' },
  ]);
  // Add guest to API localhost:5000
  console.log(userData);
  async function addGuest() {
    const response = await fetch(`${baseUrl}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName: firstName, lastName: lastName }),
    });
    setUserData([await response.json()]);
    //console.log(await response.json());
  }
  useEffect(
    () => {
      async function fetchData() {
        const response = await fetch(`${baseUrl}`);
        const data = await response.json();
        console.log(data[0]);
      }
      fetchData();
    },
    // Empty dependency array says that we only want to run
    // this on the first mount (only once, on load)
    [],
  );
  return (
    <section className="container">
      <div>
        <h1> Guest List </h1>
        <p>First Name:</p>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <p>Last Name:</p>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <br />
        <br />
        <h2>Guest List</h2>
        <b>First name:</b> {userData[0].firstName}
        <br />
        <b>Last name:</b> {userData[0].lastName}
        <br />
        <button onClick={addGuest}>Click me</button>
      </div>
    </section>
  );
}
export default App;
