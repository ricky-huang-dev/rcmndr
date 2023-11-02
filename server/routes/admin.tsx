import express from 'express'
import { renderToStaticMarkup } from 'react-dom/server'
import { auth, requiredScopes } from 'express-oauth2-jwt-bearer'
import * as jose from 'jose'
import pkg from 'express-openid-connect'

import Layout from '../components/Layout.tsx'

const { requiresAuth } = pkg
const router = express.Router()

function requiresScope(requiredScope: string) {
  return (req, res, next) => {
    // Safely extract the access token
    const accessToken = req.oidc && req.oidc.accessToken ? req.oidc.accessToken.access_token : null;

    if (!accessToken || typeof accessToken !== 'string') {
      return res.status(403).send('Forbidden: no or invalid access token');
    }

    try {
      const decoded = jose.decodeJwt(accessToken);  // Decode without verification
      const scopes = decoded && decoded.scope ? decoded.scope.split(' ') : [];

      if (!scopes.includes(requiredScope)) {
        return res.status(403).send('Forbidden: insufficient scope');
      }

      next();
    } catch (e) {
      return res.status(403).send(`Forbidden: invalid token (${e.message})`);
    }
  };
}


// The /profile route will show the user profile as JSON
router.get('/dashboard', requiresScope('update:users'), (req, res) => {

	res.send(renderToStaticMarkup(
		<Layout>
			<main>
				<p>
					{JSON.stringify(req.oidc.user, null, 2)}
				</p>
				<p>
					{JSON.stringify(req.oidc.accessToken, null, 2)}
				</p>
			</main>
		</Layout>)
	);
});

router.get('/', (req, res) => {
	res.send(renderToStaticMarkup(<Layout>
		<a href='/logout'>logout</a>
		{req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out'}
	</Layout>))
})

export default router
