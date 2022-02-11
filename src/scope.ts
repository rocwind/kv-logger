const scopeStack: Record<string, unknown>[] = [];

/**
 * current scope context
 * @returns
 */
export function getLogScope(): Record<string, unknown> {
    return scopeStack[scopeStack.length - 1];
}

/**
 * push a new scope to the stack
 * @param context
 */
export function pushLogScope(context: Record<string, unknown>): void {
    scopeStack.push(Object.assign({}, getLogScope(), context));
}

/**
 * pop the current scope context
 */
export function popLogScope() {
    if (scopeStack.length > 1) {
        scopeStack.pop();
    }
}

/**
 * execute callback with given scope context
 * @param context
 * @param callback
 */
export function withLogScope(
    context: Record<string, unknown>,
    callback: () => void
) {
    pushLogScope(context);
    try {
        callback();
    } finally {
        popLogScope();
    }
}
