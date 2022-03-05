import "./App.scss";
import TopPageComponent from "components/pages/TopPageComponent";
import { Grid } from "@material-ui/core";

const App = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TopPageComponent />
      </Grid>
    </Grid>
  );
};

export default App;
