export type StripArray<T> = T extends (infer U)[] ? U : T;
