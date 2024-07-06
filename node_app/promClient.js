const client = require('prom-client');
const gcStats = require('prometheus-gc-stats');

const Registry = client.Registry;
const register = new Registry();

client.collectDefaultMetrics({register});

const startGcStats = gcStats(register, {prefix: "_backend_nodejs__"});
startGcStats();

const httpRequestDurationMicroseconds = new client.Histogram({
  name: 'http_request_duration_ms',
  help: 'Duração das requisições HTTP em milissegundos',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.1, 5, 15, 50, 100, 300, 500, 1000] // Buckets para medir latência
});

const httpRequestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code']
});

const errorCounter = new client.Counter({
  name: 'app_errors_total',
  help: 'Total number of errors in the application',
  labelNames: ['error_type']
});

const memoryUsageGauge = new client.Gauge({
  name: 'memory_usage_bytes',
  help: 'Memory usage of the application in bytes',
  labelNames: ['type']
});

const httpRequestDurationSummary = new client.Summary({
  name: 'http_request_duration_summary_ms',
  help: 'Summary of HTTP request durations in milliseconds',
  labelNames: ['method', 'route', 'status_code'],
  percentiles: [0.5, 0.75, 0.95, 0.99] // Percentis de interesse
});

setInterval(() => {
  const memoryUsage = process.memoryUsage();
  memoryUsageGauge.set({type: 'rss'}, memoryUsage.rss);
  memoryUsageGauge.set({type: 'heapTotal'}, memoryUsage.heapTotal);
  memoryUsageGauge.set({type: 'heapUsed'}, memoryUsage.heapUsed);
  memoryUsageGauge.set({type: 'external'}, memoryUsage.external);
}, 5000);

register.registerMetric(httpRequestDurationSummary);
register.registerMetric(memoryUsageGauge);
register.registerMetric(errorCounter);
register.registerMetric(httpRequestCounter);
register.registerMetric(httpRequestDurationMicroseconds);

module.exports = {
  register,
  httpRequestDurationMicroseconds,
  httpRequestCounter,
  errorCounter
};
