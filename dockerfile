FROM grafana/k6:latest

WORKDIR /loadtest_k6

COPY . .

CMD ["run", "scripts/main.js"]
