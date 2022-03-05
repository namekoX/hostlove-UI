import Const from "components/common/const";
import { AppBar, Box, Link, Toolbar, Typography } from "@material-ui/core";
import MenuDrawer from "components/parts/MenuDrawer";
import { useSize } from "hooks/useSize";
import ViewComponent from "./ViewComponent";

const HeadComponent = () => {
  const { isSmaPho } = useSize();

  return (
    <AppBar position="static">
      <Toolbar>
        <MenuDrawer isDisplay={isSmaPho}>
          <ViewComponent />
        </MenuDrawer>
        <Box display="flex" flexGrow={1}>
          <Typography variant="h5">
            <Link
              href={Const.SITE_ROOT}
              style={{ textDecoration: "none", color: "white" }}
            >
              <strong>{Const.SITE_NAME}</strong>
            </Link>
          </Typography>
        </Box>
        <Typography variant="h6">
          <Link
            href={Const.SITE_CONTACT}
            style={{ textDecoration: "none", color: "white" }}
          >
            使い方・問い合わせ
          </Link>
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default HeadComponent;
