FROM nginx:1.15.5

ENV HTML_DIR /usr/share/nginx/html

ENV PROJECT_NAME okr-app
ENV DEPLOY_DIR ${HTML_DIR}

COPY ./nginx/nginx.conf /etc/nginx/
COPY ./nginx/custom.conf /etc/nginx/conf.d/

RUN mkdir -p ${DEPLOY_DIR}
COPY ./build/ ${DEPLOY_DIR}/
