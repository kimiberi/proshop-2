import React from "react";
import Cards from "./component/Cards";
import CheckboxFilter from "./component/CheckboxFilter";
import Stack from "@mui/material/Stack";
import { Provider } from "react-redux";
import { store } from "./redux/store";

const App = () => {
  return (
    <Provider store={store}>
      <Stack direction="row" spacing={2}>
        <CheckboxFilter />
        <Cards />
      </Stack>
    </Provider>
  );
};

export default App;
