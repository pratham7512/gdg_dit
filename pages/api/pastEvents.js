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

export const config = {
  api: {
    bodyParser: true,
  },
};

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { id } = req.query; // Optional: Fetch a specific past event by ID

      if (id) {
        // Fetch a specific past event
        const eventSnapshot = await database.ref('events/pastEvents').child(id).once('value');
        if (!eventSnapshot.exists()) {
          return res.status(404).json({ message: 'Past event not found' });
        }

        return res.status(200).json(eventSnapshot.val());
      } else {
        // Fetch all past events
        const pastEventsSnapshot = await database.ref('events/pastEvents').once('value');
        const pastEvents = pastEventsSnapshot.val();
        
        
        // Format the response
        const pastEventsList = pastEvents
          ? Object.keys(pastEvents).map((key) => ({ id: key, ...pastEvents[key] }))
          : [];
          console.log(pastEventsList);
        return res.status(200).json(pastEventsList);
      }
    } catch (error) {
      console.error('Error fetching past events:', error);
      return res.status(500).json({ message: 'Internal Server Error', error });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
