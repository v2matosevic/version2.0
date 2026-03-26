#!/bin/bash
set -euo pipefail

# ============================================================
# Generate a self-signed certificate for initial testing
# Replace with Cloudflare Origin Certificate for production
# ============================================================

SSL_DIR="/opt/version2/deploy/nginx/ssl"
mkdir -p "${SSL_DIR}"

openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout "${SSL_DIR}/origin-key.pem" \
  -out "${SSL_DIR}/origin.pem" \
  -subj "/C=HR/ST=Zadar/L=Zadar/O=Version2/CN=*.version2.hr" \
  -addext "subjectAltName=DNS:version2.hr,DNS:*.version2.hr"

echo "Self-signed certificate generated at ${SSL_DIR}/"
echo "Replace with Cloudflare Origin Certificate for production."
