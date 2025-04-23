FROM node:latest
WORKDIR /app
COPY package.json .
RUN pnpm
COPY . .
RUN pnpm build
EXPOSE 8000
CMD ["pnpm", "start"]
