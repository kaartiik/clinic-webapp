// pages/counter.js
import React from 'react';
import globalStyles from '../styles/main.module.css';
import styles from '../styles/CounterMain.module.css';

export default function Counter() {
  return (
    <div className={globalStyles.container}>
      <h1>This is the Counter page</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Appointment</th>
            <th>Check-In Time</th>
          </tr>
        </thead>
        <tbody>
          {/* {appointments.map((appointment, index) => (
            <tr key={index}>
              <td>{appointment.name}</td>
              <td>{appointment.appointment}</td>
              <td>{appointment.checkInTime}</td>
            </tr>
          ))} */}
        </tbody>
      </table>
    </div>
  );
}

//API returns an array of appointment objects with name, appointment, and checkInTime properties


