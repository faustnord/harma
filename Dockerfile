# FRONTEND BUILD
FROM node:16.20-alpine AS frontend
WORKDIR /frontend
COPY /frontend/package.json /frontend/package-lock.json ./
RUN npm ci
COPY /frontend ./
RUN npm run build

# BACKEND BUILD
FROM golang:1.19-alpine AS backend
WORKDIR /backend
COPY /backend/go.mod /backend/go.sum ./
RUN go mod download
COPY /backend ./
RUN CGO_ENABLED=0 GOOS=linux go build -o app main.go

# FINAL APP
FROM alpine AS app
WORKDIR /app
ENV ENV production
COPY --from=backend /backend/app /backend/.env.production ./
COPY --from=frontend /frontend/build ./build
EXPOSE 80
CMD ["./app"]
