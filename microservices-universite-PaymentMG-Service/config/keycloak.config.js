const session = require('express-session');
const Keycloak = require('keycloak-connect');

const keycloakConfig = {
  "realm": process.env.KEYCLOAK_REALM,
  "auth-server-url": process.env.KEYCLOAK_URL,
  "ssl-required": "none",
  "verify-token-audience": false,
  "use-resource-role-mappings": true,
  "resource": process.env.KEYCLOAK_CLIENT_ID,
  "credentials": {
    "secret": process.env.KEYCLOAK_CLIENT_SECRET
  },
  "confidential-port": 0,
  "bearer-only": true
};

let _keycloak;

function initKeycloak() {
    if (_keycloak) {
        return _keycloak;
    }

    // Validate required environment variables
    if (!process.env.KEYCLOAK_REALM || !process.env.KEYCLOAK_URL || !process.env.KEYCLOAK_CLIENT_ID || !process.env.KEYCLOAK_CLIENT_SECRET) {
        throw new Error('Missing required Keycloak environment variables');
    }

    console.log('Initializing Keycloak with config:', {
        realm: keycloakConfig.realm,
        'auth-server-url': keycloakConfig['auth-server-url'],
        resource: keycloakConfig.resource
    });

    const memoryStore = new session.MemoryStore();
    _keycloak = new Keycloak({ store: memoryStore }, keycloakConfig);

    return _keycloak;
}

module.exports = {
    initKeycloak
};