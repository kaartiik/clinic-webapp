// pages/counter.js
"use client";
import React, {useEffect, useState} from 'react';
import globalStyles from '../styles/main.module.css';
import styles from '../styles/CounterMain.module.css';
import { collection, getDocs, Timestamp } from "firebase/firestore";
import firebase from "../firebase";

  export default function Counter() {
    const [appointments, setAppointments] = useState([]);

    function displayFirestoreTimestamp(firestoreTimestamp) {
      // Convert Firestore Timestamp to JavaScript Date object
      const date = firestoreTimestamp.toDate();
  
      // Format the date and time
      // const formattedDate = date.toLocaleDateString('en-US');
      const formattedTime = date.toLocaleTimeString('en-US');
  
      return `${formattedTime}`;
  }

    const fetchData = async () => {
      let clinicsArray = [];
      let appointmentsArray = [];
      const querySnapshot = await getDocs(collection(firebase.db, "clinics"));
      querySnapshot.forEach((doc) => {
          clinicsArray.push({label:doc.data().clinic_name, value:doc.data().clinic_id, openingTime:doc.data().opening_time, closingTime:doc.data().closing_time});
        });

      const appointmentSnapshot = await getDocs(collection(firebase.db, "clinics", clinicsArray[0].value, "appointments"));

      appointmentSnapshot.forEach((doc) => {
        appointmentsArray.push({
          ...doc.data(), 
          appointment_time: displayFirestoreTimestamp(doc.data().appointment_date)
        });
      });
      
      setAppointments(appointmentsArray);
  };

  useEffect(() =>{
  fetchData();
  }, [])


  return (
    <div className={styles.container}>
      <h1>This is the Counter page</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Appointment</th>
            <th>Appointment Slot</th>
            <th>Check-In Time</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment, index) => (
            <tr key={index}>
              <td>{appointment.patient_name}</td>
              <td>{"Yes"}</td>
              <td>{appointment.appointment_time}</td>
              {/* <td>{appointment.checkInTime}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

//API returns an array of appointment objects with name, appointment, and checkInTime properties


