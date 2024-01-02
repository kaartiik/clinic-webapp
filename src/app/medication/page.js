// pages/doctor.js
"use client";
import React, {useEffect, useState} from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import globalStyles from '../styles/main.module.css';
import styles from '../styles/Medications.module.css';
import { doc, setDoc, addDoc, collection, updateDoc } from "firebase/firestore";
import firebase from "../firebase";
import CLINIC_ID from '../clinic';
import Header from '@/utility/header';

export default function Medication({searchParams}) {
  const {patientID, appointmentID} = searchParams;

  const router = useRouter();

  const [medications, setMedications] = useState([]);
  const [currentMedication, setCurrentMedication] = useState('');

  const handleInputChange = (event) => {
      setCurrentMedication(event.target.value);
  };

  const handleAddMedication = () => {
      if (currentMedication) {
          setMedications([...medications, currentMedication]);
          setCurrentMedication('');
      }
  };

  const handleSubmit = async () => {
    const data = {
      medications : medications,
    }

    try {
      console.log(CLINIC_ID, patientID, appointmentID);

      const clinicAppointmentRef = doc(firebase.db, 'clinics', CLINIC_ID, 'appointments', appointmentID);
      const patientAppointmentRef = doc(firebase.db, 'users', patientID, 'appointments', appointmentID);

      const updateAppointmentMedicalInfoClinic = await updateDoc(clinicAppointmentRef, data);
      const updateAppointmentMedicalInfoPatient = await updateDoc(patientAppointmentRef, data);

      setMedications([]);

      router.push(`/referral?patientID=${patientID}&appointmentID=${appointmentID}`);
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
      <Header title="Medications" />
      <ul className={styles.listview}>
        {medications.map((medication, index) => (
            <li key={index} className={styles.listviewitem}>{medication}</li>
        ))}
      </ul>

      <input
        className={styles.textinput}
        type="text"
        value={currentMedication}
        onChange={handleInputChange}
        placeholder="Enter medication"
        onKeyUp={handleKeyPress}
      />

      <button className={globalStyles.roundedButton} onClick={handleAddMedication}>Add Medication</button>

      {patientID !== "" &&
          <button className={globalStyles.roundedButton} disabled={!medications.length} onClick={handleSubmit}>Submit</button>
      }
    </div>
  );
}
