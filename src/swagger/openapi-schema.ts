import authEndpoint from './endpoints/authEndpoint';
import userEndpoint from './endpoints/userEndpoint';

export const openAPISchemas = [...userEndpoint, ...authEndpoint];
