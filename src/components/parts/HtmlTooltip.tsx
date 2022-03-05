import Tooltip from "@mui/material/Tooltip";
import { ReactElement } from "react";

export const HtmlTooltip = (props: {
  title: ReactElement;
  children: ReactElement;
}) => <Tooltip children={props.children} title={props.title} />;
