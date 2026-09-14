import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AppointmentForm from './components/AppointmentForm';
import AppointmentList from './components/AppointmentList';

export default function App() {
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    try {
      const res = await axios.get(
        'https://appointment-booking-app-dqqt.onrender.com/api/appointments'
      );

      setAppointments(res.data);
    } catch (err) {
      console.error('Error fetching appointments:', err);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">

      <main className="max-w-6xl mx-auto px-4 py-10">
        
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Appointment Management
          </h1>

          <p className="mt-2 text-sm sm:text-base text-gray-500">
            Book and manage patient appointments easily.
          </p>
        </div>

        <AppointmentForm
          fetchAppointments={fetchAppointments}
        />

        <AppointmentList
          appointments={appointments}
          fetchAppointments={fetchAppointments}
        />

      </main>

    </div>
  );
}