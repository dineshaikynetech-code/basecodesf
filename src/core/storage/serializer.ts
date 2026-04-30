import type { Serializer } from "./types";

export class JsonSerializer implements Serializer {
  serialize<T>(value: T): string {
    return JSON.stringify(value);
  }

  deserialize<T>(value: string): T | null {
    try {
      return JSON.parse(value) as T;
    } catch {
      return null;
    }
  }
}