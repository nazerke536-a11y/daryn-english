export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { password } = req.body;

  // Debug: log what we receive
  console.log('Received password:', password);
  console.log('Expected password:', process.env.TEACHER_PASSWORD);

  const teacherPassword = process.env.TEACHER_PASSWORD || 'daryn2025';

  if (!password || password.trim() !== teacherPassword.trim()) {
    return res.status(401).json({
      error: 'Құпиясөз қате!',
      hint: `Expected length: ${teacherPassword.length}, Got length: ${password ? password.length : 0}`
    });
  }

  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;

  if (!url || !token) {
    return res.status(500).json({ error: 'DB not configured', url: !!url, token: !!token });
  }

  try {
    const keysRes = await fetch(`${url}/smembers/all_students`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const keysData = await keysRes.json();
    const keys = keysData.result || [];

    if (keys.length === 0) {
      return res.status(200).json({ students: [], classes: [] });
    }

    const students = [];
    for (const key of keys) {
      const r = await fetch(`${url}/get/${encodeURIComponent(key)}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const d = await r.json();
      if (d.result) {
        try { students.push(JSON.parse(d.result)); } catch(e) {}
      }
    }

    students.sort((a, b) => (b.totalPct || 0) - (a.totalPct || 0));
    const classes = [...new Set(students.map(s => s.className))].sort();

    return res.status(200).json({ students, classes });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}
