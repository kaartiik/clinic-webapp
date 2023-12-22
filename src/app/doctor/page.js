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
  const [patientData, setPatientData] = useState();

  const onScan = (result) => {
    setOpenScanner(!openScanner);

    router.push(`/patient?id=${result}`);
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
