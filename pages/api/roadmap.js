import * as admin from 'firebase-admin';
import { v4 as uuidv4 } from 'uuid';
import serviceAccount from "../../servicekey.json";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://gdg-dit-rlb405-default-rtdb.firebaseio.com",
  });
}

const database = admin.database(); 

export const config = {
  api: {
    bodyParser: true,
  },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Create a new roadmap
    try {
      const { title, description, steps, status, notionHtmlFileUrl } = req.body;

      if (!title || !description || !notionHtmlFileUrl) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      const roadmapId = uuidv4(); 
      const roadmapData = {
        id: roadmapId,
        title,
        description,
        steps: Array.isArray(steps) ? steps : JSON.parse(steps || '[]'),
        status: status || 'draft',
        notionHtmlFileUrl, // Store the file URL instead
        createdAt: admin.database.ServerValue.TIMESTAMP,
        updatedAt: admin.database.ServerValue.TIMESTAMP,
      };

      // Save roadmap to the "roadmaps" collection
      await database.ref('roadmaps').child(roadmapId).set(roadmapData);

      return res.status(200).json({ message: 'Roadmap created successfully', roadmap: roadmapData });
    } catch (error) {
      console.error('Error creating roadmap:', error);
      return res.status(500).json({ message: 'Internal Server Error', error });
    }
  } else if (req.method === 'PUT') {
    // Update an existing roadmap
    try {
      const { id, title, description, steps, status, notionHtmlFileUrl } = req.body;

      if (!id) {
        return res.status(400).json({ message: 'Roadmap ID is required for updating.' });
      }

      const updatedData = {
        title,
        description,
        steps: Array.isArray(steps) ? steps : JSON.parse(steps || '[]'),
        status,
        notionHtmlFileUrl, // Update the file URL
        updatedAt: admin.database.ServerValue.TIMESTAMP,
      };

      await database.ref('roadmaps').child(id).update(updatedData);

      return res.status(200).json({ message: 'Roadmap updated successfully', updatedData });
    } catch (error) {
      console.error('Error updating roadmap:', error);
      return res.status(500).json({ message: 'Internal Server Error', error });
    }
  } else if (req.method === 'GET') {
    // Retrieve roadmaps
    try {
      const { id } = req.query;

      if (id) {
        const roadmapSnapshot = await database.ref('roadmaps').child(id).once('value');
        if (!roadmapSnapshot.exists()) {
          return res.status(404).json({ message: 'Roadmap not found' });
        }

        return res.status(200).json(roadmapSnapshot.val());
      } else {
        const roadmapsSnapshot = await database.ref('roadmaps').once('value');
        const roadmaps = roadmapsSnapshot.val();
        const roadmapsList = roadmaps
          ? Object.keys(roadmaps).map(key => ({ id: key, ...roadmaps[key] }))
          : [];

        return res.status(200).json(roadmapsList);
      }
    } catch (error) {
      console.error('Error fetching roadmaps:', error);
      return res.status(500).json({ message: 'Internal Server Error', error });
    }
  } else if (req.method === 'DELETE') {
    try {
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({ message: 'Roadmap ID is required for deletion.' });
      }

      await database.ref('roadmaps').child(id).remove();

      return res.status(200).json({ message: 'Roadmap deleted successfully' });
    } catch (error) {
      console.error('Error deleting roadmap:', error);
      return res.status(500).json({ message: 'Internal Server Error', error });
    }
  }
}
