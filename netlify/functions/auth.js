exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const APP_PASSWORD = process.env.APP_PASSWORD;
  
  let body;
  try {
    body = JSON.parse(event.body);
  } catch (e) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Requête invalide.' }) };
  }

  const { password } = body;

  if (!password || password !== APP_PASSWORD) {
    return {
      statusCode: 401,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'Mot de passe incorrect.' })
    };
  }

  // Génère un token de session simple
  const token = Buffer.from(`moodstream:${Date.now()}:${Math.random()}`).toString('base64');

  return {
    statusCode: 200,
    headers: { 'Access-Control-Allow-Origin': '*' },
    body: JSON.stringify({ success: true, token })
  };
};
