/// <reference types="vite/client" />
/* eslint-disable */
declare module "*.vue" {
  import { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module "*.js" {
  const evn: Record<string, string>;
  export default evn;
}

/** 将对象变为可索引对象 */
type ToIndexable<T> = T & Record<string | number, T[keyof T]>;

type Mutable<T> = { -readonly [P in keyof T]: T[P] };
