// import { ref, get } from 'firebase/database';
// import { database } from "@/app/firebase/config";

// // Define the types
// type Roadmap = {
//   notionLink: string;
// };

// type FirebaseRoadmap = Record<string, Roadmap>;

// // Updated function to fetch events
// export default async function fetchRoadmap(id?: string): Promise<string> {
//   try {
//     const dbRef = ref(database, "roadmaps");
//     const snapshot = await get(dbRef);

//     if (snapshot.exists()) {
//       const data = snapshot.val() as FirebaseRoadmap;
//       const roadmapArray = Object.values(data);
      
//       if (id) {
//         // If an ID is provided, return the specific event
//         const foundEvent = roadmapArray.filter((x) => x.notionLink === id);
//         return foundEvent.length > 0 ? foundEvent[0].notionLink : "null"; // Return array or null
//       } else {
//         // Return all events if no ID is specified
//         return roadmapArray[0].notionLink; // Return all events
//       }
//     } else {
//       throw new Error('No events data available');
//     }
//   } catch (err) {
//     console.error('Failed to fetch events:', err);
//     return "null"; // Returning null on error
//   }
// }
