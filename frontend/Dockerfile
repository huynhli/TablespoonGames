# ===== STAGE 1: Build the frontend =====
FROM node:20-alpine AS builder

# make and cd into /app
WORKDIR /app

# copy dependencies
COPY package*.json ./
# install dependencies
RUN npm ci

# copy the rest of the project files
COPY . .

# build the production files
RUN npm run build


# ===== STAGE 2: Serve static files =====
FROM nginx:alpine

# copy built files from the builder
COPY --from=builder /app/dist /usr/share/nginx/html

# expose the frontend port (default: 5173 for dev, 80 for prod)
EXPOSE 5173

# nginx automatically serves /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
