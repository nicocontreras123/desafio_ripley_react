import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Menu from './views/menu'
import Saldo from './views/consultaSaldo'
import Transferencia from './views/transferenciaBancaria'
import Indicadores from './views/indicadoresEconomicos'

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <Menu />
          </Route>
          <Route exact path="/consulta_saldo">
            <Saldo />
          </Route>
          <Route exact path="/transferencia_bancaria">
            <Transferencia />
          </Route>
          <Route exact path="/indicadores_economicos">
            <Indicadores />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
