declare module "cookie" {
  export function parse(
    str: string,
    options?: object
  ): { [key: string]: string };
  export function serialize(
    name: string,
    val: string,
    options?: object
  ): string;
}
