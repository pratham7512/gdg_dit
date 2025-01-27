import * as admin from 'firebase-admin';
import { v4 as uuidv4 } from 'uuid';
import Cors from 'cors'; // Add this import

// Initialize CORS middleware
const cors = Cors({
  methods: ['POST', 'GET', 'DELETE', 'HEAD', 'OPTIONS'],
  origin: '*',
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200
});

// Helper method to run middleware
const runMiddleware = (req, res, fn) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
};

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
      sizeLimit: '10mb',
    },
  },
};

export default async function handler(req, res) {
  await runMiddleware(req, res, cors);
  
  // Add these headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Vary', 'Origin');

  if (req.method === 'POST') {
    try {
      const { email, teamid, htmlContentUrl } = req.body;

      if (!email || !teamid || !htmlContentUrl) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      const entryId = uuidv4();
      const entryData = {
        id: entryId,
        email,
        teamid,
        htmlContentUrl,
        createdAt: admin.database.ServerValue.TIMESTAMP,
      };

      await database.ref('event-round').child(entryId).set(entryData);

      return res.status(200).json({ message: 'Entry submitted successfully', entry: entryData });
    } catch (error) {
      console.error('Error submitting entry:', error);
      return res.status(500).json({ message: 'Internal Server Error', error });
    }
  } else if (req.method === 'GET') {
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
