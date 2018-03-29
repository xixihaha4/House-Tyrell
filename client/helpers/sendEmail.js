import axios from 'axios';

export default function sendReceipt(items, price) {
  axios.post('/send/receipt', { items, price })
    .catch((error) => {
      throw error;
    });
}
