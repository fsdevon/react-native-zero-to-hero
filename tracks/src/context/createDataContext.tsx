import React, { Reducer, useReducer } from "react";
import { Action } from "../interfaces/tracking-interfaces";

export default (reducer: any, actions: any, defaultValue: any) => {
  const Context = React.createContext(defaultValue);
  const Provider = ({ children }: any) => {
    const [state, dispatch] = useReducer<Reducer<any, Action>>(
      reducer,
      defaultValue
    );

    const boundActions: any = {};
    for (let key in actions) {
      boundActions[key] = actions[key](dispatch);
    }

    return (
      <Context.Provider value={{ state, ...boundActions }}>
        {children}
      </Context.Provider>
    );
  };

  return { Context, Provider };
};
