/**
 * @file Type declaration for pinia.
 */

/* eslint-disable */
import 'pinia'

declare module 'pinia' {
  export type PiniaActionAdaptor<Type extends Record<string, (...args: any) => any>, StoreType extends Store> = {
    [Key in keyof Type]: (this: StoreType, ...p: Parameters<Type[Key]>) => ReturnType<Type[Key]>
  }

  export type PiniaGetterAdaptor<GettersType, StoreType extends Store> = {
    [Key in keyof GettersType]: (this: StoreType, state: StoreType['$state']) => GettersType[Key]
  }

  export type PiniaStateTree = StateTree
  export type PiniaGetterTree = Record<string, (...args: any) => any>
  export type PiniaActionTree = Record<string, (...args: any) => any>

  export type PickState<TStore extends Store> = TStore extends Store<
    string,
    infer TState,
    PiniaGetterTree,
    PiniaActionTree
  >
    ? TState
    : PiniaStateTree

  export type PickActions<TStore extends Store> = TStore extends Store<
    string,
    PiniaStateTree,
    PiniaGetterTree,
    infer TActions
  >
    ? TActions
    : never

  export type PickGetters<TStore extends Store> = TStore extends Store<
    string,
    PiniaStateTree,
    infer TGetters,
    PiniaActionTree
  >
    ? TGetters
    : never

  export type CompatiblePiniaState<TState> = () => TState

  export type CompatiblePiniaGetter<TGetter extends (...args: any) => any, TStore extends Store> = (
    this: TStore,
    state: PickState<TStore>
  ) => ReturnType<TGetter>

  export type CompatiblePiniaGetters<TGetters extends PiniaGetterTree, TStore extends Store> = {
    [Key in keyof TGetters]: CompatiblePiniaGetter<TGetters[Key], CompatibleStore<TStore>>
  }

  export type CompatiblePiniaAction<TAction extends (...args: any) => any, TStore extends Store> = (
    this: TStore,
    ...args: Parameters<TAction>
  ) => ReturnType<TAction>

  export type CompatiblePiniaActions<TActions extends PiniaActionTree, TStore extends Store> = {
    [Key in keyof TActions]: CompatiblePiniaAction<TActions[Key], CompatibleStore<TStore>>
  }

  export type CompatibleStore<TStore extends Store> = TStore extends Store<
    string,
    infer TState,
    infer TGetters,
    infer TActions
  >
    ? Store<string, TState, TGetters, TActions>
    : never

  export type PiniaState<TStore extends Store> = CompatiblePiniaState<PickState<TStore>>
  export type PiniaGetters<TStore extends Store> = CompatiblePiniaGetters<PickGetters<TStore>, TStore>
  export type PiniaActions<TStore extends Store> = CompatiblePiniaActions<PickActions<TStore>, TStore>
  export type PiniaStore<TStore extends Store> = {
    state: PiniaState<TStore>
    getters: PiniaGetters<TStore>
    actions: PiniaActions<TStore>
  }
}
