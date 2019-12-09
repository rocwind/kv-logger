import { formatTime } from './format';

export enum LogLevel {
    Debug = 'debug',
    Info = 'info',
    Warn = 'warn',
    Error = 'error',
}

export enum LogFormat {
    Text = 'text',
    JSON = 'json',
}

export interface LogConfig {
    level: LogLevel;
    format: LogFormat;
}

const config: LogConfig = {
    level: LogLevel.Debug,
    format: LogFormat.Text,
};

export const setConfig = (options: Partial<LogConfig>) => {
    Object.assign(config, options);
};

export interface LogTransport {
    write: (text: string, level: LogLevel) => void;
    end: () => void;
}

export class ConsoleLogTransport implements LogTransport {
    write(text: string, level: LogLevel) {
        console[level](text);
    }
    end() {}
}

let transports: LogTransport[] = [new ConsoleLogTransport()];
export const setLogTransports = (entries: LogTransport[]) => {
    transports = entries;
};

const logPriorityByLevel: Record<LogLevel, number> = {
    [LogLevel.Debug]: 1,
    [LogLevel.Info]: 2,
    [LogLevel.Warn]: 3,
    [LogLevel.Error]: 4,
};

export type KVParams = Record<string, any>;

const formatLog = (
    level: LogLevel,
    msg: string | KVParams | Error,
    params?: KVParams,
    context?: KVParams
): string => {
    const log = Object.assign({}, context, params);
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
    log.time = formatTime(log.time);

    switch (config.format) {
        case LogFormat.JSON:
            return JSON.stringify(log);
        case LogFormat.Text:
        default:
            return Object.keys(log)
                .map(key => key + '=' + log[key])
                .join(', ');
    }
};

const createLogMethod = (level: LogLevel, context?: KVParams) => (
    msg: string | KVParams | Error,
    params?: KVParams
) => {
    if (logPriorityByLevel[level] < logPriorityByLevel[config.level]) {
        return;
    }
    transports.forEach(transport =>
        transport.write(formatLog(level, msg, params, context), level)
    );
};

const createLogger = (context?: KVParams) => {
    const logger = {
        bindContext: (subContext: KVParams) =>
            createLogger(Object.assign({}, context, subContext)),

        debug: createLogMethod(LogLevel.Debug, context),
        info: createLogMethod(LogLevel.Info, context),
        warn: createLogMethod(LogLevel.Warn, context),
        error: createLogMethod(LogLevel.Error, context),
    };
    return logger;
};

export const logger = createLogger();
