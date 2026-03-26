#!/bin/sh
# Generate self-signed SSL cert if no Cloudflare Origin Cert exists
SSL_DIR="/etc/nginx/ssl"
mkdir -p "$SSL_DIR"

if [ ! -f "$SSL_DIR/origin.pem" ]; then
  apk add --no-cache openssl >/dev/null 2>&1
  openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout "$SSL_DIR/origin-key.pem" \
    -out "$SSL_DIR/origin.pem" \
    -subj "/C=HR/ST=Zadar/L=Zadar/O=Version2/CN=*.version2.hr" \
    -addext "subjectAltName=DNS:version2.hr,DNS:*.version2.hr" 2>/dev/null
  echo "Self-signed SSL certificate generated."
fi
