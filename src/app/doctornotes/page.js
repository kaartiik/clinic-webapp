// pages/counter.js
"use client";
import React, {useEffect, useState} from 'react';
import globalStyles from '../styles/main.module.css';
import QRCode from "react-qr-code";
import styles from '../styles/DoctorNotes.module.css';
import { collection, getDocs, Timestamp } from "firebase/firestore";
import firebase from "../firebase";

  export default function DoctorNotes({searchParams}) {
    const appointment = searchParams;
    console.log(JSON.stringify(searchParams, null, 2));
    const [appointments, setAppointments] = useState([]);
    const [clinics, setClinics] = useState([]);

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

      setClinics(clinicsArray);
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
  // fetchData();
  }, [])


  return (
    <div className={styles.container}>
      <div className={styles.noteItem}>Patient Name: {appointment.patient_name}</div>
      <div className={styles.noteItem}>Appointment Date: {appointment.appointment_date}</div>
      <div className={styles.noteItem}>Medical Info: {appointment.medical_info}</div>
      <div className={styles.noteItem}>Doctor Notes: {appointment.doctor_notes}</div>
      <div className={styles.noteItem}>Medications: {appointment.medications.join(", ")}</div>

      {appointment.hasOwnProperty('referral') && 
        <button className={globalStyles.roundedButton}>Print Referral</button>
      }
    </div>
  );
}

//API returns an array of appointment objects with name, appointment, and checkInTime properties


