const isObject = (value: unknown): value is Record<string, any> => {
  if (typeof value === "object" && value !== null && !Array.isArray(value)) {
    return true;
  }
  return false;
};

const toStringValue = (value: unknown, fallback = "") => {
  if (typeof value === "string" || typeof value === "number") {
    return String(value);
  }
  return fallback;
};

export { isObject, toStringValue };
