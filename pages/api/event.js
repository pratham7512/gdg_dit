
import { v4 as uuidv4 } from 'uuid'; // Assuming you are using uuid to generate unique IDs
import * as admin from 'firebase-admin';

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_KEY);
// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://gdg-dit-rlb405-default-rtdb.firebaseio.com"
  });
}

const database = admin.database(); // database instance

export const config = {
  api: {
    bodyParser: true, // Use default body parser as you no longer need to parse form data
  },
};

// POST request to create a new event
export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Create a new event
    try {
      const fields = req.body; // Assuming JSON body format (text and object data)

      // Debugging: Log the received form data
      console.log('Received form data:', fields);

      // Validation: Ensure all required fields are present
      if (!fields.name || !fields.date || !fields.details) {
        console.error('Missing required fields');
        return res.status(400).json({ message: 'Missing required fields' });
      }

      // Prepare event data
      const eventId = fields.id || uuidv4(); // Use provided ID or generate a new unique ID
      const eventData = {
        id:eventId,
        name: fields.name,
        date: fields.date,
        dateTime: fields.dateTime,
        imageUrls: Array.isArray(fields.image) ? fields.image : JSON.parse(fields.image || '[]'), // Safely handle image
        description: fields.description,
        details: fields.details,
        domain: fields.domain || '',
        entryFees: fields.entryFees || '0',
        faq: Array.isArray(fields.faq) ? fields.faq : JSON.parse(fields.faq || '[]'), // Safely handle faq
        itemsToBring: Array.isArray(fields.itemsToBring) ? fields.itemsToBring : JSON.parse(fields.itemsToBring || '[]'), // Safely handle itemsToBring
        location: fields.location,
        mode: fields.mode || 'offline',
        prerequisites: fields.prerequisites || '',
        prizepool: Array.isArray(fields.prizepool) ? fields.prizepool : JSON.parse(fields.prizepool || '[]'), // Safely handle prizepool
        speakers: Array.isArray(fields.speakers) ? fields.speakers : JSON.parse(fields.speakers || '[]'), // Safely handle speakers
        sponsors: Array.isArray(fields.sponsors) ? fields.sponsors : JSON.parse(fields.sponsors || '[]'), // Safely handle sponsors
        status: fields.status || 'upcoming',
        coordinators: Array.isArray(fields.coordinators) ? fields.coordinators : JSON.parse(fields.coordinators || '[]'), // Safely handle coordinators
        contact: fields.contact || '',
        rsvpLink:fields.rsvpLink || '',
        createdAt: admin.database.ServerValue.TIMESTAMP,
      };

      // Debugging: Log the event data before saving
      console.log('Event data to be saved:', eventData);

      // Save to Realtime Database (events collection)
      // await database.ref('events').child(eventId).set(eventData);

      // Also save the event under the appropriate sub-collection (upcomingEvents or pastEvents)
      if (eventData.status === 'upcoming') {
        await database.ref('events/upcomingEvents').child(eventId).set(eventData);
      } else {
        await database.ref('events/pastEvents').child(eventId).set(eventData);
      }

      // Return success response
      return res.status(200).json({ message: 'Event added successfully', eventData });
    } catch (error) {
      console.error('Error adding event:', error);
      return res.status(500).json({ message: 'Internal Server Error', error });
    }
  } else if (req.method === 'PUT') {
    // Update an existing event
    try {
      const fields = req.body; // Assuming JSON body format (text and object data)

      // Validation: Ensure event ID is provided
      if (!fields.id) {
        console.error('Event ID is required for updating');
        return res.status(400).json({ message: 'Event ID is required for updating.' });
      }

      // Prepare updated data
      const updatedData = {
        ...fields,
        image: fields.image ? JSON.parse(fields.image) : undefined, // Update image only if new data is provided
        updatedAt: admin.database.ServerValue.TIMESTAMP,
      };

      // Debugging: Log the updated data before updating
      console.log('Updated event data:', updatedData);

      // Update Realtime Database document in 'events'
      await database.ref('events').child(fields.id).update(updatedData);

      // Also update the event under the appropriate sub-collection (upcomingEvents or pastEvents)
      if (updatedData.status === 'upcoming') {
        await database.ref('upcomingEvents').child(fields.id).update(updatedData);
        // Remove from pastEvents if previously in pastEvents
        await database.ref('pastEvents').child(fields.id).remove();
      } else {
        await database.ref('pastEvents').child(fields.id).update(updatedData);
        // Remove from upcomingEvents if previously in upcomingEvents
        await database.ref('upcomingEvents').child(fields.id).remove();
      }

      // Return success response
      return res.status(200).json({ message: 'Event updated successfully', updatedData });
    } catch (error) {
      console.error('Error updating event:', error);
      return res.status(500).json({ message: 'Internal Server Error', error });
    }
  } else if (req.method === 'GET') {
    // Fetch event(s)
    try {
      const { id } = req.query;

      if (id) {
        // Fetch a specific event
        const eventSnapshot = await database.ref('events').child(id).once('value');
        if (!eventSnapshot.exists()) {
          console.error('Event not found');
          return res.status(404).json({ message: 'Event not found' });
        }

        // Debugging: Log the event data fetched
        console.log('Fetched event:', eventSnapshot.val());

        return res.status(200).json(eventSnapshot.val());
      } else {
        // Fetch all events
        const eventsSnapshot = await database.ref('events/upcomingEvents').once('value');
        const events = eventsSnapshot.val();
        const eventsList = events ? Object.keys(events).map(key => ({ id: key, ...events[key] })) : [];

        // Debugging: Log the list of events fetched
        console.log('Fetched events:', eventsList);

        return res.status(200).json(eventsList);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
      return res.status(500).json({ message: 'Internal Server Error', error });
    }
  } else if (req.method === 'DELETE') {
    // Delete an event
    try {
      const { id } = req.query;

      if (!id) {
        console.error('Event ID is required for deletion');
        return res.status(400).json({ message: 'Event ID is required for deletion.' });
      }

      // Delete event from all collections (events, upcomingEvents, pastEvents)
      await database.ref('events').child(id).remove();
      await database.ref('upcomingEvents').child(id).remove();
      await database.ref('pastEvents').child(id).remove();

      // Return success response
      return res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
      console.error('Error deleting event:', error);
      return res.status(500).json({ message: 'Internal Server Error', error });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
