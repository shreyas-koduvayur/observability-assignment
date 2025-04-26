//Creating the tracing.js with opentelemetry
const { resourceFromAttributes } = require('@opentelemetry/resources');
const { ATTR_SERVICE_NAME } = require('@opentelemetry/semantic-conventions');
const { NodeSDK } = require('@opentelemetry/sdk-node');

const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
const { ExpressInstrumentation } = require('opentelemetry-instrumentation-express');
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-http');
const { ConsoleMetricExporter, PeriodicExportingMetricReader } = require('@opentelemetry/sdk-metrics');
const { HttpInstrumentation } = require('@opentelemetry/instrumentation-http');

const { MongoDBInstrumentation } = require('@opentelemetry/instrumentation-mongodb');


const sdk = new NodeSDK({
  resource: resourceFromAttributes({
    [ATTR_SERVICE_NAME]: 'todo-service',
  }),
  metricReader: new PeriodicExportingMetricReader({
    
    exporter: new ConsoleMetricExporter(),
  }),
  instrumentations: [
    getNodeAutoInstrumentations(),
    new ExpressInstrumentation(),
    new MongoDBInstrumentation(),
    new HttpInstrumentation(),
  ],
});
//used to start the Telemetry
sdk.start();