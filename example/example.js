const {
    logger,
    setLogTransports,
    ConsoleLogTransport,
    withLogLevelFilter,
    withLogScope,
} = require('../lib/bundle.js');

// config transport to console+ text format, filter log level by info and above
setLogTransports([withLogLevelFilter('info')(new ConsoleLogTransport('text'))]);

// plain text
logger.debug("you won't see this debug log as current level is info");
logger.warn('and this one is visible');

// k-v by object
logger.error({
    user_id: 12345,
    match_id: 12315,
    msg: 'connection lost.',
});

// msg + k-v object
logger.info('reconnecting...', {
    user_id: 12345,
    match_id: 12315,
});

// ooops, there is no msg key in object
logger.info({
    text: 'forgot the msg key',
});

// the error object
logger.error(new Error('this is an error'));

// now let's bind k-v context to a logger
const loggerWithContext = logger.bindContext({
    match_id: 12425,
    user_id: 12315,
});
loggerWithContext.info('log with context');

// 2nd level of context binding
const loggerWithSubContext = loggerWithContext.bindContext({ worker_id: 'a' });
loggerWithSubContext.info('log with sub context');

// config to json output and no log level filter
setLogTransports([new ConsoleLogTransport('json')]);

logger.debug('debug message is visible now');

logger.info({
    msg: 'info log with k-v in json',
    user_id: 12451,
});

// config scope context for log
withLogScope(
    {
        scope: 1,
    },
    () => {
        logger.info('log in scope');

        withLogScope({ scope: '1-1' }, () => {
            logger.info('log in inner scope');
        });

        logger.info('log 2 in scope');
    }
);
