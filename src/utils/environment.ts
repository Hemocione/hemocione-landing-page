function getFromEnv(key: string, defaultValue?: string): string {
    const value = import.meta.env[key];

    if(!value && !defaultValue) throw new Error(`Environment variable ${key} is not set`);

    return value || defaultValue;
}

export const config = {
    hemocioneEventsApi: getFromEnv('HEMOCIONE_EVENTS_API'),
} as const;
