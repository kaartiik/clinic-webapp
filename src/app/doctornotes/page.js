// pages/counter.js
"use client";
import React, {useEffect, useState,useRef} from 'react';
import { useReactToPrint } from 'react-to-print';
import { useRouter } from 'next/navigation';
import globalStyles from '../styles/main.module.css';
import styles from '../styles/DoctorNotes.module.css';
import Header from '@/utility/header';

  export default function DoctorNotes({searchParams}) {
    const appointment = searchParams;
    const componentRef = useRef();
    const router = useRouter();

    const handlePrint = useReactToPrint({
      content: () => componentRef.current,
    });

  useEffect(() =>{
  // fetchData();
  }, [])

  return (
    <div className={styles.container}>
      <Header title="Doctor Notes"/>
      <div className={styles.notesContainer}>
        <div className={styles.noteItem}>Patient Name: {appointment.patient_name}</div>
        <div className={styles.noteItem}>Appointment Date: {appointment.appointment_date}</div>
        <div className={styles.noteItem}>Medical Info: {appointment.medical_info}</div>
        <div className={styles.noteItem}>Doctor Notes: {appointment.doctor_notes}</div>
        <div className={styles.noteItem}>Medications: {appointment.medications.join(", ")}</div>
        <div className={styles.noteItem}>Referral Letter:</div>
        <div ref={componentRef} className={styles.noteItem}>{appointment.referral}</div>

        {appointment.hasOwnProperty('referral') && 
          <button className={globalStyles.roundedButton} onClick={handlePrint}>Print Referral</button>
        }

          <button className={globalStyles.roundedButton} onClick={() => {router.push("/counter")}}>Complete</button>

      </div>
    </div>
  );
}

//API returns an array of appointment objects with name, appointment, and checkInTime properties


