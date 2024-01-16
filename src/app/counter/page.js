// pages/counter.js
"use client";
import React, {useEffect, useState} from 'react';
import globalStyles from '../styles/main.module.css';
import Link from 'next/link';
import QRCode from "react-qr-code";
import styles from '../styles/CounterMain.module.css';
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import firebase from "../firebase";
import Header from '@/utility/header';

  export default function Counter() {
    const [appointments, setAppointments] = useState([]);
    const [clinics, setClinics] = useState([]);
    const [inputValue, setInputValue] = useState('');

    function displayFirestoreTimestamp(firestoreTimestamp) {
      // Convert Firestore Timestamp to JavaScript Date object
      const date = firestoreTimestamp.toDate();
  
      // Format the date and time
      // const formattedDate = date.toLocaleDateString('en-US');
      const formattedTime = date.toLocaleTimeString(['en-US'], {
        hour: '2-digit',
        minute: '2-digit'
      });
  
      return `${formattedTime}`;
  }

  function displayAppointmentDate(firestoreTimestamp) {
    // Convert Firestore Timestamp to JavaScript Date object
    const date = firestoreTimestamp.toDate();

    // Format the date and time
    const formattedDate = date.toLocaleDateString('en-UK');

    return `${formattedDate}`;
}

    const fetchData = async () => {
      let clinicsArray = [];
      let appointmentsArray = [];
      const querySnapshot = await getDocs(collection(firebase.db, "clinics"));
      querySnapshot.forEach((doc) => {
          clinicsArray.push({label:doc.data().clinic_name, value:doc.data().clinic_id, openingTime:doc.data().opening_time, closingTime:doc.data().closing_time});
        });

      setClinics(clinicsArray);
      const appointmentSnapshot = await getDocs(collection(firebase.db, "clinics", clinicsArray[0].value, "appointments"));

      appointmentSnapshot.forEach((doc) => {
        appointmentsArray.push({
          ...doc.data(), 
          appointment_date: doc.data().appointment_booked ? displayAppointmentDate(doc.data().appointment_date) : doc.data().appointment_date,
          appointment_time: doc.data().appointment_booked ? displayFirestoreTimestamp(doc.data().appointment_date) : doc.data().appointment_date,
          check_in_time: displayFirestoreTimestamp(doc.data().check_in_time),
        });
      });
      setAppointments(appointmentsArray);
  };

  useEffect(() =>{
    fetchData();
  }, [])

    async function sendPushNotification(patientID, messageTitle, messageBody) {
      const userRef = doc(firebase.db, "users", patientID);
      const userSnap = await getDoc(docRef);

      const url = 'https://exp.host/--/api/v2/push/send';
  
      const headers = {
          'Host': 'exp.host',
          'Accept': 'application/json',
          'Accept-Encoding': 'gzip, deflate',
          'Content-Type': 'application/json'
      };
  
      const body = {
          "to": userSnap.data().push_token,
          "title": messageTitle,
          "body": messageBody
      };
  
      try {
          const response = await fetch(url, {
              method: 'POST',
              headers: headers,
              body: JSON.stringify(body)
          });
  
          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }
  
          const data = await response.json();
          alert('Push notification sent successfully:', data);
      } catch (error) {
          alert('Error sending push notification:', error);
      }
  }


  return (
    <div className={styles.container}>
      <Header title="Counter" />
      {clinics.length >  0 &&
        <div style={{ height: "auto", margin: "0 auto", maxWidth: 64, width: "100%" }}>
            <QRCode
              size={256}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              value={clinics[0].value}
            />
        </div>
      }
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Appointment</th>
            <th>Appointment Slot</th>
            <th>Check-In Time</th>
            <th>Doctor Room</th>
            <th>Collection</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment, index) => (
            <tr key={index}>
              <td>
                <Link href={{pathname: "/doctornotes", query: {...appointment}}} passHref>
                  {appointment.patient_name}
                </Link>
              </td>
              <td>{appointment.appointment_date}</td>
              <td>{appointment.appointment_time}</td>
              <td>{appointment.check_in_time}</td>
              <td>
                <input
                  type="text"
                  placeholder="Enter room number"
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                />
                <button onClick={() => sendPushNotification(appointment.patient_id, "Meet the doctor", inputValue)}>Send Notification</button>
              </td>
              <td>
                <button onClick={() => sendPushNotification(appointment.patient_id, "Collect medications", "Please approach the counter")}>Collect Medication</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

//API returns an array of appointment objects with name, appointment, and checkInTime properties