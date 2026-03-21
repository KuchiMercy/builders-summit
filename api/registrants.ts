import { db } from './_utils.js';

export default async function handler(req: any, res: any) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // Basic secret protection
    const authHeader = req.headers.authorization;
    const adminSecret = process.env.ADMIN_SECRET || 'builders-summit-2026-secret';

    if (authHeader !== `Bearer ${adminSecret}`) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const snapshot = await db.collection('registrations').get();
        const registrants: any[] = [];

        snapshot.forEach(doc => {
            registrants.push({ id: doc.id, ...doc.data() });
        });

        // Filter out test data (emails with +)
        const verifiedRegistrants = registrants.filter(r => r.email && !r.email.includes('+'));
        const testRegistrants = registrants.filter(r => r.email && r.email.includes('+'));

        return res.status(200).json({
            total: registrants.length,
            verifiedCount: verifiedRegistrants.length,
            testCount: testRegistrants.length,
            registrants: verifiedRegistrants.map(r => ({
                firstName: r.firstName,
                lastName: r.lastName,
                organization: r.organization,
                role: r.role,
                goals: r.goals,
                source: r.source,
                timestamp: r.timestamp
            }))
        });
    } catch (error: any) {
        console.error('Fetch Registrants Error:', error);
        return res.status(500).json({ error: error.message });
    }
}
