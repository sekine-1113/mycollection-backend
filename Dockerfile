FROM node:20
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen --prod=false
COPY . .
CMD ["pnpm", "run", "dev"]
