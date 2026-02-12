/**
 * Next.js instrumentation hook — runs once when the server starts.
 *
 * Configures OpenTelemetry with OTLP exporter for Grafana Cloud.
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

    const sdk = new NodeSDK({
      traceExporter: new OTLPTraceExporter(),
    });

    sdk.start();
  }
}
