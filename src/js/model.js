// // Function to retrieve cityData from IndexedDB
// function getCityDataFromIndexedDB(callback) {
//   const request = indexedDB.open("CityDataDB", 1);

//   request.onsuccess = function (event) {
//     const db = event.target.result;
//     const transaction = db.transaction(["addresses"], "readonly");
//     const objectStore = transaction.objectStore("addresses");

//     const getRequest = objectStore.get(1); // Assuming you stored it with key 1, change if needed
//     getRequest.onsuccess = function () {
//       const cityData = getRequest.result;
//       callback(cityData); // Use the data when available
//     };

//     getRequest.onerror = function () {
//       console.error("Error retrieving city data from IndexedDB");
//     };
//   };

//   request.onerror = function () {
//     console.error("Error opening IndexedDB");
//   };
// }
