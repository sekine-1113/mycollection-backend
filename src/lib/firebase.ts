import { initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import path from 'path';
import { __dirnameWrapper } from '../utils';

const __dirname = __dirnameWrapper(import.meta.url);

const app = initializeApp({
  credential: cert(
    path.resolve(__dirname, '../../my-collection-project-service-account.json'),
  ),
});

export const auth = getAuth(app);
