import "./App.css";

import { Provider } from "react-redux";

import { store } from "./redux/rootReducer";
import AppRouter from "./router/routes";

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
}

export default App;
