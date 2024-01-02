// pages/doctor.js
"use client";
import React, {useState} from 'react';
import { useRouter } from 'next/navigation';
import styles from '../styles/DoctorMain.module.css';
import globalStyles from '../styles/main.module.css';
import {QrScanner} from '@yudiel/react-qr-scanner';

export default function Doctor() {
  const router = useRouter();
  const [openScanner, setOpenScanner] = useState(false);

  const onScan = (result) => {
    setOpenScanner(!openScanner);
    // Split the string into an array using the comma as a separator
    const dataArray = result.split(',');

    // Assign the substrings to respective variables
    const patient_id = dataArray[0];
    const appointment_id = dataArray[1];

    router.push(`/patient?patientID=${patient_id}&appointmentID=${appointment_id}`);
  }

  return (
    <div className={styles.container}>
      <h1>Doctor</h1>


      <button className={globalStyles.roundedButton} onClick={() => setOpenScanner(!openScanner)}>Scan Code</button>

      {openScanner &&
        // <div className={styles.scannerContainer}>
          <QrScanner
              onDecode={(result) => onScan(result)}
              onError={(error) => console.log(error?.message)}
              containerStyle={{padding: "200px"}}
          />
        // </div>
      }
    </div>
  );
}
