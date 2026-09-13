// import React from 'react';
// import axios from 'axios';

// export default function AppointmentList({ appointments, fetchAppointments }) {
//   const updateStatus = async (id, status) => {
//     await axios.patch(`http://localhost:5000/api/appointments/${id}`, { status });
//     fetchAppointments();
//   };

//   const deleteAppointment = async (id) => {
//     if (window.confirm('Are you sure you want to delete this appointment?')) {
//       await axios.delete(`http://localhost:5000/api/appointments/${id}`);
//       fetchAppointments();
//     }
//   };

//   return (
//     <div className="mt-8 overflow-x-auto">
//       <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
//         <thead className="bg-gray-100 text-gray-700 text-left text-sm uppercase font-semibold">
//           <tr>
//             <th className="p-4">Patient</th>
//             <th className="p-4">Mobile</th>
//             <th className="p-4">Doctor</th>
//             <th className="p-4">Date & Time</th>
//             <th className="p-4">Status</th>
//             <th className="p-4">Actions</th>
//           </tr>
//         </thead>
//         <tbody className="divide-y divide-gray-200 text-sm">
//           {appointments.map((appt) => (
//             <tr key={appt._id}>
//               <td className="p-4 font-medium">{appt.patientName}</td>
//               <td className="p-4 text-gray-600">{appt.mobileNumber}</td>
//               <td className="p-4 text-gray-600">{appt.doctorName}</td>
//               <td className="p-4 text-gray-600">{appt.appointmentDate} | {appt.appointmentTime}</td>
//               <td className="p-4">
//                 <span className={`px-2 py-1 rounded text-xs font-semibold ${appt.status === 'Completed' ? 'bg-green-100 text-green-800' : appt.status === 'Cancelled' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
//                   {appt.status}
//                 </span>
//               </td>
//               <td className="p-4 space-x-2">
//                 {appt.status === 'Pending' && (
//                   <>
//                     <button onClick={() => updateStatus(appt._id, 'Completed')} className="bg-green-500 text-white px-2 py-1 rounded text-xs hover:bg-green-600">Complete</button>
//                     <button onClick={() => updateStatus(appt._id, 'Cancelled')} className="bg-amber-500 text-white px-2 py-1 rounded text-xs hover:bg-amber-600">Cancel</button>
//                   </>
//                 )}
//                 <button onClick={() => deleteAppointment(appt._id)} className="bg-red-600 text-white px-2 py-1 rounded text-xs hover:bg-red-700">Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }


import React, { useState } from 'react';
import axios from 'axios';

export default function AppointmentList({
  appointments,
  fetchAppointments
}) {
  const [actionLoading, setActionLoading] = useState(null);
  const [error, setError] = useState('');

  const updateStatus = async (id, status) => {
    setError('');
    setActionLoading(id);

    try {
      await axios.patch(
        `https://appointment-booking-app-dqqt.onrender.com/${id}`,
        { status }
      );

      fetchAppointments();
    } catch (err) {
      setError('Unable to update appointment status. Please try again.');
    } finally {
      setActionLoading(null);
    }
  };

  const deleteAppointment = async (id) => {
    if (
      window.confirm(
        'Are you sure you want to delete this appointment?'
      )
    ) {
      setError('');
      setActionLoading(id);

      try {
        await axios.delete(
          `https://appointment-booking-app-dqqt.onrender.com/${id}`
        );

        fetchAppointments();
      } catch (err) {
        setError('Unable to delete appointment. Please try again.');
      } finally {
        setActionLoading(null);
      }
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-50 text-green-700 border-green-200';

      case 'Cancelled':
        return 'bg-red-50 text-red-700 border-red-200';

      default:
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
    }
  };

  return (
    <div className="mt-8">

      {/* Section Header */}
      <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Appointments
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            View and manage scheduled appointments.
          </p>
        </div>

        <span className="text-sm text-gray-500">
          {appointments.length}{' '}
          {appointments.length === 1
            ? 'appointment'
            : 'appointments'}
        </span>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Empty State */}
      {appointments.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-white px-6 py-12 text-center shadow-sm">
          <h3 className="text-base font-semibold text-gray-800">
            No appointments found
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Book your first appointment using the form above.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

          {/* Desktop / Tablet Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full">

              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Patient
                  </th>

                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Mobile
                  </th>

                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Doctor
                  </th>

                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Date
                  </th>

                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Time
                  </th>

                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Status
                  </th>

                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">

                {appointments.map((appt) => (
                  <tr
                    key={appt._id}
                    className="transition hover:bg-gray-50"
                  >

                    {/* Patient */}
                    <td className="whitespace-nowrap px-5 py-4">
                      <span className="text-sm font-medium text-gray-900">
                        {appt.patientName}
                      </span>
                    </td>

                    {/* Mobile */}
                    <td className="whitespace-nowrap px-5 py-4">
                      <span className="text-sm text-gray-600">
                        {appt.mobileNumber}
                      </span>
                    </td>

                    {/* Doctor */}
                    <td className="whitespace-nowrap px-5 py-4">
                      <span className="text-sm text-gray-700">
                        {appt.doctorName}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="whitespace-nowrap px-5 py-4">
                      <span className="text-sm text-gray-600">
                        {appt.appointmentDate}
                      </span>
                    </td>

                    {/* Time */}
                    <td className="whitespace-nowrap px-5 py-4">
                      <span className="text-sm text-gray-600">
                        {appt.appointmentTime}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="whitespace-nowrap px-5 py-4">
                      <span
                        className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${getStatusStyle(
                          appt.status
                        )}`}
                      >
                        {appt.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4">
                      <div className="flex flex-wrap gap-2">

                        {appt.status === 'Pending' && (
                          <>
                            <button
                              type="button"
                              disabled={actionLoading === appt._id}
                              onClick={() =>
                                updateStatus(
                                  appt._id,
                                  'Completed'
                                )
                              }
                              className="rounded-md border border-green-200 bg-green-50 px-3 py-1.5 text-xs font-medium text-green-700 transition hover:bg-green-100 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              Complete
                            </button>

                            <button
                              type="button"
                              disabled={actionLoading === appt._id}
                              onClick={() =>
                                updateStatus(
                                  appt._id,
                                  'Cancelled'
                                )
                              }
                              className="rounded-md border border-orange-200 bg-orange-50 px-3 py-1.5 text-xs font-medium text-orange-700 transition hover:bg-orange-100 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              Cancel
                            </button>
                          </>
                        )}

                        <button
                          type="button"
                          disabled={actionLoading === appt._id}
                          onClick={() =>
                            deleteAppointment(appt._id)
                          }
                          className="rounded-md border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          Delete
                        </button>

                      </div>
                    </td>

                  </tr>
                ))}

              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}

