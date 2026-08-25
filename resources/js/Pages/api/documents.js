export default function handler(req, res) {
  if (req.method === 'GET') {
    // Your logic here
    res.status(200).json([]);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}