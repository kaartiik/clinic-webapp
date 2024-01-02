// pages/doctor.js
"use client";
import React, {useEffect, useState} from 'react';
import { useRouter } from 'next/navigation';
// import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import globalStyles from '../styles/main.module.css';
import styles from '../styles/DoctorMain.module.css';
import { doc, setDoc, addDoc, updateDoc, collection } from "firebase/firestore";
import firebase from "../firebase";
import CLINIC_ID from '../clinic';

export default function Form({searchParams}) {
  const {patientID, appointmentID} = searchParams;
  const router = useRouter();
  // const searchParams = useSearchParams();
  const [patientData, setPatientData] = useState();
  const [info, setInfo] = useState("");
  const [notes, setNotes] = useState("");

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

  const handleAddNotes = async () => {
    const data = {
      medical_info : info !== "" ? info : "N/A",
      doctor_notes: notes !== "" ? notes : "N/A",
      patient_id: patientID,
      appointment_date: new Date()
    }

    try {
      const clinicAppointmentRef = doc(firebase.db, 'clinics', CLINIC_ID, 'appointments', appointmentID);
      const patientAppointmentRef = doc(firebase.db, 'users', patientID, 'appointments', appointmentID);

      const updateAppointmentMedicalInfoClinic = await updateDoc(clinicAppointmentRef, data);
      const updateAppointmentMedicalInfoPatient = await updateDoc(patientAppointmentRef, data);


      router.push(`/medication?patientID=${patientID}&appointmentID=${appointmentID}`);
    } catch(error) {
      alert(error)
    }

  }
 
  // useEffect(() => {
  //   // fetchPatientData(patientId);
  // }, [])

  return (
    <div className={styles.container}>
      <h1>Add Medical Info</h1>

      <label>Medical Info</label>
      <textarea name="info" rows={4} cols={40} onChange={e => setInfo(e.target.value)} value={info}/>

      <label>Doctor Notes</label>
      <textarea name="notes" rows={4} cols={40} onChange={e => setNotes(e.target.value)} value={notes}/>

      {patientID !== "" &&
          <button className={globalStyles.roundedButton} onClick={() => handleAddNotes()}>Add Notes</button>
      }
    </div>
  );
}
