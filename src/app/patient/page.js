// pages/doctor.js
"use client";
import React, {useEffect, useState} from 'react';
import { useSearchParams } from 'next/navigation';
import styles from '../styles/DoctorMain.module.css';
import { doc, getDoc } from "firebase/firestore";
import firebase from "../firebase";

export default function Patient() {
  const searchParams = useSearchParams();
  const [patientData, setPatientData] = useState();

  const fetchPatientData = async (patientId) => {
    const docRef = doc(firebase.db, "users", patientId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setPatientData({...docSnap.data()})
    } else {
      // docSnap.data() will be undefined in this case
      alert('Patient does not exist in the system!')
    }
  }
 
  useEffect(() => {
    const patientId = searchParams.get('id');

    fetchPatientData(patientId);
  }, [])
  return (
    <div className={styles.container}>
      <h1>Patient</h1>

      {patientData &&
        <h1>Patient Name: {patientData.first_name} {patientData.last_name}</h1>
      }
    </div>
  );
}
