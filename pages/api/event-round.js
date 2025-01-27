import * as admin from 'firebase-admin';
import { v4 as uuidv4 } from 'uuid';
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_KEY);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://gdg-dit-rlb405-default-rtdb.firebaseio.com",
  });
}

const database = admin.database(); 

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb', // Adjust as needed for file uploads
    },
  },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Submit a new event round entry
    try {
      const { participantName, email, eventName, htmlContent } = req.body;

      if (!participantName || !email || !eventName || !htmlContent) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      const entryId = uuidv4();
      const entryData = {
        id: entryId,
        participantName,
        email,
        eventName,
        htmlContent, // Store HTML content as string
        createdAt: admin.database.ServerValue.TIMESTAMP,
      };

      // Save entry to "event-round" collection
      await database.ref('event-round').child(entryId).set(entryData);

      return res.status(200).json({ message: 'Entry submitted successfully', entry: entryData });
    } catch (error) {
      console.error('Error submitting entry:', error);
      return res.status(500).json({ message: 'Internal Server Error', error });
    }
  } else if (req.method === 'GET') {
    // Retrieve event round entries
    try {
      const { id } = req.query;

      if (id) {
        const entrySnapshot = await database.ref('event-round').child(id).once('value');
        if (!entrySnapshot.exists()) {
          return res.status(404).json({ message: 'Entry not found' });
        }

        return res.status(200).json(entrySnapshot.val());
      } else {
        const entriesSnapshot = await database.ref('event-round').once('value');
        const entries = entriesSnapshot.val();
        const entriesList = entries
          ? Object.keys(entries).map(key => ({ id: key, ...entries[key] }))
          : [];

        return res.status(200).json(entriesList);
      }
    } catch (error) {
      console.error('Error fetching entries:', error);
      return res.status(500).json({ message: 'Internal Server Error', error });
    }
  } else if (req.method === 'DELETE') {
    // Delete an event round entry
    try {
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({ message: 'Entry ID is required for deletion.' });
      }

      await database.ref('event-round').child(id).remove();

      return res.status(200).json({ message: 'Entry deleted successfully' });
    } catch (error) {
      console.error('Error deleting entry:', error);
      return res.status(500).json({ message: 'Internal Server Error', error });
    }
  } else {
    res.setHeader('Allow', ['POST', 'GET', 'DELETE']);
    return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
