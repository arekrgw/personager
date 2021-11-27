import {
  IconButton,
  IconButtonProps as MuiIconButtonProps,
} from "@mui/material";
import Link, { LinkProps } from "next/link";
import { FC } from "react";

type IconButtonLink = MuiIconButtonProps &
  Pick<LinkProps, "href" | "as" | "prefetch">;

const IconButtonLink: FC<IconButtonLink> = ({
  href,
  as,
  prefetch,
  children,
  ...props
}) => (
  <Link href={href} as={as} prefetch={prefetch} passHref>
    <IconButton {...props}>{children}</IconButton>
  </Link>
);

export default IconButtonLink;
