
/**
 * Client
**/

import * as runtime from './runtime';
declare const prisma: unique symbol
export type PrismaPromise<A> = Promise<A> & {[prisma]: true}
type UnwrapPromise<P extends any> = P extends Promise<infer R> ? R : P
type UnwrapTuple<Tuple extends readonly unknown[]> = {
  [K in keyof Tuple]: K extends `${number}` ? Tuple[K] extends PrismaPromise<infer X> ? X : UnwrapPromise<Tuple[K]> : UnwrapPromise<Tuple[K]>
};


/**
 * Model auction
 */

export type auction = {
  id: number
  buyoutPrice: number
  bidPrice: number
  startBidPrice: number
  sellerId: string
  sellerName: string
  isEnd: boolean
  isBuyout: boolean
  buyerId: string
  buyerName: string
  itemData: string
  metaName: string
  metaLevel: number
  endedAt: Date | null
  createdAt: Date
}

/**
 * Model auction_bid_logs
 */

export type auction_bid_logs = {
  id: bigint
  auctionId: number
  buyerId: string
  buyerName: string
  bidPrice: number
  isBuyout: boolean
}


/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js (ORM replacement)
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Auctions
 * const auctions = await prisma.auction.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<T['log']> : never : never,
  GlobalReject = 'rejectOnNotFound' extends keyof T
    ? T['rejectOnNotFound']
    : false
      > {
      /**
       * @private
       */
      private fetcher;
      /**
       * @private
       */
      private readonly dmmf;
      /**
       * @private
       */
      private connectionPromise?;
      /**
       * @private
       */
      private disconnectionPromise?;
      /**
       * @private
       */
      private readonly engineConfig;
      /**
       * @private
       */
      private readonly measurePerformance;

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js (ORM replacement)
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Auctions
   * const auctions = await prisma.auction.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<T, Prisma.PrismaClientOptions>);
  $on<V extends (U | 'beforeExit')>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : V extends 'beforeExit' ? () => Promise<void> : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<any>;

  /**
   * Add a middleware
   */
  $use(cb: Prisma.Middleware): void

  /**
   * Executes a raw query and returns the number of affected rows
   * @example
   * ```
   * // With parameters use prisma.executeRaw``, values will be escaped automatically
   * const result = await prisma.executeRaw`UPDATE User SET cool = ${true} WHERE id = ${1};`
   * // Or
   * const result = await prisma.executeRaw('UPDATE User SET cool = $1 WHERE id = $2 ;', true, 1)
  * ```
  * 
  * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
  */
  $executeRaw < T = any > (query: string | TemplateStringsArray | Prisma.Sql, ...values: any[]): PrismaPromise<number>;

  /**
   * Performs a raw query and returns the SELECT data
   * @example
   * ```
   * // With parameters use prisma.queryRaw``, values will be escaped automatically
   * const result = await prisma.queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'ema.il'};`
   * // Or
   * const result = await prisma.queryRaw('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'ema.il')
  * ```
  * 
  * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
  */
  $queryRaw < T = any > (query: string | TemplateStringsArray | Prisma.Sql, ...values: any[]): PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends PrismaPromise<any>[]>(arg: [...P]): Promise<UnwrapTuple<P>>

      /**
   * `prisma.auction`: Exposes CRUD operations for the **auction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Auctions
    * const auctions = await prisma.auction.findMany()
    * ```
    */
  get auction(): Prisma.auctionDelegate<GlobalReject>;

  /**
   * `prisma.auction_bid_logs`: Exposes CRUD operations for the **auction_bid_logs** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Auction_bid_logs
    * const auction_bid_logs = await prisma.auction_bid_logs.findMany()
    * ```
    */
  get auction_bid_logs(): Prisma.auction_bid_logsDelegate<GlobalReject>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  /**
   * Prisma Client JS version: 2.22.1
   * Query Engine version: 60cc71d884972ab4e897f0277c4b84383dddaf6c
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  export type JsonObject = {[Key in string]?: JsonValue}
 
  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}
 
  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | null | JsonObject | JsonArray

  /**
   * Same as JsonObject, but allows undefined
   */
  export type InputJsonObject = {[Key in string]?: JsonValue}
 
  export interface InputJsonArray extends Array<JsonValue> {}
 
  export type InputJsonValue = undefined |  string | number | boolean | null | InputJsonObject | InputJsonArray
   type SelectAndInclude = {
    select: any
    include: any
  }
  type HasSelect = {
    select: any
  }
  type HasInclude = {
    include: any
  }
  type CheckSelect<T, S, U> = T extends SelectAndInclude
    ? 'Please either choose `select` or `include`'
    : T extends HasSelect
    ? U
    : T extends HasInclude
    ? U
    : S

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = {
    [key in keyof T]: T[key] extends false | undefined | null ? never : key
  }[keyof T]

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> = (T | U) extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U;


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Buffer
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  export type Union = any

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Exact<A, W = unknown> = 
  W extends unknown ? A extends Narrowable ? Cast<A, W> : Cast<
  {[K in keyof A]: K extends keyof W ? Exact<A[K], W[K]> : never},
  {[K in keyof W]: K extends keyof A ? Exact<A[K], W[K]> : W[K]}>
  : never;

  type Narrowable = string | number | boolean | bigint;

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;

  export function validator<V>(): <S>(select: Exact<S, V>) => S;

  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, 'avg' | 'sum' | 'count' | 'min' | 'max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but with an array
   */
  type PickArray<T, K extends Array<keyof T>> = Prisma__Pick<T, TupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T

  class PrismaClientFetcher {
    private readonly prisma;
    private readonly debug;
    private readonly hooks?;
    constructor(prisma: PrismaClient<any, any>, debug?: boolean, hooks?: Hooks | undefined);
    request<T>(document: any, dataPath?: string[], rootField?: string, typeName?: string, isList?: boolean, callsite?: string): Promise<T>;
    sanitizeMessage(message: string): string;
    protected unpack(document: any, data: any, path: string[], rootField?: string, isList?: boolean): any;
  }

  export const ModelName: {
    auction: 'auction',
    auction_bid_logs: 'auction_bid_logs'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  export type RejectOnNotFound = boolean | ((error: Error) => Error)
  export type RejectPerModel = { [P in ModelName]?: RejectOnNotFound }
  export type RejectPerOperation =  { [P in "findUnique" | "findFirst"]?: RejectPerModel | RejectOnNotFound } 
  type IsReject<T> = T extends true ? True : T extends (err: Error) => Error ? True : False
  export type HasReject<
    GlobalRejectSettings extends Prisma.PrismaClientOptions['rejectOnNotFound'],
    LocalRejectSettings,
    Action extends PrismaAction,
    Model extends ModelName
  > = LocalRejectSettings extends RejectOnNotFound
    ? IsReject<LocalRejectSettings>
    : GlobalRejectSettings extends RejectPerOperation
    ? Action extends keyof GlobalRejectSettings
      ? GlobalRejectSettings[Action] extends boolean
        ? IsReject<GlobalRejectSettings[Action]>
        : GlobalRejectSettings[Action] extends RejectPerModel
        ? Model extends keyof GlobalRejectSettings[Action]
          ? IsReject<GlobalRejectSettings[Action][Model]>
          : False
        : False
      : False
    : IsReject<GlobalRejectSettings>
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

  export interface PrismaClientOptions {
    /**
     * Configure findUnique/findFirst to throw an error if the query returns null. 
     *  * @example
     * ```
     * // Reject on both findUnique/findFirst
     * rejectOnNotFound: true
     * // Reject only on findFirst with a custom error
     * rejectOnNotFound: { findFirst: (err) => new Error("Custom Error")}
     * // Reject on user.findUnique with a custom error
     * rejectOnNotFound: { findUnique: {User: (err) => new Error("User not found")}}
     * ```
     */
    rejectOnNotFound?: RejectOnNotFound | RejectPerOperation
    /**
     * Overwrites the datasource url from your prisma.schema file
     */
    datasources?: Datasources

    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat

    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: Array<LogLevel | LogDefinition>
  }

  export type Hooks = {
    beforeRequest?: (options: { query: string, path: string[], rootField?: string, typeName?: string, document: any }) => any
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findMany'
    | 'findFirst'
    | 'create'
    | 'createMany'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'

  /**
   * These options are being passed in to the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => Promise<T>,
  ) => Promise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined; 
  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model auction
   */


  export type AggregateAuction = {
    count: AuctionCountAggregateOutputType | null
    avg: AuctionAvgAggregateOutputType | null
    sum: AuctionSumAggregateOutputType | null
    min: AuctionMinAggregateOutputType | null
    max: AuctionMaxAggregateOutputType | null
  }

  export type AuctionAvgAggregateOutputType = {
    id: number | null
    buyoutPrice: number | null
    bidPrice: number | null
    startBidPrice: number | null
    metaLevel: number | null
  }

  export type AuctionSumAggregateOutputType = {
    id: number | null
    buyoutPrice: number | null
    bidPrice: number | null
    startBidPrice: number | null
    metaLevel: number | null
  }

  export type AuctionMinAggregateOutputType = {
    id: number | null
    buyoutPrice: number | null
    bidPrice: number | null
    startBidPrice: number | null
    sellerId: string | null
    sellerName: string | null
    isEnd: boolean | null
    isBuyout: boolean | null
    buyerId: string | null
    buyerName: string | null
    itemData: string | null
    metaName: string | null
    metaLevel: number | null
    endedAt: Date | null
    createdAt: Date | null
  }

  export type AuctionMaxAggregateOutputType = {
    id: number | null
    buyoutPrice: number | null
    bidPrice: number | null
    startBidPrice: number | null
    sellerId: string | null
    sellerName: string | null
    isEnd: boolean | null
    isBuyout: boolean | null
    buyerId: string | null
    buyerName: string | null
    itemData: string | null
    metaName: string | null
    metaLevel: number | null
    endedAt: Date | null
    createdAt: Date | null
  }

  export type AuctionCountAggregateOutputType = {
    id: number
    buyoutPrice: number
    bidPrice: number
    startBidPrice: number
    sellerId: number
    sellerName: number
    isEnd: number
    isBuyout: number
    buyerId: number
    buyerName: number
    itemData: number
    metaName: number
    metaLevel: number
    endedAt: number
    createdAt: number
    _all: number
  }


  export type AuctionAvgAggregateInputType = {
    id?: true
    buyoutPrice?: true
    bidPrice?: true
    startBidPrice?: true
    metaLevel?: true
  }

  export type AuctionSumAggregateInputType = {
    id?: true
    buyoutPrice?: true
    bidPrice?: true
    startBidPrice?: true
    metaLevel?: true
  }

  export type AuctionMinAggregateInputType = {
    id?: true
    buyoutPrice?: true
    bidPrice?: true
    startBidPrice?: true
    sellerId?: true
    sellerName?: true
    isEnd?: true
    isBuyout?: true
    buyerId?: true
    buyerName?: true
    itemData?: true
    metaName?: true
    metaLevel?: true
    endedAt?: true
    createdAt?: true
  }

  export type AuctionMaxAggregateInputType = {
    id?: true
    buyoutPrice?: true
    bidPrice?: true
    startBidPrice?: true
    sellerId?: true
    sellerName?: true
    isEnd?: true
    isBuyout?: true
    buyerId?: true
    buyerName?: true
    itemData?: true
    metaName?: true
    metaLevel?: true
    endedAt?: true
    createdAt?: true
  }

  export type AuctionCountAggregateInputType = {
    id?: true
    buyoutPrice?: true
    bidPrice?: true
    startBidPrice?: true
    sellerId?: true
    sellerName?: true
    isEnd?: true
    isBuyout?: true
    buyerId?: true
    buyerName?: true
    itemData?: true
    metaName?: true
    metaLevel?: true
    endedAt?: true
    createdAt?: true
    _all?: true
  }

  export type AuctionAggregateArgs = {
    /**
     * Filter which auction to aggregate.
    **/
    where?: auctionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of auctions to fetch.
    **/
    orderBy?: Enumerable<auctionOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
    **/
    cursor?: auctionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` auctions from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` auctions.
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned auctions
    **/
    count?: true | AuctionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    avg?: AuctionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    sum?: AuctionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    min?: AuctionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    max?: AuctionMaxAggregateInputType
  }

  export type GetAuctionAggregateType<T extends AuctionAggregateArgs> = {
    [P in keyof T & keyof AggregateAuction]: P extends 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuction[P]>
      : GetScalarType<T[P], AggregateAuction[P]>
  }


    
    
  export type AuctionGroupByArgs = {
    where?: auctionWhereInput
    orderBy?: Enumerable<auctionOrderByInput>
    by: Array<AuctionScalarFieldEnum>
    having?: auctionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    count?: AuctionCountAggregateInputType | true
    avg?: AuctionAvgAggregateInputType
    sum?: AuctionSumAggregateInputType
    min?: AuctionMinAggregateInputType
    max?: AuctionMaxAggregateInputType
  }


  export type AuctionGroupByOutputType = {
    id: number
    buyoutPrice: number
    bidPrice: number
    startBidPrice: number
    sellerId: string
    sellerName: string
    isEnd: boolean
    isBuyout: boolean
    buyerId: string
    buyerName: string
    itemData: string
    metaName: string
    metaLevel: number
    endedAt: Date | null
    createdAt: Date
    count: AuctionCountAggregateOutputType | null
    avg: AuctionAvgAggregateOutputType | null
    sum: AuctionSumAggregateOutputType | null
    min: AuctionMinAggregateOutputType | null
    max: AuctionMaxAggregateOutputType | null
  }

  type GetAuctionGroupByPayload<T extends AuctionGroupByArgs> = Promise<Array<
    PickArray<AuctionGroupByOutputType, T['by']> & {
      [P in ((keyof T) & (keyof AuctionGroupByOutputType))]: GetScalarType<T[P], AuctionGroupByOutputType[P]>
    }
  >>
    

  export type auctionSelect = {
    id?: boolean
    buyoutPrice?: boolean
    bidPrice?: boolean
    startBidPrice?: boolean
    sellerId?: boolean
    sellerName?: boolean
    isEnd?: boolean
    isBuyout?: boolean
    buyerId?: boolean
    buyerName?: boolean
    itemData?: boolean
    metaName?: boolean
    metaLevel?: boolean
    endedAt?: boolean
    createdAt?: boolean
  }

  export type auctionGetPayload<
    S extends boolean | null | undefined | auctionArgs,
    U = keyof S
      > = S extends true
        ? auction
    : S extends undefined
    ? never
    : S extends auctionArgs | auctionFindManyArgs
    ?'include' extends U
    ? auction 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof auction ?auction [P]
  : 
     never
  } 
    : auction
  : auction


  type auctionCountArgs = Merge<
    Omit<auctionFindManyArgs, 'select' | 'include'> & {
      select?: AuctionCountAggregateInputType | true
    }
  >

  export interface auctionDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Auction that matches the filter.
     * @param {auctionFindUniqueArgs} args - Arguments to find a Auction
     * @example
     * // Get one Auction
     * const auction = await prisma.auction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends auctionFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, auctionFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'auction'> extends True ? CheckSelect<T, Prisma__auctionClient<auction>, Prisma__auctionClient<auctionGetPayload<T>>> : CheckSelect<T, Prisma__auctionClient<auction | null >, Prisma__auctionClient<auctionGetPayload<T> | null >>

    /**
     * Find the first Auction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {auctionFindFirstArgs} args - Arguments to find a Auction
     * @example
     * // Get one Auction
     * const auction = await prisma.auction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends auctionFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, auctionFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'auction'> extends True ? CheckSelect<T, Prisma__auctionClient<auction>, Prisma__auctionClient<auctionGetPayload<T>>> : CheckSelect<T, Prisma__auctionClient<auction | null >, Prisma__auctionClient<auctionGetPayload<T> | null >>

    /**
     * Find zero or more Auctions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {auctionFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Auctions
     * const auctions = await prisma.auction.findMany()
     * 
     * // Get first 10 Auctions
     * const auctions = await prisma.auction.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const auctionWithIdOnly = await prisma.auction.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends auctionFindManyArgs>(
      args?: SelectSubset<T, auctionFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<auction>>, PrismaPromise<Array<auctionGetPayload<T>>>>

    /**
     * Create a Auction.
     * @param {auctionCreateArgs} args - Arguments to create a Auction.
     * @example
     * // Create one Auction
     * const Auction = await prisma.auction.create({
     *   data: {
     *     // ... data to create a Auction
     *   }
     * })
     * 
    **/
    create<T extends auctionCreateArgs>(
      args: SelectSubset<T, auctionCreateArgs>
    ): CheckSelect<T, Prisma__auctionClient<auction>, Prisma__auctionClient<auctionGetPayload<T>>>

    /**
     * Create many Auctions.
     *     @param {auctionCreateManyArgs} args - Arguments to create many Auctions.
     *     @example
     *     // Create many Auctions
     *     const auction = await prisma.auction.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends auctionCreateManyArgs>(
      args?: SelectSubset<T, auctionCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Auction.
     * @param {auctionDeleteArgs} args - Arguments to delete one Auction.
     * @example
     * // Delete one Auction
     * const Auction = await prisma.auction.delete({
     *   where: {
     *     // ... filter to delete one Auction
     *   }
     * })
     * 
    **/
    delete<T extends auctionDeleteArgs>(
      args: SelectSubset<T, auctionDeleteArgs>
    ): CheckSelect<T, Prisma__auctionClient<auction>, Prisma__auctionClient<auctionGetPayload<T>>>

    /**
     * Update one Auction.
     * @param {auctionUpdateArgs} args - Arguments to update one Auction.
     * @example
     * // Update one Auction
     * const auction = await prisma.auction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends auctionUpdateArgs>(
      args: SelectSubset<T, auctionUpdateArgs>
    ): CheckSelect<T, Prisma__auctionClient<auction>, Prisma__auctionClient<auctionGetPayload<T>>>

    /**
     * Delete zero or more Auctions.
     * @param {auctionDeleteManyArgs} args - Arguments to filter Auctions to delete.
     * @example
     * // Delete a few Auctions
     * const { count } = await prisma.auction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends auctionDeleteManyArgs>(
      args?: SelectSubset<T, auctionDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Auctions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {auctionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Auctions
     * const auction = await prisma.auction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends auctionUpdateManyArgs>(
      args: SelectSubset<T, auctionUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Auction.
     * @param {auctionUpsertArgs} args - Arguments to update or create a Auction.
     * @example
     * // Update or create a Auction
     * const auction = await prisma.auction.upsert({
     *   create: {
     *     // ... data to create a Auction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Auction we want to update
     *   }
     * })
    **/
    upsert<T extends auctionUpsertArgs>(
      args: SelectSubset<T, auctionUpsertArgs>
    ): CheckSelect<T, Prisma__auctionClient<auction>, Prisma__auctionClient<auctionGetPayload<T>>>

    /**
     * Count the number of Auctions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {auctionCountArgs} args - Arguments to filter Auctions to count.
     * @example
     * // Count the number of Auctions
     * const count = await prisma.auction.count({
     *   where: {
     *     // ... the filter for the Auctions we want to count
     *   }
     * })
    **/
    count<T extends auctionCountArgs>(
      args?: Subset<T, auctionCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuctionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Auction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuctionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AuctionAggregateArgs>(args: Subset<T, AuctionAggregateArgs>): PrismaPromise<GetAuctionAggregateType<T>>

    /**
     * Group by Auction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuctionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AuctionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuctionGroupByArgs['orderBy'] }
        : { orderBy?: AuctionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AuctionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuctionGroupByPayload<T> : Promise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for auction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in 
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__auctionClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';


    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * auction findUnique
   */
  export type auctionFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the auction
    **/
    select?: auctionSelect | null
    /**
     * Throw an Error if a auction can't be found
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which auction to fetch.
    **/
    where: auctionWhereUniqueInput
  }


  /**
   * auction findFirst
   */
  export type auctionFindFirstArgs = {
    /**
     * Select specific fields to fetch from the auction
    **/
    select?: auctionSelect | null
    /**
     * Throw an Error if a auction can't be found
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which auction to fetch.
    **/
    where?: auctionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of auctions to fetch.
    **/
    orderBy?: Enumerable<auctionOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for auctions.
    **/
    cursor?: auctionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` auctions from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` auctions.
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of auctions.
    **/
    distinct?: Enumerable<AuctionScalarFieldEnum>
  }


  /**
   * auction findMany
   */
  export type auctionFindManyArgs = {
    /**
     * Select specific fields to fetch from the auction
    **/
    select?: auctionSelect | null
    /**
     * Filter, which auctions to fetch.
    **/
    where?: auctionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of auctions to fetch.
    **/
    orderBy?: Enumerable<auctionOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing auctions.
    **/
    cursor?: auctionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` auctions from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` auctions.
    **/
    skip?: number
    distinct?: Enumerable<AuctionScalarFieldEnum>
  }


  /**
   * auction create
   */
  export type auctionCreateArgs = {
    /**
     * Select specific fields to fetch from the auction
    **/
    select?: auctionSelect | null
    /**
     * The data needed to create a auction.
    **/
    data: XOR<auctionCreateInput, auctionUncheckedCreateInput>
  }


  /**
   * auction createMany
   */
  export type auctionCreateManyArgs = {
    data: Enumerable<auctionCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * auction update
   */
  export type auctionUpdateArgs = {
    /**
     * Select specific fields to fetch from the auction
    **/
    select?: auctionSelect | null
    /**
     * The data needed to update a auction.
    **/
    data: XOR<auctionUpdateInput, auctionUncheckedUpdateInput>
    /**
     * Choose, which auction to update.
    **/
    where: auctionWhereUniqueInput
  }


  /**
   * auction updateMany
   */
  export type auctionUpdateManyArgs = {
    data: XOR<auctionUpdateManyMutationInput, auctionUncheckedUpdateManyInput>
    where?: auctionWhereInput
  }


  /**
   * auction upsert
   */
  export type auctionUpsertArgs = {
    /**
     * Select specific fields to fetch from the auction
    **/
    select?: auctionSelect | null
    /**
     * The filter to search for the auction to update in case it exists.
    **/
    where: auctionWhereUniqueInput
    /**
     * In case the auction found by the `where` argument doesn't exist, create a new auction with this data.
    **/
    create: XOR<auctionCreateInput, auctionUncheckedCreateInput>
    /**
     * In case the auction was found with the provided `where` argument, update it with this data.
    **/
    update: XOR<auctionUpdateInput, auctionUncheckedUpdateInput>
  }


  /**
   * auction delete
   */
  export type auctionDeleteArgs = {
    /**
     * Select specific fields to fetch from the auction
    **/
    select?: auctionSelect | null
    /**
     * Filter which auction to delete.
    **/
    where: auctionWhereUniqueInput
  }


  /**
   * auction deleteMany
   */
  export type auctionDeleteManyArgs = {
    where?: auctionWhereInput
  }


  /**
   * auction without action
   */
  export type auctionArgs = {
    /**
     * Select specific fields to fetch from the auction
    **/
    select?: auctionSelect | null
  }



  /**
   * Model auction_bid_logs
   */


  export type AggregateAuction_bid_logs = {
    count: Auction_bid_logsCountAggregateOutputType | null
    avg: Auction_bid_logsAvgAggregateOutputType | null
    sum: Auction_bid_logsSumAggregateOutputType | null
    min: Auction_bid_logsMinAggregateOutputType | null
    max: Auction_bid_logsMaxAggregateOutputType | null
  }

  export type Auction_bid_logsAvgAggregateOutputType = {
    id: number | null
    auctionId: number | null
    bidPrice: number | null
  }

  export type Auction_bid_logsSumAggregateOutputType = {
    id: bigint | null
    auctionId: number | null
    bidPrice: number | null
  }

  export type Auction_bid_logsMinAggregateOutputType = {
    id: bigint | null
    auctionId: number | null
    buyerId: string | null
    buyerName: string | null
    bidPrice: number | null
    isBuyout: boolean | null
  }

  export type Auction_bid_logsMaxAggregateOutputType = {
    id: bigint | null
    auctionId: number | null
    buyerId: string | null
    buyerName: string | null
    bidPrice: number | null
    isBuyout: boolean | null
  }

  export type Auction_bid_logsCountAggregateOutputType = {
    id: number
    auctionId: number
    buyerId: number
    buyerName: number
    bidPrice: number
    isBuyout: number
    _all: number
  }


  export type Auction_bid_logsAvgAggregateInputType = {
    id?: true
    auctionId?: true
    bidPrice?: true
  }

  export type Auction_bid_logsSumAggregateInputType = {
    id?: true
    auctionId?: true
    bidPrice?: true
  }

  export type Auction_bid_logsMinAggregateInputType = {
    id?: true
    auctionId?: true
    buyerId?: true
    buyerName?: true
    bidPrice?: true
    isBuyout?: true
  }

  export type Auction_bid_logsMaxAggregateInputType = {
    id?: true
    auctionId?: true
    buyerId?: true
    buyerName?: true
    bidPrice?: true
    isBuyout?: true
  }

  export type Auction_bid_logsCountAggregateInputType = {
    id?: true
    auctionId?: true
    buyerId?: true
    buyerName?: true
    bidPrice?: true
    isBuyout?: true
    _all?: true
  }

  export type Auction_bid_logsAggregateArgs = {
    /**
     * Filter which auction_bid_logs to aggregate.
    **/
    where?: auction_bid_logsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of auction_bid_logs to fetch.
    **/
    orderBy?: Enumerable<auction_bid_logsOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
    **/
    cursor?: auction_bid_logsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` auction_bid_logs from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` auction_bid_logs.
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned auction_bid_logs
    **/
    count?: true | Auction_bid_logsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    avg?: Auction_bid_logsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    sum?: Auction_bid_logsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    min?: Auction_bid_logsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    max?: Auction_bid_logsMaxAggregateInputType
  }

  export type GetAuction_bid_logsAggregateType<T extends Auction_bid_logsAggregateArgs> = {
    [P in keyof T & keyof AggregateAuction_bid_logs]: P extends 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuction_bid_logs[P]>
      : GetScalarType<T[P], AggregateAuction_bid_logs[P]>
  }


    
    
  export type Auction_bid_logsGroupByArgs = {
    where?: auction_bid_logsWhereInput
    orderBy?: Enumerable<auction_bid_logsOrderByInput>
    by: Array<Auction_bid_logsScalarFieldEnum>
    having?: auction_bid_logsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    count?: Auction_bid_logsCountAggregateInputType | true
    avg?: Auction_bid_logsAvgAggregateInputType
    sum?: Auction_bid_logsSumAggregateInputType
    min?: Auction_bid_logsMinAggregateInputType
    max?: Auction_bid_logsMaxAggregateInputType
  }


  export type Auction_bid_logsGroupByOutputType = {
    id: bigint
    auctionId: number
    buyerId: string
    buyerName: string
    bidPrice: number
    isBuyout: boolean
    count: Auction_bid_logsCountAggregateOutputType | null
    avg: Auction_bid_logsAvgAggregateOutputType | null
    sum: Auction_bid_logsSumAggregateOutputType | null
    min: Auction_bid_logsMinAggregateOutputType | null
    max: Auction_bid_logsMaxAggregateOutputType | null
  }

  type GetAuction_bid_logsGroupByPayload<T extends Auction_bid_logsGroupByArgs> = Promise<Array<
    PickArray<Auction_bid_logsGroupByOutputType, T['by']> & {
      [P in ((keyof T) & (keyof Auction_bid_logsGroupByOutputType))]: GetScalarType<T[P], Auction_bid_logsGroupByOutputType[P]>
    }
  >>
    

  export type auction_bid_logsSelect = {
    id?: boolean
    auctionId?: boolean
    buyerId?: boolean
    buyerName?: boolean
    bidPrice?: boolean
    isBuyout?: boolean
  }

  export type auction_bid_logsGetPayload<
    S extends boolean | null | undefined | auction_bid_logsArgs,
    U = keyof S
      > = S extends true
        ? auction_bid_logs
    : S extends undefined
    ? never
    : S extends auction_bid_logsArgs | auction_bid_logsFindManyArgs
    ?'include' extends U
    ? auction_bid_logs 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]: P extends keyof auction_bid_logs ?auction_bid_logs [P]
  : 
     never
  } 
    : auction_bid_logs
  : auction_bid_logs


  type auction_bid_logsCountArgs = Merge<
    Omit<auction_bid_logsFindManyArgs, 'select' | 'include'> & {
      select?: Auction_bid_logsCountAggregateInputType | true
    }
  >

  export interface auction_bid_logsDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Auction_bid_logs that matches the filter.
     * @param {auction_bid_logsFindUniqueArgs} args - Arguments to find a Auction_bid_logs
     * @example
     * // Get one Auction_bid_logs
     * const auction_bid_logs = await prisma.auction_bid_logs.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends auction_bid_logsFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, auction_bid_logsFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'auction_bid_logs'> extends True ? CheckSelect<T, Prisma__auction_bid_logsClient<auction_bid_logs>, Prisma__auction_bid_logsClient<auction_bid_logsGetPayload<T>>> : CheckSelect<T, Prisma__auction_bid_logsClient<auction_bid_logs | null >, Prisma__auction_bid_logsClient<auction_bid_logsGetPayload<T> | null >>

    /**
     * Find the first Auction_bid_logs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {auction_bid_logsFindFirstArgs} args - Arguments to find a Auction_bid_logs
     * @example
     * // Get one Auction_bid_logs
     * const auction_bid_logs = await prisma.auction_bid_logs.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends auction_bid_logsFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, auction_bid_logsFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'auction_bid_logs'> extends True ? CheckSelect<T, Prisma__auction_bid_logsClient<auction_bid_logs>, Prisma__auction_bid_logsClient<auction_bid_logsGetPayload<T>>> : CheckSelect<T, Prisma__auction_bid_logsClient<auction_bid_logs | null >, Prisma__auction_bid_logsClient<auction_bid_logsGetPayload<T> | null >>

    /**
     * Find zero or more Auction_bid_logs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {auction_bid_logsFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Auction_bid_logs
     * const auction_bid_logs = await prisma.auction_bid_logs.findMany()
     * 
     * // Get first 10 Auction_bid_logs
     * const auction_bid_logs = await prisma.auction_bid_logs.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const auction_bid_logsWithIdOnly = await prisma.auction_bid_logs.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends auction_bid_logsFindManyArgs>(
      args?: SelectSubset<T, auction_bid_logsFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<auction_bid_logs>>, PrismaPromise<Array<auction_bid_logsGetPayload<T>>>>

    /**
     * Create a Auction_bid_logs.
     * @param {auction_bid_logsCreateArgs} args - Arguments to create a Auction_bid_logs.
     * @example
     * // Create one Auction_bid_logs
     * const Auction_bid_logs = await prisma.auction_bid_logs.create({
     *   data: {
     *     // ... data to create a Auction_bid_logs
     *   }
     * })
     * 
    **/
    create<T extends auction_bid_logsCreateArgs>(
      args: SelectSubset<T, auction_bid_logsCreateArgs>
    ): CheckSelect<T, Prisma__auction_bid_logsClient<auction_bid_logs>, Prisma__auction_bid_logsClient<auction_bid_logsGetPayload<T>>>

    /**
     * Create many Auction_bid_logs.
     *     @param {auction_bid_logsCreateManyArgs} args - Arguments to create many Auction_bid_logs.
     *     @example
     *     // Create many Auction_bid_logs
     *     const auction_bid_logs = await prisma.auction_bid_logs.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends auction_bid_logsCreateManyArgs>(
      args?: SelectSubset<T, auction_bid_logsCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Auction_bid_logs.
     * @param {auction_bid_logsDeleteArgs} args - Arguments to delete one Auction_bid_logs.
     * @example
     * // Delete one Auction_bid_logs
     * const Auction_bid_logs = await prisma.auction_bid_logs.delete({
     *   where: {
     *     // ... filter to delete one Auction_bid_logs
     *   }
     * })
     * 
    **/
    delete<T extends auction_bid_logsDeleteArgs>(
      args: SelectSubset<T, auction_bid_logsDeleteArgs>
    ): CheckSelect<T, Prisma__auction_bid_logsClient<auction_bid_logs>, Prisma__auction_bid_logsClient<auction_bid_logsGetPayload<T>>>

    /**
     * Update one Auction_bid_logs.
     * @param {auction_bid_logsUpdateArgs} args - Arguments to update one Auction_bid_logs.
     * @example
     * // Update one Auction_bid_logs
     * const auction_bid_logs = await prisma.auction_bid_logs.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends auction_bid_logsUpdateArgs>(
      args: SelectSubset<T, auction_bid_logsUpdateArgs>
    ): CheckSelect<T, Prisma__auction_bid_logsClient<auction_bid_logs>, Prisma__auction_bid_logsClient<auction_bid_logsGetPayload<T>>>

    /**
     * Delete zero or more Auction_bid_logs.
     * @param {auction_bid_logsDeleteManyArgs} args - Arguments to filter Auction_bid_logs to delete.
     * @example
     * // Delete a few Auction_bid_logs
     * const { count } = await prisma.auction_bid_logs.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends auction_bid_logsDeleteManyArgs>(
      args?: SelectSubset<T, auction_bid_logsDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Auction_bid_logs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {auction_bid_logsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Auction_bid_logs
     * const auction_bid_logs = await prisma.auction_bid_logs.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends auction_bid_logsUpdateManyArgs>(
      args: SelectSubset<T, auction_bid_logsUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Auction_bid_logs.
     * @param {auction_bid_logsUpsertArgs} args - Arguments to update or create a Auction_bid_logs.
     * @example
     * // Update or create a Auction_bid_logs
     * const auction_bid_logs = await prisma.auction_bid_logs.upsert({
     *   create: {
     *     // ... data to create a Auction_bid_logs
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Auction_bid_logs we want to update
     *   }
     * })
    **/
    upsert<T extends auction_bid_logsUpsertArgs>(
      args: SelectSubset<T, auction_bid_logsUpsertArgs>
    ): CheckSelect<T, Prisma__auction_bid_logsClient<auction_bid_logs>, Prisma__auction_bid_logsClient<auction_bid_logsGetPayload<T>>>

    /**
     * Count the number of Auction_bid_logs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {auction_bid_logsCountArgs} args - Arguments to filter Auction_bid_logs to count.
     * @example
     * // Count the number of Auction_bid_logs
     * const count = await prisma.auction_bid_logs.count({
     *   where: {
     *     // ... the filter for the Auction_bid_logs we want to count
     *   }
     * })
    **/
    count<T extends auction_bid_logsCountArgs>(
      args?: Subset<T, auction_bid_logsCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Auction_bid_logsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Auction_bid_logs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Auction_bid_logsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Auction_bid_logsAggregateArgs>(args: Subset<T, Auction_bid_logsAggregateArgs>): PrismaPromise<GetAuction_bid_logsAggregateType<T>>

    /**
     * Group by Auction_bid_logs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Auction_bid_logsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends Auction_bid_logsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: Auction_bid_logsGroupByArgs['orderBy'] }
        : { orderBy?: Auction_bid_logsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, Auction_bid_logsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuction_bid_logsGroupByPayload<T> : Promise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for auction_bid_logs.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in 
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__auction_bid_logsClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';


    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * auction_bid_logs findUnique
   */
  export type auction_bid_logsFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the auction_bid_logs
    **/
    select?: auction_bid_logsSelect | null
    /**
     * Throw an Error if a auction_bid_logs can't be found
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which auction_bid_logs to fetch.
    **/
    where: auction_bid_logsWhereUniqueInput
  }


  /**
   * auction_bid_logs findFirst
   */
  export type auction_bid_logsFindFirstArgs = {
    /**
     * Select specific fields to fetch from the auction_bid_logs
    **/
    select?: auction_bid_logsSelect | null
    /**
     * Throw an Error if a auction_bid_logs can't be found
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which auction_bid_logs to fetch.
    **/
    where?: auction_bid_logsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of auction_bid_logs to fetch.
    **/
    orderBy?: Enumerable<auction_bid_logsOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for auction_bid_logs.
    **/
    cursor?: auction_bid_logsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` auction_bid_logs from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` auction_bid_logs.
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of auction_bid_logs.
    **/
    distinct?: Enumerable<Auction_bid_logsScalarFieldEnum>
  }


  /**
   * auction_bid_logs findMany
   */
  export type auction_bid_logsFindManyArgs = {
    /**
     * Select specific fields to fetch from the auction_bid_logs
    **/
    select?: auction_bid_logsSelect | null
    /**
     * Filter, which auction_bid_logs to fetch.
    **/
    where?: auction_bid_logsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of auction_bid_logs to fetch.
    **/
    orderBy?: Enumerable<auction_bid_logsOrderByInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing auction_bid_logs.
    **/
    cursor?: auction_bid_logsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` auction_bid_logs from the position of the cursor.
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` auction_bid_logs.
    **/
    skip?: number
    distinct?: Enumerable<Auction_bid_logsScalarFieldEnum>
  }


  /**
   * auction_bid_logs create
   */
  export type auction_bid_logsCreateArgs = {
    /**
     * Select specific fields to fetch from the auction_bid_logs
    **/
    select?: auction_bid_logsSelect | null
    /**
     * The data needed to create a auction_bid_logs.
    **/
    data: XOR<auction_bid_logsCreateInput, auction_bid_logsUncheckedCreateInput>
  }


  /**
   * auction_bid_logs createMany
   */
  export type auction_bid_logsCreateManyArgs = {
    data: Enumerable<auction_bid_logsCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * auction_bid_logs update
   */
  export type auction_bid_logsUpdateArgs = {
    /**
     * Select specific fields to fetch from the auction_bid_logs
    **/
    select?: auction_bid_logsSelect | null
    /**
     * The data needed to update a auction_bid_logs.
    **/
    data: XOR<auction_bid_logsUpdateInput, auction_bid_logsUncheckedUpdateInput>
    /**
     * Choose, which auction_bid_logs to update.
    **/
    where: auction_bid_logsWhereUniqueInput
  }


  /**
   * auction_bid_logs updateMany
   */
  export type auction_bid_logsUpdateManyArgs = {
    data: XOR<auction_bid_logsUpdateManyMutationInput, auction_bid_logsUncheckedUpdateManyInput>
    where?: auction_bid_logsWhereInput
  }


  /**
   * auction_bid_logs upsert
   */
  export type auction_bid_logsUpsertArgs = {
    /**
     * Select specific fields to fetch from the auction_bid_logs
    **/
    select?: auction_bid_logsSelect | null
    /**
     * The filter to search for the auction_bid_logs to update in case it exists.
    **/
    where: auction_bid_logsWhereUniqueInput
    /**
     * In case the auction_bid_logs found by the `where` argument doesn't exist, create a new auction_bid_logs with this data.
    **/
    create: XOR<auction_bid_logsCreateInput, auction_bid_logsUncheckedCreateInput>
    /**
     * In case the auction_bid_logs was found with the provided `where` argument, update it with this data.
    **/
    update: XOR<auction_bid_logsUpdateInput, auction_bid_logsUncheckedUpdateInput>
  }


  /**
   * auction_bid_logs delete
   */
  export type auction_bid_logsDeleteArgs = {
    /**
     * Select specific fields to fetch from the auction_bid_logs
    **/
    select?: auction_bid_logsSelect | null
    /**
     * Filter which auction_bid_logs to delete.
    **/
    where: auction_bid_logsWhereUniqueInput
  }


  /**
   * auction_bid_logs deleteMany
   */
  export type auction_bid_logsDeleteManyArgs = {
    where?: auction_bid_logsWhereInput
  }


  /**
   * auction_bid_logs without action
   */
  export type auction_bid_logsArgs = {
    /**
     * Select specific fields to fetch from the auction_bid_logs
    **/
    select?: auction_bid_logsSelect | null
  }



  /**
   * Enums
   */

  // Based on
  // https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

  export const AuctionScalarFieldEnum: {
    id: 'id',
    buyoutPrice: 'buyoutPrice',
    bidPrice: 'bidPrice',
    startBidPrice: 'startBidPrice',
    sellerId: 'sellerId',
    sellerName: 'sellerName',
    isEnd: 'isEnd',
    isBuyout: 'isBuyout',
    buyerId: 'buyerId',
    buyerName: 'buyerName',
    itemData: 'itemData',
    metaName: 'metaName',
    metaLevel: 'metaLevel',
    endedAt: 'endedAt',
    createdAt: 'createdAt'
  };

  export type AuctionScalarFieldEnum = (typeof AuctionScalarFieldEnum)[keyof typeof AuctionScalarFieldEnum]


  export const Auction_bid_logsScalarFieldEnum: {
    id: 'id',
    auctionId: 'auctionId',
    buyerId: 'buyerId',
    buyerName: 'buyerName',
    bidPrice: 'bidPrice',
    isBuyout: 'isBuyout'
  };

  export type Auction_bid_logsScalarFieldEnum = (typeof Auction_bid_logsScalarFieldEnum)[keyof typeof Auction_bid_logsScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  /**
   * Deep Input Types
   */


  export type auctionWhereInput = {
    AND?: Enumerable<auctionWhereInput>
    OR?: Enumerable<auctionWhereInput>
    NOT?: Enumerable<auctionWhereInput>
    id?: IntFilter | number
    buyoutPrice?: IntFilter | number
    bidPrice?: IntFilter | number
    startBidPrice?: IntFilter | number
    sellerId?: StringFilter | string
    sellerName?: StringFilter | string
    isEnd?: BoolFilter | boolean
    isBuyout?: BoolFilter | boolean
    buyerId?: StringFilter | string
    buyerName?: StringFilter | string
    itemData?: StringFilter | string
    metaName?: StringFilter | string
    metaLevel?: IntFilter | number
    endedAt?: DateTimeNullableFilter | Date | string | null
    createdAt?: DateTimeFilter | Date | string
  }

  export type auctionOrderByInput = {
    id?: SortOrder
    buyoutPrice?: SortOrder
    bidPrice?: SortOrder
    startBidPrice?: SortOrder
    sellerId?: SortOrder
    sellerName?: SortOrder
    isEnd?: SortOrder
    isBuyout?: SortOrder
    buyerId?: SortOrder
    buyerName?: SortOrder
    itemData?: SortOrder
    metaName?: SortOrder
    metaLevel?: SortOrder
    endedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type auctionWhereUniqueInput = {
    id?: number
  }

  export type auctionScalarWhereWithAggregatesInput = {
    AND?: Enumerable<auctionScalarWhereWithAggregatesInput>
    OR?: Enumerable<auctionScalarWhereWithAggregatesInput>
    NOT?: Enumerable<auctionScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    buyoutPrice?: IntWithAggregatesFilter | number
    bidPrice?: IntWithAggregatesFilter | number
    startBidPrice?: IntWithAggregatesFilter | number
    sellerId?: StringWithAggregatesFilter | string
    sellerName?: StringWithAggregatesFilter | string
    isEnd?: BoolWithAggregatesFilter | boolean
    isBuyout?: BoolWithAggregatesFilter | boolean
    buyerId?: StringWithAggregatesFilter | string
    buyerName?: StringWithAggregatesFilter | string
    itemData?: StringWithAggregatesFilter | string
    metaName?: StringWithAggregatesFilter | string
    metaLevel?: IntWithAggregatesFilter | number
    endedAt?: DateTimeNullableWithAggregatesFilter | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter | Date | string
  }

  export type auction_bid_logsWhereInput = {
    AND?: Enumerable<auction_bid_logsWhereInput>
    OR?: Enumerable<auction_bid_logsWhereInput>
    NOT?: Enumerable<auction_bid_logsWhereInput>
    id?: BigIntFilter | bigint | number
    auctionId?: IntFilter | number
    buyerId?: StringFilter | string
    buyerName?: StringFilter | string
    bidPrice?: IntFilter | number
    isBuyout?: BoolFilter | boolean
  }

  export type auction_bid_logsOrderByInput = {
    id?: SortOrder
    auctionId?: SortOrder
    buyerId?: SortOrder
    buyerName?: SortOrder
    bidPrice?: SortOrder
    isBuyout?: SortOrder
  }

  export type auction_bid_logsWhereUniqueInput = {
    id?: bigint | number
  }

  export type auction_bid_logsScalarWhereWithAggregatesInput = {
    AND?: Enumerable<auction_bid_logsScalarWhereWithAggregatesInput>
    OR?: Enumerable<auction_bid_logsScalarWhereWithAggregatesInput>
    NOT?: Enumerable<auction_bid_logsScalarWhereWithAggregatesInput>
    id?: BigIntWithAggregatesFilter | bigint | number
    auctionId?: IntWithAggregatesFilter | number
    buyerId?: StringWithAggregatesFilter | string
    buyerName?: StringWithAggregatesFilter | string
    bidPrice?: IntWithAggregatesFilter | number
    isBuyout?: BoolWithAggregatesFilter | boolean
  }

  export type auctionCreateInput = {
    buyoutPrice?: number
    bidPrice?: number
    startBidPrice?: number
    sellerId?: string
    sellerName?: string
    isEnd?: boolean
    isBuyout?: boolean
    buyerId?: string
    buyerName?: string
    itemData: string
    metaName?: string
    metaLevel?: number
    endedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type auctionUncheckedCreateInput = {
    id?: number
    buyoutPrice?: number
    bidPrice?: number
    startBidPrice?: number
    sellerId?: string
    sellerName?: string
    isEnd?: boolean
    isBuyout?: boolean
    buyerId?: string
    buyerName?: string
    itemData: string
    metaName?: string
    metaLevel?: number
    endedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type auctionUpdateInput = {
    buyoutPrice?: IntFieldUpdateOperationsInput | number
    bidPrice?: IntFieldUpdateOperationsInput | number
    startBidPrice?: IntFieldUpdateOperationsInput | number
    sellerId?: StringFieldUpdateOperationsInput | string
    sellerName?: StringFieldUpdateOperationsInput | string
    isEnd?: BoolFieldUpdateOperationsInput | boolean
    isBuyout?: BoolFieldUpdateOperationsInput | boolean
    buyerId?: StringFieldUpdateOperationsInput | string
    buyerName?: StringFieldUpdateOperationsInput | string
    itemData?: StringFieldUpdateOperationsInput | string
    metaName?: StringFieldUpdateOperationsInput | string
    metaLevel?: IntFieldUpdateOperationsInput | number
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type auctionUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    buyoutPrice?: IntFieldUpdateOperationsInput | number
    bidPrice?: IntFieldUpdateOperationsInput | number
    startBidPrice?: IntFieldUpdateOperationsInput | number
    sellerId?: StringFieldUpdateOperationsInput | string
    sellerName?: StringFieldUpdateOperationsInput | string
    isEnd?: BoolFieldUpdateOperationsInput | boolean
    isBuyout?: BoolFieldUpdateOperationsInput | boolean
    buyerId?: StringFieldUpdateOperationsInput | string
    buyerName?: StringFieldUpdateOperationsInput | string
    itemData?: StringFieldUpdateOperationsInput | string
    metaName?: StringFieldUpdateOperationsInput | string
    metaLevel?: IntFieldUpdateOperationsInput | number
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type auctionCreateManyInput = {
    id?: number
    buyoutPrice?: number
    bidPrice?: number
    startBidPrice?: number
    sellerId?: string
    sellerName?: string
    isEnd?: boolean
    isBuyout?: boolean
    buyerId?: string
    buyerName?: string
    itemData: string
    metaName?: string
    metaLevel?: number
    endedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type auctionUpdateManyMutationInput = {
    buyoutPrice?: IntFieldUpdateOperationsInput | number
    bidPrice?: IntFieldUpdateOperationsInput | number
    startBidPrice?: IntFieldUpdateOperationsInput | number
    sellerId?: StringFieldUpdateOperationsInput | string
    sellerName?: StringFieldUpdateOperationsInput | string
    isEnd?: BoolFieldUpdateOperationsInput | boolean
    isBuyout?: BoolFieldUpdateOperationsInput | boolean
    buyerId?: StringFieldUpdateOperationsInput | string
    buyerName?: StringFieldUpdateOperationsInput | string
    itemData?: StringFieldUpdateOperationsInput | string
    metaName?: StringFieldUpdateOperationsInput | string
    metaLevel?: IntFieldUpdateOperationsInput | number
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type auctionUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    buyoutPrice?: IntFieldUpdateOperationsInput | number
    bidPrice?: IntFieldUpdateOperationsInput | number
    startBidPrice?: IntFieldUpdateOperationsInput | number
    sellerId?: StringFieldUpdateOperationsInput | string
    sellerName?: StringFieldUpdateOperationsInput | string
    isEnd?: BoolFieldUpdateOperationsInput | boolean
    isBuyout?: BoolFieldUpdateOperationsInput | boolean
    buyerId?: StringFieldUpdateOperationsInput | string
    buyerName?: StringFieldUpdateOperationsInput | string
    itemData?: StringFieldUpdateOperationsInput | string
    metaName?: StringFieldUpdateOperationsInput | string
    metaLevel?: IntFieldUpdateOperationsInput | number
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type auction_bid_logsCreateInput = {
    id?: bigint | number
    auctionId: number
    buyerId?: string
    buyerName?: string
    bidPrice?: number
    isBuyout?: boolean
  }

  export type auction_bid_logsUncheckedCreateInput = {
    id?: bigint | number
    auctionId: number
    buyerId?: string
    buyerName?: string
    bidPrice?: number
    isBuyout?: boolean
  }

  export type auction_bid_logsUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    auctionId?: IntFieldUpdateOperationsInput | number
    buyerId?: StringFieldUpdateOperationsInput | string
    buyerName?: StringFieldUpdateOperationsInput | string
    bidPrice?: IntFieldUpdateOperationsInput | number
    isBuyout?: BoolFieldUpdateOperationsInput | boolean
  }

  export type auction_bid_logsUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    auctionId?: IntFieldUpdateOperationsInput | number
    buyerId?: StringFieldUpdateOperationsInput | string
    buyerName?: StringFieldUpdateOperationsInput | string
    bidPrice?: IntFieldUpdateOperationsInput | number
    isBuyout?: BoolFieldUpdateOperationsInput | boolean
  }

  export type auction_bid_logsCreateManyInput = {
    id?: bigint | number
    auctionId: number
    buyerId?: string
    buyerName?: string
    bidPrice?: number
    isBuyout?: boolean
  }

  export type auction_bid_logsUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    auctionId?: IntFieldUpdateOperationsInput | number
    buyerId?: StringFieldUpdateOperationsInput | string
    buyerName?: StringFieldUpdateOperationsInput | string
    bidPrice?: IntFieldUpdateOperationsInput | number
    isBuyout?: BoolFieldUpdateOperationsInput | boolean
  }

  export type auction_bid_logsUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    auctionId?: IntFieldUpdateOperationsInput | number
    buyerId?: StringFieldUpdateOperationsInput | string
    buyerName?: StringFieldUpdateOperationsInput | string
    bidPrice?: IntFieldUpdateOperationsInput | number
    isBuyout?: BoolFieldUpdateOperationsInput | boolean
  }

  export type IntFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type StringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringFilter | string
  }

  export type BoolFilter = {
    equals?: boolean
    not?: NestedBoolFilter | boolean
  }

  export type DateTimeNullableFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | null
    notIn?: Enumerable<Date> | Enumerable<string> | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableFilter | Date | string | null
  }

  export type DateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type IntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    count?: NestedIntFilter
    avg?: NestedFloatFilter
    sum?: NestedIntFilter
    min?: NestedIntFilter
    max?: NestedIntFilter
  }

  export type StringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringWithAggregatesFilter | string
    count?: NestedIntFilter
    min?: NestedStringFilter
    max?: NestedStringFilter
  }

  export type BoolWithAggregatesFilter = {
    equals?: boolean
    not?: NestedBoolWithAggregatesFilter | boolean
    count?: NestedIntFilter
    min?: NestedBoolFilter
    max?: NestedBoolFilter
  }

  export type DateTimeNullableWithAggregatesFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | null
    notIn?: Enumerable<Date> | Enumerable<string> | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableWithAggregatesFilter | Date | string | null
    count?: NestedIntNullableFilter
    min?: NestedDateTimeNullableFilter
    max?: NestedDateTimeNullableFilter
  }

  export type DateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    count?: NestedIntFilter
    min?: NestedDateTimeFilter
    max?: NestedDateTimeFilter
  }

  export type BigIntFilter = {
    equals?: bigint | number
    in?: Enumerable<bigint> | Enumerable<number>
    notIn?: Enumerable<bigint> | Enumerable<number>
    lt?: bigint | number
    lte?: bigint | number
    gt?: bigint | number
    gte?: bigint | number
    not?: NestedBigIntFilter | bigint | number
  }

  export type BigIntWithAggregatesFilter = {
    equals?: bigint | number
    in?: Enumerable<bigint> | Enumerable<number>
    notIn?: Enumerable<bigint> | Enumerable<number>
    lt?: bigint | number
    lte?: bigint | number
    gt?: bigint | number
    gte?: bigint | number
    not?: NestedBigIntWithAggregatesFilter | bigint | number
    count?: NestedIntFilter
    avg?: NestedFloatFilter
    sum?: NestedBigIntFilter
    min?: NestedBigIntFilter
    max?: NestedBigIntFilter
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type NestedIntFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type NestedStringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringFilter | string
  }

  export type NestedBoolFilter = {
    equals?: boolean
    not?: NestedBoolFilter | boolean
  }

  export type NestedDateTimeNullableFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | null
    notIn?: Enumerable<Date> | Enumerable<string> | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableFilter | Date | string | null
  }

  export type NestedDateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type NestedIntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    count?: NestedIntFilter
    avg?: NestedFloatFilter
    sum?: NestedIntFilter
    min?: NestedIntFilter
    max?: NestedIntFilter
  }

  export type NestedFloatFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatFilter | number
  }

  export type NestedStringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringWithAggregatesFilter | string
    count?: NestedIntFilter
    min?: NestedStringFilter
    max?: NestedStringFilter
  }

  export type NestedBoolWithAggregatesFilter = {
    equals?: boolean
    not?: NestedBoolWithAggregatesFilter | boolean
    count?: NestedIntFilter
    min?: NestedBoolFilter
    max?: NestedBoolFilter
  }

  export type NestedDateTimeNullableWithAggregatesFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | null
    notIn?: Enumerable<Date> | Enumerable<string> | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableWithAggregatesFilter | Date | string | null
    count?: NestedIntNullableFilter
    min?: NestedDateTimeNullableFilter
    max?: NestedDateTimeNullableFilter
  }

  export type NestedIntNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableFilter | number | null
  }

  export type NestedDateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    count?: NestedIntFilter
    min?: NestedDateTimeFilter
    max?: NestedDateTimeFilter
  }

  export type NestedBigIntFilter = {
    equals?: bigint | number
    in?: Enumerable<bigint> | Enumerable<number>
    notIn?: Enumerable<bigint> | Enumerable<number>
    lt?: bigint | number
    lte?: bigint | number
    gt?: bigint | number
    gte?: bigint | number
    not?: NestedBigIntFilter | bigint | number
  }

  export type NestedBigIntWithAggregatesFilter = {
    equals?: bigint | number
    in?: Enumerable<bigint> | Enumerable<number>
    notIn?: Enumerable<bigint> | Enumerable<number>
    lt?: bigint | number
    lte?: bigint | number
    gt?: bigint | number
    gte?: bigint | number
    not?: NestedBigIntWithAggregatesFilter | bigint | number
    count?: NestedIntFilter
    avg?: NestedFloatFilter
    sum?: NestedBigIntFilter
    min?: NestedBigIntFilter
    max?: NestedBigIntFilter
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.DMMF.Document;
}