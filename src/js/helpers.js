export function addAppointmentToLocalStorage(newAppointment) {
  // Step 1: Retrieve the current appointments from localStorage (if any)
  let appointments = JSON.parse(localStorage.getItem('appointments')) || [];

  // Step 2: Make sure it isn't a duplicate (criteria: fullName and streetAddress are the same)
  const isDuplicate = appointments.some(
    apt =>
      apt.fullName.trim().toLowerCase() ===
        newAppointment.fullName.trim().toLowerCase() &&
      apt.streetAddress.trim().toLowerCase() ===
        newAppointment.streetAddress.trim().toLowerCase()
  );

  console.log('isDuplicate:', isDuplicate);

  // * improvement to implement: show the previous appointment screen (or a link to cancel it)!
  if (isDuplicate)
    throw new Error(
      "You've already made an appointment with us! Please cancel it before we can book a new one for you!"
    );

  console.log('adding to local storage (success)');
  // Step 3: Add the new appointment to the array
  appointments.push(newAppointment);

  // Step 3: Store the updated array back into localStorage
  localStorage.setItem('appointments', JSON.stringify(appointments));
}

export function isAddressValid(city, zipCode, cityData) {
  const cityMatch = cityData.find(
    entry => entry.cityName.toLowerCase() === city.toLowerCase()
  );
  return cityMatch && cityMatch.zipCodes.includes(zipCode);
}

// * Store city data in IndexedDB
async function storeCityData(cityData) {
  const db = await openDB('CityDatabase', 1, {
    upgrade(db) {
      db.createObjectStore('cityAddresses', { keyPath: 'cityName' });
    },
  });

  const tx = db.transaction('cities', 'readwrite');
  cityData.forEach(city => tx.store.add(city));
  await tx.done;
}

// * Query city data from IndexedDB
async function getCityData(cityName) {
  const db = await openDB('CityDatabase', 1);
  return db.get('cities', cityName);
}

// * notifications

import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

export const notyf = new Notyf({
  duration: 3000,
  position: {
    x: 'center',
    y: 'top',
  },
  types: [
    {
      type: 'warning',
      background: 'orange',
      icon: {
        className: 'material-icons',
        tagName: 'i',
        text: 'warning',
      },
    },
    {
      type: 'error',
      background: 'indianred',
      duration: 6000,
      dismissible: true,
    },
    {
      type: 'confirmation',
      background: '#1a2e50',
      duration: 7000, // Longer duration for confirmation
      dismissible: false,
      message:
        "Appointment Successfully booked! Confirmation email is on it's way!",
      icon: {
        className: 'material-icons',
        tagName: 'i',
        text: 'check_circle',
      },

      position: {
        x: 'center', // Center horizontally
        y: 'center', // Center vertically
      },

      className: 'notyf-confirmation',
    },
  ],
});
