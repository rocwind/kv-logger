# kv-logger

---

a tiny logger that supports log with k-v params.

## Install

`npm install --save kv-logger`

## Usage Example

```
// es module
import { logger } from 'kv-logger';
// or common module
const { logger } = require('kv-logger');

logger.info('info message');
logger.warn('warning message', {
    user_id: 123,
});

const loggerWithContext = logger.bindContext({ match_id: 12345 });
loggerWithContext.error('error message with context');
```

check out more examples at: [example.js](example/example.js)
