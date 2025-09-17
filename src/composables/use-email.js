export const useEmail = () => {
  const send = (message, subject = 'Formularz kontaktowy', recipientEmail = process.env.BASE_EMAIL) => {
    const email = {
      "email": {
        "text": message,
        "subject": subject,
        "from": {
          "name": 'Formularz kontaktowy',
          "email": process.env.BASE_EMAIL
        },
        "to": [
          {
            "name": "Cezary Krawiec",
            "email": recipientEmail
          }
        ]
      }
    };

    return fetch(`${process.env.NETLIFY_FUNCTIONS_DIR}/send-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(email),
    })
  };

  return { send };
}