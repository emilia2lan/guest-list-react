/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import './App.css';

const entirePage = css`
  margin: 0;
  padding: 0;
  align-items: center;
  background-color: #fffdd0;
  background-image: radial-gradient(
      circle farthest-side at top left,
      transparent,
      #0d64ff
    ),
    radial-gradient(ellipse farthest-corner at 0% 100%, transparent, #ff00a0);
  animation: bg-change 20s infinite;
`;

export function handleChange(e) {
  console.log(e.target.value);
}
const baseUrl = 'http://localhost:5000';

export default function App() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [guestList, setGuestList] = useState([]);

  async function getListOfGuests() {
    const response = await fetch(`${baseUrl}/`);
    const allGuest = await response.json();
    console.log(allGuest[0]);
    // 3. update the userData
    setGuestList(allGuest);
  }

  async function addGuest() {
    // add a guest on the server
    const response = await fetch(`${baseUrl}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName: firstName, lastName: lastName }),
    });
    //  setUserData([await response.json()]);
    console.log(await response.json());
    setFirstName('');
    setLastName('');
    // 4. show the updated list on the page
    getListOfGuests();
  }

  async function updatedGuestFunction(boolean, id) {
    // eslint-disable-next-line
    const response = await fetch(`${baseUrl}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ attending: boolean }),
    });
       getListOfGuests();
  }
  // eslint-disable-next-line
  async function deleteGuest(deleteGuest, id) {
    const response = await fetch(`${baseUrl}/${id}`, { method: 'DELETE' });
    await response.json();

    getListOfGuests();
  }

  useEffect(
    () => {
      // 2. its going to run the fetchdata()
      getListOfGuests();
    },
    // 1. when userData is updated, the use effect function will run
    [],
  );
  return (
    <section css={entirePage}>
      <div className="bodyPage">
        <h1> Guest List App</h1>
        <p>Introduce the name of the guest in the forms below:</p>
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
        <button onClick={addGuest}>Add guest to the list</button>
        <br />
        <p>
          Here you can see all the guest, check the box if they attend your
          event. Also, you have the possibility to delete the guest.
        </p>
        {guestList.map((guest, id) => {
          return (
            <div key={id}>
              {guest.id} {guest.firstName} {guest.lastName} {guest.attending}
              <label>
                {' '}
                <input
                  type="checkbox"
                  onChange={() => {
                    updatedGuestFunction(!guest.attending, guest.id);
                  }}
                  checked={guest.attending}
                  Attending
                />
              </label>
              <br />
              <label>
                <button
                  onClick={() => {
                    deleteGuest(!guest.deleteGuest, guest.id);
                  }}
                  clicked={guest.guest}
                >
                  Delete{' '}
                </button>
              </label>
            </div>
          );
        })}
      </div>
    </section>
  );
}
