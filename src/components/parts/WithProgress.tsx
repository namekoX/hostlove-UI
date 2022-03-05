import { Box, LinearProgress, Typography } from "@material-ui/core";
import { ReactElement } from "react";

type Props = {
  isLoading: boolean;
  children: ReactElement;
  progress: number;
  total: number;
  headText?: string;
  footText?: string;
};

export const WithProgress = (props: Props) => {
  const {
    isLoading,
    children,
    progress,
    total,
    headText = "ページ取得中…",
    footText = `${total}ページ中${progress}ページ取得完了`,
  } = props;

  const linearProgress = (
    <Box
      className={"linearProgress"}
      sx={{ alignItems: "center", height: "500px", justifyContent: "center" }}
    >
      <Box sx={{ width: "80%" }} className={"linearProgress-text"}>
        <Typography variant="h5" color="primary">
          {headText}
        </Typography>
      </Box>
      <Box sx={{ width: "80%", mr: 1 }}>
        <LinearProgress
          variant="determinate"
          value={Math.round((100 / total) * progress)}
        />
      </Box>
      <Box sx={{ width: "80%" }} className={"linearProgress-text"}>
        <Typography variant="h5" color="primary">
          {footText}
        </Typography>
      </Box>
    </Box>
  );

  return <>{isLoading ? linearProgress : children}</>;
};
