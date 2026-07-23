FROM node:20-slim

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /project

COPY app/ app/

RUN cd app/backend && pnpm install
RUN cd app/frontend && pnpm install
RUN cd app/frontend && pnpm build

EXPOSE 3001

CMD ["sh", "-c", "cd app/backend && pnpm start"]
