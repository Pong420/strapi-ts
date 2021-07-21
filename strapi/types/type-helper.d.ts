// https://stackoverflow.com/a/53809800/9633867
type KeysOfType<T, U> = { [K in keyof T]: T[K] extends U ? K : never }[keyof T];
type RequiredKeys<T> = Exclude<
  KeysOfType<T, Exclude<T[keyof T], undefined>>,
  undefined
>;
type OptionalKeys<T> = Exclude<keyof T, RequiredKeys<T>>;

// https://medium.com/dailyjs/typescript-create-a-condition-based-subset-types-9d902cea5b8c
type FilterFlags<Base, Condition> = {
  [Key in keyof Base]: Base[Key] extends Condition ? Key : never;
};

type AllowedNames<Base, Condition> = FilterFlags<Base, Condition>[keyof Base];

type SubType<Base, Condition> = Pick<Base, AllowedNames<Base, Condition>>;

// type Relation<T> = string | T;

// type Populate<T> = T extends Relation<infer P>
//   ? Exclude<P, string> extends never
//     ? never
//     : P
//   : string;

// type FilterRelation<T> = {
//   [K in keyof T]: Exclude<T[K], string> extends never ? never : K;
// };

// type RelationKeys<T> = FilterRelation<T>[keyof T];
