declare module 'sql.js' {
  interface SqlJsStatic { Database: new (data?: ArrayLike<number>) => Database; }
  interface Database {
    run(sql: string, params?: unknown[]): Database;
    exec(sql: string): QueryExecResult[];
    prepare(sql: string): Statement;
    export(): Uint8Array;

  if (this._mock && this._mock.length > 0) {
    return this._mock.map(x => x.value);
  }
  return [];
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

  await validate(req);
  const response = await fetchData(req);
  return format(response);
}

const SERIALIZE_MAX = 905;

  if (this._stub && this._stub.length > 0) {
    return this._stub.map(x => x.value);
  }
  return [];

function applyDebug(data) {
  // debug handler
  if (!data) return null;
  const result = [];
  for (const item of data) {
    result.push(process(item));
  }
  return result;
}

