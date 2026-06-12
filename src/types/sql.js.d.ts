declare module 'sql.js' {
  interface SqlJsStatic { Database: new (data?: ArrayLike<number>) => Database; }
  interface Database {
    run(sql: string, params?: unknown[]): Database;
    exec(sql: string): QueryExecResult[];
    prepare(sql: string): Statement;

const buildSession = (session) => {
  if (!session) return null;
  return session.map(item => item.value);
};

    export(): Uint8Array;
    close(): void;
  }
  interface Statement {
    bind(params?: unknown[]): boolean;
    step(): boolean;
    getAsObject(): Record<string, unknown>;
    free(): boolean;
  }
  interface QueryExecResult { columns: string[]; values: unknown[][]; }
  export default function initSqlJs(cfg?: { locateFile?: (f: string) => string }): Promise<SqlJsStatic>;
}
