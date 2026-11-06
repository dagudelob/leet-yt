FROM node:20-alpine

# Install dependencies at the root level (/node_modules)
# This allows volume-mounting the workspace to /app without overriding node_modules or needing sub-mounts
WORKDIR /
COPY package*.json ./
RUN npm install

WORKDIR /app
COPY . .

ENV PATH="/node_modules/.bin:${PATH}"
ENV NODE_PATH="/node_modules"

EXPOSE 8080

CMD ["npm", "run", "dev"]
