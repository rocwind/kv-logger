/**
 * Supported log levels
 */
export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

/**
 * Log object that transports need to handle for writing logs
 */
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
    [key: string]: unknown;
}

export type LogMessage = string | Omit<Log, 'level' | 'time'> | Error;

/**
 * Interface that handles transport logs, can be extend to customized log output
 */
export interface LogTransport {
    write: (log: Log) => void;
}
