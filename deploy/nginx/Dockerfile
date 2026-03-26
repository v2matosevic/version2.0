FROM nginx:1.27-alpine

# Bake all configs into the image (no volume mounts needed)
COPY deploy/nginx/nginx.conf /etc/nginx/nginx.conf
COPY deploy/nginx/conf.d/ /etc/nginx/conf.d/

# Self-signed cert generation + startup
COPY deploy/nginx/entrypoint.sh /docker-entrypoint.d/99-generate-cert.sh
RUN chmod +x /docker-entrypoint.d/99-generate-cert.sh
