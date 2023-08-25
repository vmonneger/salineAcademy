#!/bin/bash
CERT_PATH="./nginx/certs"

openssl genpkey -algorithm RSA -out $CERT_PATH/private.key

openssl req -new -x509 -key $CERT_PATH/private.key -out $CERT_PATH/certificate.crt -days 365 -subj "/C=FR/ST=Paris/L=Paris/O=Local/OU=Development/CN=localhost"

chmod 400 $CERT_PATH/private.key

echo "Certificat auto-signé et clé privée créés dans $CERT_PATH"
