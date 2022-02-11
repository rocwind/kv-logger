import { Log, LogTransport, LogLevel } from './types';
import { formatTime } from './format';

const logPriorityByLevel: Record<LogLevel, number> = {
    debug: 1,
    info: 2,
    warn: 3,
    error: 4,
};

/**
 * Filter helper class for filter logs by level
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
 * create a log transport with log level filter
 * e.g. withLogLevel('info')(new ConsoleTransport('text'))
 * @param level
 * @returns
 */
export function withLogLevel(
    level: LogLevel
): (transport: LogTransport) => LogTransport {
    return (transport: LogTransport) => new LogLevelFilter(transport, level);
}

/**
 * Default console log transport, output logs directly to console
 */
export class ConsoleLogTransport implements LogTransport {
    constructor(private format: 'text' | 'json') {}

    write(log: Log) {
        // format time to readable string for log
        const data = Object.assign({}, log, { time: formatTime(log.time) });
        let text: string;
        switch (this.format) {
            case 'json':
                text = JSON.stringify(data);
                break;
            case 'text':
            default:
                text = Object.keys(data)
                    .map((key) => key + '=' + data[key])
                    .join(', ');
                break;
        }

        console[log.level](text);
    }
}
