import { Button, CircularProgress } from "@material-ui/core";

type Props = {
  onClick: () => void;
  label: string;
  variant: "text" | "outlined" | "contained" | undefined;
  isLoading: boolean;
  className?: string;
  disabled?: boolean;
};

export const CircularButton = (props: Props) => {
  const {
    onClick,
    label,
    variant,
    isLoading,
    className,
    disabled = false,
  } = props;

  return (
    <>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Button
          className={className}
          variant={variant}
          onClick={onClick}
          disabled={disabled}
        >
          {label}
        </Button>
      )}
    </>
  );
};
