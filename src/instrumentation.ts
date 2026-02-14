/**
 * Next.js instrumentation hook — runs once when the server starts.
 *
 * Configures OpenTelemetry with OTLP exporters for Grafana Cloud
 * (traces, metrics, and logs).
 *
 * All configuration is read from standard OTEL environment variables:
 *   OTEL_EXPORTER_OTLP_ENDPOINT
 *   OTEL_EXPORTER_OTLP_HEADERS
 *   OTEL_SERVICE_NAME
 *   OTEL_RESOURCE_ATTRIBUTES
 */
export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs' && process.env.OTEL_EXPORTER_OTLP_ENDPOINT) {
    const { NodeSDK } = await import('@opentelemetry/sdk-node');
    const { OTLPTraceExporter } = await import('@opentelemetry/exporter-trace-otlp-http');
    const { OTLPMetricExporter } = await import('@opentelemetry/exporter-metrics-otlp-http');
    const { OTLPLogExporter } = await import('@opentelemetry/exporter-logs-otlp-http');
    const { PeriodicExportingMetricReader } = await import('@opentelemetry/sdk-metrics');
    const { BatchLogRecordProcessor } = await import('@opentelemetry/sdk-logs');
    const { resourceFromAttributes } = await import('@opentelemetry/resources');
    const { ATTR_SERVICE_NAME } = await import('@opentelemetry/semantic-conventions');
    const { logs, SeverityNumber } = await import('@opentelemetry/api-logs');

    const sdk = new NodeSDK({
      resource: resourceFromAttributes({
        [ATTR_SERVICE_NAME]: process.env.OTEL_SERVICE_NAME ?? 'maaldo-com-web',
      }),
      traceExporter: new OTLPTraceExporter(),
      metricReader: new PeriodicExportingMetricReader({
        exporter: new OTLPMetricExporter(),
      }),
      logRecordProcessors: [new BatchLogRecordProcessor(new OTLPLogExporter())],
    });

    sdk.start();

    // Bridge console.error and console.warn to OTel log records
    // so errors and warnings appear in Grafana Cloud.
    const logger = logs.getLogger('console');
    const originalError = console.error;
    const originalWarn = console.warn;

    console.error = (...args: unknown[]) => {
      logger.emit({
        severityNumber: SeverityNumber.ERROR,
        severityText: 'ERROR',
        body: args.map(String).join(' '),
      });
      originalError.apply(console, args);
    };

    console.warn = (...args: unknown[]) => {
      logger.emit({
        severityNumber: SeverityNumber.WARN,
        severityText: 'WARN',
        body: args.map(String).join(' '),
      });
      originalWarn.apply(console, args);
    };
  }
}
