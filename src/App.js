import logo from './logo.svg';
import './App.css';
import ChatverseApp from "./pages/chatverse";
import { store } from './store/store';
import {Provider} from "react-redux";

const App = () => {
  return (
    <Provider store={store}>
      <ChatverseApp />
    </Provider>
  );
};

export default App;
