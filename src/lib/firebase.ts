import { initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

initializeApp({
  credential: cert('../../my-collection-project-service-account.json'),
});

export const auth = getAuth();
