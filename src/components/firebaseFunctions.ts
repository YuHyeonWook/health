// import { ref, set, get, update } from 'firebase/database';
// import { db } from '@/firebase';

// export const saveOrUpdateUserData = async (userId, userData) => {
//   const userRef = ref(db, `users/${userId}`);
//   return set(userRef, { ...userData, id: userId });
// };

// export const readUserData = async (userId) => {
//   const userRef = ref(db, `users/${userId}`);
//   const snapshot = await get(userRef);
//   if (snapshot.exists()) {
//     return snapshot.val();
//   } else {
//     console.log('No data available');
//     return null;
//   }
// };

// export const updateUserData = async (userId, phoneNumber, ) => {
//   const userRef = ref(db, `users/${userId}`);
//   return update(userRef, userData);
// };
