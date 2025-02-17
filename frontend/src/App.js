import React from 'react'
import Cards from './component/Cards';
import CheckboxFilter from './component/CheckboxFilter';
import { Provider } from "react-redux";
import { store } from './redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <CheckboxFilter />
      <Cards />
    </Provider>
  )
}

export default App