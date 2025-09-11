import type { SerializedSchema } from "./types";

export abstract class Schema<T = unknown> {
  abstract readonly __type: T;
  abstract serialize(): SerializedSchema;
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export class ObjectSchema<T extends Record<string, any>> extends Schema<T> {
  readonly __type!: T;

  constructor(private properties: { [K in keyof T]: Schema<T[K]> }) {
    super();
  }

  serialize(): SerializedSchema {
    const serializedProps: Record<string, SerializedSchema> = {};
    const required: string[] = [];

    for (const [key, schema] of Object.entries(this.properties)) {
      serializedProps[key] = schema.serialize();
      required.push(key);
    }

    return {
      type: "object",
      properties: serializedProps,
      required,
    };
  }
}

export class StringSchema extends Schema<string> {
  readonly __type!: string;

  serialize(): SerializedSchema {
    return { type: "string" };
  }
}

export class NumberSchema extends Schema<number> {
  readonly __type!: number;

  serialize(): SerializedSchema {
    return { type: "number" };
  }
}

export class BooleanSchema extends Schema<boolean> {
  readonly __type!: boolean;

  serialize(): SerializedSchema {
    return { type: "boolean" };
  }
}

export class ArraySchema<T> extends Schema<T[]> {
  readonly __type!: T[];

  constructor(private items: Schema<T>) {
    super();
  }

  serialize(): SerializedSchema {
    return {
      type: "array",
      items: this.items.serialize(),
    };
  }
}

export class NullableSchema<T> extends Schema<T | null> {
  readonly __type!: T | null;

  constructor(private inner: Schema<T>) {
    super();
  }

  serialize(): SerializedSchema {
    return {
      ...this.inner.serialize(),
      nullable: true,
    };
  }
}

export const t = {
  string: () => new StringSchema(),
  number: () => new NumberSchema(),
  boolean: () => new BooleanSchema(),
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  object: <P extends Record<string, Schema<any>>>(properties: P) => {
    type Result = { [K in keyof P]: P[K] extends Schema<infer U> ? U : never };
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    return new ObjectSchema<Result>(properties as any);
  },
  array: <T>(items: Schema<T>) => new ArraySchema(items),
  nullable: <T>(schema: Schema<T>) => new NullableSchema(schema),
};
