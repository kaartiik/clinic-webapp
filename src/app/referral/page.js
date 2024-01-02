// pages/doctor.js
"use client";
import React, {useEffect, useState} from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import globalStyles from '../styles/main.module.css';
import styles from '../styles/Referral.module.css';
import { doc, setDoc, addDoc, collection, updateDoc } from "firebase/firestore";
import firebase from "../firebase";
import CLINIC_ID from '../clinic';
import Header from '@/utility/header';

export default function Referral({searchParams}) {
  const {patientID, appointmentID} = searchParams;

  const router = useRouter();

  const [referral, setReferral] = useState('');


  const handleSubmit = async () => {
    const data = {
      referral : referral,
    }

    try {
      if(referral != "") {

        const clinicAppointmentRef = doc(firebase.db, 'clinics', CLINIC_ID, 'appointments', appointmentID);
        const patientAppointmentRef = doc(firebase.db, 'users', patientID, 'appointments', appointmentID);

        const updateAppointmentMedicalInfoClinic = await updateDoc(clinicAppointmentRef, data);
        const updateAppointmentMedicalInfoPatient = await updateDoc(patientAppointmentRef, data);

        setReferral('');
      }
      router.push(`/doctor`);
    } catch(error) {
      alert(error)
    }

  }

  const handleKeyPress = (event) => {
    // look for the `Enter` keyCode
    if (event.keyCode === 13 || event.which === 13) {
      handleSubmit()
    }
  }

  return (
    <div className={styles.container}>
      <Header title="Referral" />
      <input
        className={styles.textinput}
        type="text"
        value={referral}
        onChange={e => setReferral(e.target.value)}
        placeholder="Type out referral"
        onKeyUp={handleKeyPress}
      />
      {patientID !== "" &&
          <button className={globalStyles.roundedButton} onClick={handleSubmit}>Submit</button>
      }
    </div>
  );
}
