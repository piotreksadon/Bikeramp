import { registerAs } from '@nestjs/config';

export default registerAs('google-maps', () => ({
  api_key: process.env.GOOGLE_API_KEY,
}));
