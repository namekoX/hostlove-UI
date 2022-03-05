import Const from "components/common/const";
import { Grid } from "@material-ui/core";
import SearchComponent from "./SearchComponent";
import ViewComponent from "./ViewComponent";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFoundComponect from "./NotFoundComponect";
import ContactComponent from "./ContactComponent";
import { useSize } from "hooks/useSize";
import HeadComponent from "./HeadComponent";

const TopPageComponent = () => {
  const { isSmaPho, width } = useSize();

  const Main = (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <HeadComponent />
      </Grid>
      <Grid item xs={width > 1800 ? 2 : 3}>
        <ViewComponent />
      </Grid>
      <Grid item xs={width > 1800 ? 10 : 9}>
        <SearchComponent />
      </Grid>
    </Grid>
  );
  const SmaPho = (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <HeadComponent />
      </Grid>
      <Grid item xs={12}>
        <SearchComponent />
      </Grid>
    </Grid>
  );

  const Contact = (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <HeadComponent />
      </Grid>
      <Grid item xs={12}>
        <ContactComponent />
      </Grid>
    </Grid>
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route path={Const.SITE_ROOT} element={isSmaPho ? SmaPho : Main} />
        <Route
          path={Const.SITE_ROOT + ":pageId"}
          element={isSmaPho ? SmaPho : Main}
        />
        <Route path={Const.SITE_CONTACT} element={Contact} />
        <Route path="*" element={<NotFoundComponect />} />
      </Routes>
    </BrowserRouter>
  );
};

export default TopPageComponent;
