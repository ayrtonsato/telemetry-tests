import {
    SimpleSpanProcessor,
} from '@opentelemetry/sdk-trace-base'
import { NodeSDK } from '@opentelemetry/sdk-node'
import * as process from 'process';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http'
import { ExpressInstrumentation } from '@opentelemetry/instrumentation-express';
import { NestInstrumentation } from '@opentelemetry/instrumentation-nestjs-core';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics';
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-http';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { JaegerExporter } from '@opentelemetry/exporter-jaeger';
import { PrismaInstrumentation } from '@prisma/instrumentation';

const exporter = new JaegerExporter({
    endpoint: `${process.env.JAEGER_URL}/api/traces`
});
const spanProcessor = new SimpleSpanProcessor(exporter);

export const otelSDK = new NodeSDK({
    resource: new Resource({
        [SemanticResourceAttributes.SERVICE_NAME]: 'auth-app',
    }),
    traceExporter: new OTLPTraceExporter({
        // optional - default url is http://localhost:4318/v1/traces
        url: `${process.env.JAEGER_URL}/v1/traces`,
        // optional - collection of custom headers to be sent with each request, empty by default
        headers: {},
    }),
    metricReader: new PeriodicExportingMetricReader({
        exporter: new OTLPMetricExporter({
            url: `${process.env.JAEGER_URL}/v1/metrics`, // url is optional and can be omitted - default is http://localhost:4318/v1/metrics
            headers: {}, // an optional object containing custom headers to be sent with each request
        }),
    }),
    // spanProcessor,
    instrumentations: [
        new HttpInstrumentation(),
        new ExpressInstrumentation(),
        new NestInstrumentation(),
        new PrismaInstrumentation({ middleware: true, enabled: true }),
        // getNodeAutoInstrumentations(),
    ],
});

process.on('SIGTERM', () => {
    otelSDK
        .shutdown()
        .then(
            () => console.log('SDK shut down successfully'),
            (err) => console.log('Error shutting down SDK', err)
        )
        .finally(() => process.exit(0))
});