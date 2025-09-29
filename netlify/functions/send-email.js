const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  try {
    const email = JSON.parse(event.body || '{}');

    if (!email) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing email payload' })
      };
    }

    const clientId = process.env.GATSBY_SENDPULSE_CLIENT_ID;
    const clientSecret = process.env.GATSBY_SENDPULSE_CLIENT_SECRET;

    const tokenResp = await fetch('https://api.sendpulse.com/oauth/access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        grant_type: 'client_credentials',
        client_id: clientId,
        client_secret: clientSecret,
      }),
    });
    if (!tokenResp.ok) {
      return {
        statusCode: tokenResp.status,
        body: JSON.stringify({ error: 'Auth failed' })
      };
    }

    const { access_token } = await tokenResp.json();

    const spResp = await fetch('https://api.sendpulse.com/smtp/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(email),
    });

    const data = await spResp.json().catch(() => ({}));
    if (!spResp.ok) {
      return {
        statusCode: spResp.status,
        body: JSON.stringify({ error: data })
      };
    } 

    return {
      statusCode: 200,
      body: JSON.stringify({ result: true, data })
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ result: false, error: e?.message })
    };
  }
}
