import { getLogScope } from './scope';
import { ConsoleLogTransport } from './transports';
import { LogLevel, LogTransport, Log, LogMessage } from './types';

/**
 * default transport is console + text format
 */
let transports: LogTransport[] = [new ConsoleLogTransport('text')];

/**
 * configure log transports
 * @param entries
 */
export function setLogTransports(entries: LogTransport[] | LogTransport): void {
    if (Array.isArray(entries)) {
        transports = entries.slice();
    } else {
        transports = [entries];
    }
}

function composeLog(
    level: LogLevel,
    msg: LogMessage,
    params?: Record<string, unknown>,
    context?: Record<string, any>
): Log {
    // generate the log object keys with { level, time, msg, ... }
    const log: Log = Object.assign(
        { level, time: 0, msg: '' },
        getLogScope(),
        context,
        params
    );
    if (typeof msg === 'string') {
        log.msg = msg;
    } else if (msg instanceof Error) {
        log.msg = msg.message;
        log.name = msg.name;
        log.stack = msg.stack;
    } else {
        Object.assign(log, msg);
    }

    log.level = level;
    log.time = log.time || Date.now();

    return log;
}

class Logger {
    constructor(private context?: Record<string, unknown>) {}

    /**
     * create a child logger with context
     * @param context
     * @returns
     */
    bindContext(context: Record<string, unknown>) {
        return new Logger(Object.assign({}, this.context, context));
    }

    /**
     * write log
     * @param level
     * @param msg
     * @param params
     */
    log(level: LogLevel, msg: LogMessage, params?: Record<string, unknown>) {
        const log = composeLog(level, msg, params, this.context);
        transports.forEach((transport) => transport.write(log));
    }

    /**
     * write debug log
     * @param msg
     * @param params
     */
    debug(msg: LogMessage, params?: Record<string, unknown>) {
        this.log('debug', msg, params);
    }

    /**
     * write info log
     * @param msg
     * @param params
     */
    info(msg: LogMessage, params?: Record<string, unknown>) {
        this.log('info', msg, params);
    }

    /**
     * write warn log
     * @param msg
     * @param params
     */
    warn(msg: LogMessage, params?: Record<string, unknown>) {
        this.log('warn', msg, params);
    }

    /**
     * write error log
     * @param msg
     * @param params
     */
    error(msg: LogMessage, params?: Record<string, unknown>) {
        this.log('error', msg, params);
    }
}

/**
 * create a logger instance
 * @param context the context of the logger
 * @returns
 */
export function createLogger(context?: Record<string, unknown>) {
    return new Logger(context);
}

/**
 * default logger instance
 */
export const logger = createLogger();
