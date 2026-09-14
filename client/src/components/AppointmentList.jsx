// import React, { useState } from 'react';
// import axios from 'axios';

// export default function AppointmentList({
//   appointments,
//   fetchAppointments
// }) {
//   const [actionLoading, setActionLoading] = useState(null);
//   const [error, setError] = useState('');

//   const updateStatus = async (id, status) => {
//     setError('');
//     setActionLoading(id);

//     try {
//       await axios.patch(
//         `https://appointment-booking-app-dqqt.onrender.com/api/appointments/${id}`,
//         { status }
//       );

//       fetchAppointments();
//     } catch (err) {
//       setError('Unable to update appointment status. Please try again.');
//     } finally {
//       setActionLoading(null);
//     }
//   };

//   const deleteAppointment = async (id) => {
//     if (
//       window.confirm(
//         'Are you sure you want to delete this appointment?'
//       )
//     ) {
//       setError('');
//       setActionLoading(id);

//       try {
//         await axios.delete(
//           `https://appointment-booking-app-dqqt.onrender.com/api/appointments/${id}`
//         );

//         fetchAppointments();
//       } catch (err) {
//         setError('Unable to delete appointment. Please try again.');
//       } finally {
//         setActionLoading(null);
//       }
//     }
//   };

//   const getStatusStyle = (status) => {
//     switch (status) {
//       case 'Completed':
//         return 'bg-green-50 text-green-700 border-green-200';

//       case 'Cancelled':
//         return 'bg-red-50 text-red-700 border-red-200';

//       default:
//         return 'bg-yellow-50 text-yellow-700 border-yellow-200';
//     }
//   };

//   return (
//     <div className="mt-8">

//       {/* Section Header */}
//       <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
//         <div>
//           <h2 className="text-xl font-semibold text-gray-900">
//             Appointments
//           </h2>

//           <p className="text-sm text-gray-500 mt-1">
//             View and manage scheduled appointments.
//           </p>
//         </div>

//         <span className="text-sm text-gray-500">
//           {appointments.length}{' '}
//           {appointments.length === 1
//             ? 'appointment'
//             : 'appointments'}
//         </span>
//       </div>

//       {/* Error Message */}
//       {error && (
//         <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
//           {error}
//         </div>
//       )}

//       {/* Empty State */}
//       {appointments.length === 0 ? (
//         <div className="rounded-xl border border-gray-200 bg-white px-6 py-12 text-center shadow-sm">
//           <h3 className="text-base font-semibold text-gray-800">
//             No appointments found
//           </h3>

//           <p className="mt-1 text-sm text-gray-500">
//             Book your first appointment using the form above.
//           </p>
//         </div>
//       ) : (
//         <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

//           {/* Desktop / Tablet Table */}
//           <div className="overflow-x-auto">
//             <table className="min-w-full">

//               <thead>
//                 <tr className="border-b border-gray-200 bg-gray-50">
//                   <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
//                     Patient
//                   </th>

//                   <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
//                     Mobile
//                   </th>

//                   <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
//                     Doctor
//                   </th>

//                   <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
//                     Date
//                   </th>

//                   <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
//                     Time
//                   </th>

//                   <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
//                     Status
//                   </th>

//                   <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>

//               <tbody className="divide-y divide-gray-100">

//                 {appointments.map((appt) => (
//                   <tr
//                     key={appt._id}
//                     className="transition hover:bg-gray-50"
//                   >

//                     {/* Patient */}
//                     <td className="whitespace-nowrap px-5 py-4">
//                       <span className="text-sm font-medium text-gray-900">
//                         {appt.patientName}
//                       </span>
//                     </td>

//                     {/* Mobile */}
//                     <td className="whitespace-nowrap px-5 py-4">
//                       <span className="text-sm text-gray-600">
//                         {appt.mobileNumber}
//                       </span>
//                     </td>

//                     {/* Doctor */}
//                     <td className="whitespace-nowrap px-5 py-4">
//                       <span className="text-sm text-gray-700">
//                         {appt.doctorName}
//                       </span>
//                     </td>

//                     {/* Date */}
//                     <td className="whitespace-nowrap px-5 py-4">
//                       <span className="text-sm text-gray-600">
//                         {appt.appointmentDate}
//                       </span>
//                     </td>

//                     {/* Time */}
//                     <td className="whitespace-nowrap px-5 py-4">
//                       <span className="text-sm text-gray-600">
//                         {appt.appointmentTime}
//                       </span>
//                     </td>

//                     {/* Status */}
//                     <td className="whitespace-nowrap px-5 py-4">
//                       <span
//                         className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${getStatusStyle(
//                           appt.status
//                         )}`}
//                       >
//                         {appt.status}
//                       </span>
//                     </td>

//                     {/* Actions */}
//                     <td className="px-5 py-4">
//                       <div className="flex flex-wrap gap-2">

//                         {appt.status === 'Pending' && (
//                           <>
//                             <button
//                               type="button"
//                               disabled={actionLoading === appt._id}
//                               onClick={() =>
//                                 updateStatus(
//                                   appt._id,
//                                   'Completed'
//                                 )
//                               }
//                               className="rounded-md border border-green-200 bg-green-50 px-3 py-1.5 text-xs font-medium text-green-700 transition hover:bg-green-100 disabled:cursor-not-allowed disabled:opacity-50"
//                             >
//                               Complete
//                             </button>

