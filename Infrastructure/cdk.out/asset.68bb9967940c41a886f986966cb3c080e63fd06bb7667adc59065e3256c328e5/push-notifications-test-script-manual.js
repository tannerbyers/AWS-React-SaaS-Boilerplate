const webpush = require("web-push");

// Create payload
  const payload = JSON.stringify({ title: "Push Test" });

  const parsedUrl = new URL("https://fcm.googleapis.com/fcm/send/fzdl2qvnVQg:APA91bGMfQ4juAXwn9oT2-uWgadmg0XWHn9dLJxqK0tQH3TtYpsa6MwD95EK55fJHVj2CYaDKgX9M9IhBETk0k4Mza_tGs4aiFa6T");
const audience = `${parsedUrl.protocol}//${parsedUrl.hostname}`;


const vapidKeys = webpush.generateVAPIDKeys();

  webpush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
  );
  
  
  // Pass object into sendNotification
  webpush
    .sendNotification({
        endpoint: 'https://fcm.googleapis.com/fcm/send/fzdl2qvnVQg:APA91bGMfQ4juAXwn9oT2-uWgadmg0XWHn9dLJxqK0tQH3TtYpsa6MwD95EK55fJHVj2CYaDKgX9M9IhBETk0k4Mza_tGs4aiFa6T-wT4kVCsBRRfO_M8SzONBA165Hnz15emoKbPPcM',
        expirationTime: null,
        keys: {
          p256dh: 'BI9uD-3fWDm_mFzZzr1-YFcjdO0U8fnXnwOm_AhTDTCZHH8Ho_nF0x3f14k2y7TTw72yDtZl8fGdYfviDSAaF7g',
          auth: 'IcTD8Vj5iKugBIUi52A6gw'
        }
      }, payload, {
        headers: vapidHeaders
      })
    .catch(err => console.error(err));

