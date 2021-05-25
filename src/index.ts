import { formatTime } from './format';
export { formatTime } from './format';

/**
 * Log levels
 */
export enum LogLevel {
    Debug = 'debug',
    Info = 'info',
    Warn = 'warn',
    Error = 'error',
}

export interface Log {
    /**
     * log level
     */
    level: LogLevel;
    /**
     * log message
     */
    msg: string;
    /**
     * log timestamp (milliseconds)
     */
    time: number;
    /**
     * additional params
     */
    [key: string]: any;
}

/**
 * Interface that handles transport logs, can be extend to customized log output
 */
export interface LogTransport {
    write: (log: Log) => void;
}

const logPriorityByLevel: Record<LogLevel, number> = {
    [LogLevel.Debug]: 1,
    [LogLevel.Info]: 2,
    [LogLevel.Warn]: 3,
    [LogLevel.Error]: 4,
};

/**
 * Filter helper for filter logs by level
 */
export class LogLevelFilter implements LogTransport {
    constructor(private transport: LogTransport, private level: LogLevel) {}
    write(log: Log) {
        const { level } = log;
        if (logPriorityByLevel[level] < logPriorityByLevel[this.level]) {
            return;
        }
        this.transport.write(log);
    }
}

/**
 * Formats that ConsoleTransport supports
 */
export enum ConsoleFormat {
    Text = 'text',
    JSON = 'json',
}

/**
 * Default console log transport, output logs directly to console
 */
export class ConsoleTransport implements LogTransport {
    constructor(private format: ConsoleFormat) {}
    write(log: Log) {
        // format time to readable string for log
        const data = Object.assign({}, log, { time: formatTime(log.time) });
        let text: string;
        switch (this.format) {
            case ConsoleFormat.JSON:
                text = JSON.stringify(data);
                break;
            case ConsoleFormat.Text:
            default:
                text = Object.keys(data)
                    .map((key) => key + '=' + log[key])
                    .join(', ');
                break;
        }

        console[log.level](text);
    }
}

/**
 * default transport is console + text format
 */
let transports: LogTransport[] = [new ConsoleTransport(ConsoleFormat.Text)];

/**
 * Config log transports
 * @param entries
 */
export const setLogTransports = (entries: LogTransport[]) => {
    transports = entries.slice();
};

const composeLog = (
    level: LogLevel,
    msg: string | Record<string, any> | Error,
    params?: Record<string, any>,
    context?: Record<string, any>
): Log => {
    // generate the log object keys with { level, time, msg, ... }
    const log: Log = Object.assign(
        { level, time: 0, msg: '' },
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
};

const logMethod = (
    level: LogLevel,
    msg: string | Record<string, any> | Error,
    params?: Record<string, any>,
    context?: Record<string, any>
) => {
    const log = composeLog(level, msg, params, context);
    transports.forEach((transport) => transport.write(log));
};

const bindLogMethod =
    (level: LogLevel, context?: Record<string, any>) =>
    (msg: string | Record<string, any> | Error, params?: Record<string, any>) =>
        logMethod(level, msg, params, context);

const createLogger = (context?: Record<string, any>) => {
    const logger = {
        bindContext: (subContext: Record<string, any>) =>
            createLogger(Object.assign({}, context, subContext)),

        log: (
            level: LogLevel,
            msg: string | Record<string, any> | Error,
            params?: Record<string, any>
        ) => logMethod(level, msg, params, context),

        debug: bindLogMethod(LogLevel.Debug, context),
        info: bindLogMethod(LogLevel.Info, context),
        warn: bindLogMethod(LogLevel.Warn, context),
        error: bindLogMethod(LogLevel.Error, context),
    };
    return logger;
};

export const logger = createLogger();
export default logger;
