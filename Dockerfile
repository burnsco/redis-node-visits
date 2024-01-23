FROM oven/bun:canary-alpine

WORKDIR /usr/src/app

COPY package.json bun.lockb ./
RUN bun install

COPY . ./

RUN app add redis --update

USER bun
EXPOSE 3000/tcp
ENTRYPOINT ["bun", "run", "index.ts"]
