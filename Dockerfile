FROM alpine:3.7
MAINTAINER Jonathan Bunde-Pedersen <jonathan@purebadger.com>

ENV HUGO_VERSION 0.53
ENV HUGO_BINARY hugo_${HUGO_VERSION}_linux-64bit

# Download and Install hugo
RUN mkdir /usr/local/hugo
ADD https://github.com/spf13/hugo/releases/download/v${HUGO_VERSION}/${HUGO_BINARY}.tar.gz /usr/local/hugo/
RUN tar xzf /usr/local/hugo/${HUGO_BINARY}.tar.gz -C /usr/local/hugo/ \
	&& ln -s /usr/local/hugo/hugo /usr/local/bin/hugo \
	&& rm /usr/local/hugo/${HUGO_BINARY}.tar.gz

##Copying App 
COPY ./app /app 
RUN cd /app && hugo

FROM nginx:1.21.6
COPY --from=0  /app/public /usr/share/nginx/html
