import { v4 as uuidv4 } from 'uuid'; // To generate unique IDs
import * as admin from 'firebase-admin';

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_KEY);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://gdg-dit-rlb405-default-rtdb.firebaseio.com",
  });
}

const database = admin.database(); // Firebase Realtime Database instance

export const config = {
  api: {
    bodyParser: true,
  },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Add new team members
    try {
      const members = req.body;

      if (!Array.isArray(members) || members.length === 0) {
        return res.status(400).json({ message: 'Invalid data. Please provide an array of team members.' });
      }

      const membersData = members.map((member) => ({
        id: member.id || uuidv4(),
        name: member.name,
        role: member.role,
        image: member.image || '',
        domain: member.domain || '',
        bio: member.bio || '',
        socialLinks: member.socialLinks || {
          linkedin: '',
          github: '',
          twitter: '',
        },
        createdAt: admin.database.ServerValue.TIMESTAMP,
      }));

      const updates = {};
      membersData.forEach((member) => {
        updates[`team-members/${member.id}`] = member;
      });

      await database.ref().update(updates);

      return res.status(200).json({ message: 'Team members added successfully', members: membersData });
    } catch (error) {
      console.error('Error adding team members:', error);
      return res.status(500).json({ message: 'Internal Server Error', error });
    }
  } else if (req.method === 'PUT') {
    // Update team member
    try {
      const member = req.body;

      if (!member.id) {
        return res.status(400).json({ message: 'Member ID is required for updating.' });
      }

      const updates = {
        ...member,
        updatedAt: admin.database.ServerValue.TIMESTAMP,
      };

      await database.ref(`team-members/${member.id}`).update(updates);

      return res.status(200).json({ message: 'Team member updated successfully', member: updates });
    } catch (error) {
      console.error('Error updating team member:', error);
      return res.status(500).json({ message: 'Internal Server Error', error });
    }
  } else if (req.method === 'GET') {
    // Fetch team members or a specific member
    try {
      const { id } = req.query;

      if (id) {
        const memberSnapshot = await database.ref(`team-members/${id}`).once('value');
        if (!memberSnapshot.exists()) {
          return res.status(404).json({ message: 'Team member not found' });
        }

        return res.status(200).json(memberSnapshot.val());
      } else {
        const membersSnapshot = await database.ref('team-members').once('value');
        const members = membersSnapshot.val();
        const membersList = members
          ? Object.keys(members).map((key) => ({ id: key, ...members[key] }))
          : [];

        return res.status(200).json(membersList);
      }
    } catch (error) {
      console.error('Error fetching team members:', error);
      return res.status(500).json({ message: 'Internal Server Error', error });
    }
  } else if (req.method === 'DELETE') {
    // Delete team member
    try {
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({ message: 'Member ID is required for deletion.' });
      }

      await database.ref(`team-members/${id}`).remove();

      return res.status(200).json({ message: 'Team member deleted successfully' });
    } catch (error) {
      console.error('Error deleting team member:', error);
      return res.status(500).json({ message: 'Internal Server Error', error });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
