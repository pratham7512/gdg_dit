import * as admin from 'firebase-admin';

// Ensure Firebase Admin is initialized
if (!admin.apps.length) {
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_KEY);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://gdg-dit-rlb405-default-rtdb.firebaseio.com",
  });
}

const database = admin.database(); // Database instance

/**
 * Move events from 'upcomingEvents' to 'pastEvents' if the current time is greater than the event time.
 */
export const moveEventsToPast = async () => {
  try {
    const currentTime = Date.now();

    // Fetch all upcoming events
    const snapshot = await database.ref('events/upcomingEvents').once('value');
    if (!snapshot.exists()) {
      console.log("No upcoming events to process.");
      return;
    }

    const upcomingEvents = snapshot.val();
    const updates = {};

    // Iterate over events and check their eventTime
    Object.keys(upcomingEvents).forEach((eventId) => {
      const event = upcomingEvents[eventId];

      if (new Date(event.dateTime).getTime() <= currentTime) {
        // Move the event to pastEvents
        updates[`events/pastEvents/${eventId}`] = event;

        // Remove it from upcomingEvents
        updates[`events/upcomingEvents/${eventId}`] = null;
      }
    });

    // Apply batch updates to the database
    await database.ref().update(updates);
    console.log("Moved past events successfully.");
  } catch (error) {
    console.error("Error moving events to past:", error);
  }
};
