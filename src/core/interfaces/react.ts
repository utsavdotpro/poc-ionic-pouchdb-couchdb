import * as React from 'react';

type DefaultComponentProps = {
  className?: string;
  children?: React.ReactNode;
};

export type Component<T = object> = React.FC<DefaultComponentProps & T>;

export type ComponentWithRef<
  T = object,
  X = object
> = React.ForwardRefRenderFunction<T, DefaultComponentProps & X>;
