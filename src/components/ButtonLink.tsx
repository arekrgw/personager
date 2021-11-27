import { Button, ButtonProps as MuiButtonProps } from "@mui/material";
import Link, { LinkProps } from "next/link";
import { FC } from "react";

type ButtonLink = MuiButtonProps & Pick<LinkProps, "href" | "as" | "prefetch">;

const ButtonLink: FC<ButtonLink> = ({
  href,
  as,
  prefetch,
  children,
  ...props
}) => (
  <Link href={href} as={as} prefetch={prefetch} passHref>
    <Button {...props}>{children}</Button>
  </Link>
);

export default ButtonLink;
