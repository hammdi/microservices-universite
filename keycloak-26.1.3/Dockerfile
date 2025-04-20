FROM quay.io/keycloak/keycloak:latest

# Copy your existing data
COPY . /opt/keycloak/

# Set environment variables
ENV KEYCLOAK_ADMIN=admin \
    KEYCLOAK_ADMIN_PASSWORD=admin

# Expose port
EXPOSE 8080

# Start Keycloak
CMD ["start-dev"]