//                             <button
//                               type="button"
//                               disabled={actionLoading === appt._id}
//                               onClick={() =>
//                                 updateStatus(
//                                   appt._id,
//                                   'Cancelled'
//                                 )
//                               }
//                               className="rounded-md border border-orange-200 bg-orange-50 px-3 py-1.5 text-xs font-medium text-orange-700 transition hover:bg-orange-100 disabled:cursor-not-allowed disabled:opacity-50"
//                             >
//                               Cancel
//                             </button>
//                           </>
//                         )}

//                         <button
//                           type="button"
//                           disabled={actionLoading === appt._id}
//                           onClick={() =>
//                             deleteAppointment(appt._id)
//                           }
//                           className="rounded-md border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
//                         >
//                           Delete
//                         </button>

//                       </div>
//                     </td>

//                   </tr>
//                 ))}

//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}

//     </div>
//   );
// }

import React from 'react';
import axios from 'axios';

export default function AppointmentList({ appointments, fetchAppointments }) {
  const updateStatus = async (id, status) => {
    try {
      await axios.patch(`https://onrender.com{id}`, { status });
      fetchAppointments();
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const deleteAppointment = async (id) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      try {
        await axios.delete(`https://onrender.com{id}`);
        fetchAppointments();
      } catch (err) {
        console.error("Error deleting appointment:", err);
      }
    }
  };

  return (
    <div className="mt-10 px-4 sm:px-0">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-800">Appointments</h2>
        <p className="text-sm text-gray-500">View and manage scheduled patient visits ({appointments.length} total).</p>
      </div>

      {appointments.length === 0 ? (
        <div className="bg-white p-8 text-center border border-dashed border-gray-200 rounded-2xl text-gray-400">
          No appointments scheduled yet.
        </div>
      ) : (
        <>
          {/* 📱 Mobile Responsive View: Cards layout hidden on large viewports */}
          <div className="block md:hidden space-y-4">
            {appointments.map((appt) => (
              <div key={appt._id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-gray-900 text-base">{appt.patientName}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">📞 {appt.mobileNumber}</p>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                    appt.status === 'Completed' ? 'bg-green-50 text-green-700 border border-green-200' : 
                    appt.status === 'Cancelled' ? 'bg-red-50 text-red-700 border border-red-200' : 
                    'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}>
                    {appt.status}
                  </span>
                </div>

                <div className="text-sm text-gray-600 bg-gray-50 p-2.5 rounded-xl space-y-1">
                  <div><span className="font-medium text-gray-700">Doctor:</span> {appt.doctorName}</div>
                  <div><span className="font-medium text-gray-700">Schedule:</span> {appt.appointmentDate} at {appt.appointmentTime}</div>
                </div>

                {/* Mobile Button Actions Grid */}
                <div className="grid grid-cols-3 gap-2 pt-1">
                  {appt.status === 'Pending' ? (
                    <>
                      <button onClick={() => updateStatus(appt._id, 'Completed')} className="bg-green-600 text-white font-medium py-2 rounded-xl text-xs hover:bg-green-700 transition">Complete</button>
                      <button onClick={() => updateStatus(appt._id, 'Cancelled')} className="bg-amber-500 text-white font-medium py-2 rounded-xl text-xs hover:bg-amber-600 transition">Cancel</button>
                    </>
                  ) : (
                    <div className="col-span-2 text-center text-xs text-gray-400 self-center font-medium italic">Status Finalized</div>
                  )}
                  <button onClick={() => deleteAppointment(appt._id)} className="bg-red-50 text-red-600 font-medium py-2 rounded-xl text-xs hover:bg-red-100 transition border border-red-200">Delete</button>
                </div>
              </div>
            ))}
          </div>

          {/* 💻 Desktop View: Table layout hidden on mobile viewports */}
          <div className="hidden md:block overflow-hidden bg-white rounded-2xl shadow border border-gray-100">
            <table className="min-w-full divide-y divide-gray-200 text-left">
              <thead className="bg-gray-50 text-xs font-semibold uppercase text-gray-500 tracking-wider">
                <tr>
                  <th className="p-4">Patient</th>
                  <th className="p-4">Contact</th>
                  <th className="p-4">Assigned Doctor</th>
                  <th className="p-4">Date & Time</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm bg-white text-gray-700">
                {appointments.map((appt) => (
                  <tr key={appt._id} className="hover:bg-gray-50/70 transition">
                    <td className="p-4 font-semibold text-gray-900">{appt.patientName}</td>
                    <td className="p-4 text-gray-500">{appt.mobileNumber}</td>
                    <td className="p-4 font-medium text-blue-600">{appt.doctorName}</td>
                    <td className="p-4">{appt.appointmentDate} <span className="text-gray-400 mx-1">|</span> {appt.appointmentTime}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        appt.status === 'Completed' ? 'bg-green-50 text-green-700' : 
                        appt.status === 'Cancelled' ? 'bg-red-50 text-red-700' : 
                        'bg-amber-50 text-amber-700'
                      }`}>
                        {appt.status}
                      </span>
                    </td>
                    <td className="p-4 space-x-2 text-center">
                      {appt.status === 'Pending' && (
                        <>
                          <button onClick={() => updateStatus(appt._id, 'Completed')} className="bg-green-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-green-700 transition">Complete</button>
                          <button onClick={() => updateStatus(appt._id, 'Cancelled')} className="bg-amber-500 text-white px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-amber-700 transition">Cancel</button>
                        </>
                      )}
                      <button onClick={() => deleteAppointment(appt._id)} className="bg-red-50 text-red-600 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-red-100 transition border border-red-100">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
