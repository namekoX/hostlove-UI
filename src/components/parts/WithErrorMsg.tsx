import { Typography } from "@material-ui/core";
import { ReactElement } from "react";

type Props = {
  status: 0 | 1;
  msg: string;
  children: ReactElement;
};

export const WithErrorMsg = (props: Props) => {
  const { status, msg, children } = props;

  const errorMsg = (
    <Typography variant="h5" color="error">
      {msg}
    </Typography>
  );

  return <>{status !== 0 ? errorMsg : children}</>;
};
