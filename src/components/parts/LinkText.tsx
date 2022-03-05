import { Link } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";

export const LinkText = (props: {
  to: string;
  text: string;
  className?: string;
}) => {
  return (
    <Link
      component={RouterLink}
      to={props.to}
      color="primary"
      className={props.className}
    >
      {props.text}
    </Link>
  );
};
