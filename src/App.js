
import './App.css';
import React from "react";
import ReactDOM from "react-dom";
import PersistentDrawerLeft from "./components/Drawer"
import randomizeData from "./utils/randomizeData"
import {FontSizeContextProvider} from './utils/fontSizeContext'
import { DataContextProvider, useDataContext } from './utils/dataContext'
import { ZoomTypeContextProvider } from './utils/ZoomTypeContext'
// It returns an object with 2 values:
// { Provider, Consumer }

function App() {
  return (

    <div className="App">
      <DataContextProvider>
        <FontSizeContextProvider>
         < ZoomTypeContextProvider>
          <header className="App-header">
            <PersistentDrawerLeft />
          </header>
          </ZoomTypeContextProvider>
        </FontSizeContextProvider>
      </DataContextProvider>

    </div>

  );
}

export default App;
