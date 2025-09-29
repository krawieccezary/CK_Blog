export const useEmail = () => {
  const send = (message, subject = 'Formularz kontaktowy', recipientEmail = process.env.GATSBY_BASE_EMAIL) => {
    const email = {
      "email": {
        "text": message,
        "subject": subject,
        "from": {
          "name": 'Formularz kontaktowy',
          "email": process.env.GATSBY_BASE_EMAIL
        },
        "to": [
          {
            "name": "Cezary Krawiec",
            "email": recipientEmail
          }
        ]
      }
    };

    return fetch('/.netlify/functions/send-email', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(email),
    })
  };

  return { send };
}