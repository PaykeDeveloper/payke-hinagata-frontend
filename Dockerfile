FROM node:12.19.0

RUN apt-get update -qq

RUN npm update -g
RUN useradd -m app
WORKDIR /app/frontend
RUN chown -R app:app .
USER app
