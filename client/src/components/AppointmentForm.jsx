import React, { useState } from 'react';
import axios from 'axios';

export default function AppointmentForm({ fetchAppointments }) {
  const [formData, setFormData] = useState({
    patientName: '',
    mobileNumber: '',
    doctorName: '',
    appointmentDate: '',
    appointmentTime: ''
  });

  const [message, setMessage] = useState({
    text: '',
    type: ''
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage({
      text: '',
      type: ''
    });

    setLoading(true);

    try {
      await axios.post(
        'http://localhost:5000/api/appointments',
        formData
      );

      setMessage({
        text: 'Appointment booked successfully!',
        type: 'success'
      });

      setFormData({
        patientName: '',
        mobileNumber: '',
        doctorName: '',
        appointmentDate: '',
        appointmentTime: ''
      });

      fetchAppointments();
    } catch (error) {
      setMessage({
        text: 'Failed to book appointment. Please try again.',
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full md:w-1/2 mx-auto bg-white border border-gray-200 rounded-xl shadow-sm p-6 sm:p-7">

      {message.text && (
        <div
          className={`mb-5 px-4 py-3 rounded-lg text-sm border ${message.type === 'success'
              ? 'bg-green-50 text-green-700 border-green-200'
              : 'bg-red-50 text-red-700 border-red-200'
            }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit}>

        <div className="space-y-5">

          <div>
            <label
              htmlFor="patientName"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Patient Name
            </label>

            <input
              id="patientName"
              type="text"
              name="patientName"
              placeholder="Enter patient name"
              required
              value={formData.patientName}
              onChange={handleChange}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          <div>
            <label
              htmlFor="mobileNumber"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Mobile Number
            </label>

            <input
              id="mobileNumber"
              type="text"
              name="mobileNumber"
              inputMode="numeric"
              maxLength={10}
              pattern="[0-9]{10}"
              title="Mobile number must be exactly 10 digits long."
              placeholder="Enter mobile number"
              required
              value={formData.mobileNumber}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '');

                setFormData({
                  ...formData,
                  mobileNumber: value
                });
              }}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          <div>
            <label
              htmlFor="doctorName"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Doctor
            </label>

            <select
              id="doctorName"
              name="doctorName"
              required
              value={formData.doctorName}
              onChange={handleChange}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            >
              <option value="">Select doctor</option>

              <option value="Dr. Smith">
                Dr. Smith (General)
              </option>

              <option value="Dr. Sharma">
                Dr. Sharma (Cardio)
              </option>
            </select>
          </div>

          <div>
            <label
              htmlFor="appointmentDate"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Appointment Date
            </label>

            <input
              id="appointmentDate"
              type="date"
              name="appointmentDate"
              required
              value={formData.appointmentDate}
              onChange={handleChange}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          <div>
            <label
              htmlFor="appointmentTime"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Appointment Time
            </label>

            <input
              id="appointmentTime"
              type="time"
              name="appointmentTime"
              required
              value={formData.appointmentTime}
              onChange={handleChange}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-2.5 rounded-lg text-sm font-medium text-white transition ${loading
                ? 'bg-blue-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
              }`}
          >
            {loading ? 'Booking...' : 'Book Appointment'}
          </button>
        </div>

      </form>
    </div>
  );
}