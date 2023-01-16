import { setupServer } from 'msw/node';
import { authHandlers } from '@mocks/handlers/auth';

// Setup requests interception using the given handlers inside the setupServer
export const server = setupServer(...authHandlers);
