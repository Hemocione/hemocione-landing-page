function getFromEnv(key: string, defaultValue?: string): string {
  const value = import.meta.env[key];

  if (!value && !defaultValue)
    throw new Error(`Environment variable ${key} is not set`);

  return value || defaultValue;
}

export const config = {
  hemocioneEventsApi: getFromEnv("HEMOCIONE_EVENTS_API"),
  hemocioneEvents: getFromEnv("HEMOCIONE_EVENTS"),
  hemocioneApp: getFromEnv("HEMOCIONE_APP"),
  hemocioneDonation: getFromEnv("HEMOCIONE_DONATION"),
  hemocioneStore: getFromEnv("HEMOCIONE_STORE"),
  hemocioneCompetitions: getFromEnv("HEMOCIONE_COMPETITIONS"),
  hemocioneCanDonate: getFromEnv(
    "HEMOCIONE_CAN_DONATE",
    "https://possodoar.hemocione.com.br"
  ),
} as const;
