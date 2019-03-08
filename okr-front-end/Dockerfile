FROM nginx:1.15.5

#ENV USERNAME deploy
ENV HTML_DIR /usr/share/nginx/html
#RUN useradd -ms /bin/bash ${USERNAME}
#RUN chattr -i ${HTML_DIR} && chown -R deploy:deploy ${HTML_DIR}
#RUN chattr -i /var/cache/nginx && chown -R deploy:deploy /var/cache/nginx
#USER ${USERNAME}

#USER root

ENV PROJECT_NAME okr-front-end
ENV DEPLOY_DIR ${HTML_DIR}

COPY ./nginx/nginx.conf /etc/nginx/
COPY ./nginx/custom.conf /etc/nginx/conf.d/

RUN mkdir -p ${DEPLOY_DIR}
COPY ./build/ ${DEPLOY_DIR}/
