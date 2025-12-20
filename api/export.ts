import { db } from './_utils.js';

export default async function handler(req: any, res: any) {
  // 1. Security Check
  const key = req.query.key;
  if (key !== process.env.CRON_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const type = req.query.type; // 'registrations', 'contacts', 'partners'
  
  try {
    let collectionName = '';
    let fields: string[] = [];

    // 2. Determine Collection and Fields based on type
    switch (type) {
      case 'registrations':
        collectionName = 'registrations';
        fields = ['firstName', 'lastName', 'email', 'phone', 'organization', 'role', 'industry', 'cityCountry', 'linkedin', 'source', 'goals', 'community', 'timestamp'];
        break;
      case 'contacts':
        collectionName = 'contacts';
        fields = ['name', 'email', 'message', 'timestamp'];
        break;
      case 'partners':
        collectionName = 'partners';
        fields = ['fullName', 'orgName', 'email', 'phone', 'partnershipType', 'reason', 'timestamp'];
        break;
      default:
        return res.status(400).json({ error: 'Invalid type. Must be registrations, contacts, or partners' });
    }

    // 3. Fetch Data from Firestore
    const snapshot = await db.collection(collectionName).get();
    
    if (snapshot.empty) {
      return res.status(404).json({ error: 'No data found' });
    }

    // 4. Convert to CSV
    const csvRows = [];
    
    // Header row
    csvRows.push(fields.join(','));

    // Data rows
    snapshot.forEach(doc => {
      const data = doc.data();
      const row = fields.map(field => {
        let value = data[field];
        
        // Format timestamps
        if (value && typeof value === 'object' && '_seconds' in value) {
            value = new Date(value._seconds * 1000).toISOString();
        } else if (value instanceof Date) {
            value = value.toISOString();
        }

        // Handle string escaping for CSV (quotes, commas, newlines)
        if (typeof value === 'string') {
          // Escape quotes
          value = value.replace(/"/g, '""');
          // Wrap in quotes if contains comma, quote, or newline
          if (value.includes(',') || value.includes('"') || value.includes('\n')) {
            value = `"${value}"`;
          }
        } else if (value === undefined || value === null) {
            value = '';
        }

        return value;
      });
      csvRows.push(row.join(','));
    });

    const csvString = csvRows.join('\n');

    // 5. Return CSV File
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=${collectionName}-${new Date().toISOString().split('T')[0]}.csv`);
    return res.status(200).send(csvString);

  } catch (error: any) {
    console.error('Export Error:', error);
    return res.status(500).json({ error: error.message });
  }
}
