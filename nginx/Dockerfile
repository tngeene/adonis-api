FROM nginxinc/nginx-unprivileged:1-alpine

RUN rm /etc/nginx/conf.d/default.conf
COPY block_parties.conf /etc/nginx/conf.d

USER nginx