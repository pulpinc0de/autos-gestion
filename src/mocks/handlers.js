import { http } from 'msw';

export const handlers = [
  http.post('http://localhost:3000/api/usuarios/login', async ({ request }) => {
    try {
      const body = await request.json();
      const { email } = body || {};
      return new Response(JSON.stringify({ user: { _id: 'u1', name: 'Admin', email }, token: 'fake-jwt' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (err) {
      return new Response(JSON.stringify({ message: 'Invalid request body' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }),
];