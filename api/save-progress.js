import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { studentName, className, grade, scores, totalPct } = req.body;

  if (!studentName || !className) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const key = `student:${className}:${studentName}`;
    const data = {
      studentName,
      className,
      grade,
      scores,
      totalPct,
      updatedAt: new Date().toISOString(),
    };

    await kv.set(key, JSON.stringify(data));

    // Keep a set of all student keys
    await kv.sadd('all_students', key);

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('KV Error:', error);
    return res.status(500).json({ error: 'Failed to save progress' });
  }
}
