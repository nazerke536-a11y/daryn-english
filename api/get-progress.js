import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { password, className } = req.body;

  // Check teacher password
  const teacherPassword = process.env.TEACHER_PASSWORD || 'daryn2025';
  if (password !== teacherPassword) {
    return res.status(401).json({ error: 'Құпиясөз қате!' });
  }

  try {
    // Get all student keys
    const allKeys = await kv.smembers('all_students');

    if (!allKeys || allKeys.length === 0) {
      return res.status(200).json({ students: [], classes: [] });
    }

    // Fetch all student data
    const studentDataRaw = await Promise.all(
      allKeys.map(key => kv.get(key))
    );

    const students = studentDataRaw
      .filter(Boolean)
      .map(d => typeof d === 'string' ? JSON.parse(d) : d)
      .sort((a, b) => (b.totalPct || 0) - (a.totalPct || 0));

    // Get unique class names
    const classes = [...new Set(students.map(s => s.className))].sort();

    return res.status(200).json({ students, classes });
  } catch (error) {
    console.error('KV Error:', error);
    return res.status(500).json({ error: 'Failed to fetch data' });
  }
}
