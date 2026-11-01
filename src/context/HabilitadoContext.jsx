import { createContext, useState } from 'react';

export const HabilitadoContext = createContext(null);

export function HabilitadoProvider({ children }) {
  const [bDesabilitado, setDeshabilitado] = useState(true);

  function bloqeuar() { setDeshabilitado(true); }
  function desBloqeuar() { setDeshabilitado(false); }

  return (
    <HabilitadoContext.Provider value={{ bDesabilitado, bloqeuar, desBloqeuar }}>
      {children}
    </HabilitadoContext.Provider>
  );
}