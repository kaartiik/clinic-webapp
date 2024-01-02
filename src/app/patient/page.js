// pages/doctor.js
"use client";
import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import globalStyles from '../styles/main.module.css';
import styles from '../styles/DoctorMain.module.css';
import { doc, getDoc } from "firebase/firestore";
import firebase from "../firebase";

export default function Patient({searchParams}) {
  const {patientID, appointmentID} = searchParams;
  const [patientData, setPatientData] = useState();

  const fetchPatientData = async (patientId) => {
    const docRef = doc(firebase.db, "users", patientId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setPatientData({...docSnap.data()})
    } else {
      // docSnap.data() will be undefined in this case
      alert('Patient does not exist in the system!')
    }
  }
 
  useEffect(() => {
    fetchPatientData(patientID);
  }, [])

  return (
    <div className={styles.container}>
      <h1>Patient</h1>

      {patientData &&
      <>
        <h1>Patient Name: {patientData.first_name} {patientData.last_name}</h1>

        <Link href={`/form?patientID=${patientID}&appointmentID=${appointmentID}`} passHref>
          <button className={globalStyles.roundedButton}>Add Notes</button>
        </Link>
      </>
      }

     
    </div>
  );
}
