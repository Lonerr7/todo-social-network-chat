import dotenv from 'dotenv';
import { getCurrentMode, MODES_ENUM } from '../../lib/getCurrentMode/getCurrentMode';

dotenv.config({ path: './config.env' });

if (getCurrentMode() === MODES_ENUM.DEVELOPMENT) {
  dotenv.config({ path: './.env.local', override: true });
}