import EventEmitter from 'events'
import { Error, QuerySelector, RootQuerySelector } from 'mongoose'

type createMappingCallback = ((err: Error) => void) | ((err: Error, mapping: Record<any, any>) => void)

type ApplyBasicQueryCasting<T> = T | T[]
type Condition<T> = ApplyBasicQueryCasting<T> | QuerySelector<ApplyBasicQueryCasting<T>>

type _FilterQuery<T> = {
  [P in keyof T]?: Condition<T[P]>
} & RootQuerySelector<T>

export type FilterQuery<T> = _FilterQuery<T>
declare module 'mongoose' {
  interface Model<T extends Document> extends EventEmitter {
    paginate(
      query?: FilterQuery<T>,
      options?: PaginateOptions,
      callback?: (err: any, result: PaginateResult<T>) => void,
    ): Promise<PaginateResult<T>>
  }
  interface Document<T = any> {
    id?: number

    on: (name: string, cb?: (err?: Error, res?: any) => void) => void
    unIndex: (cb: (err?: Error) => void) => void
  }
}
