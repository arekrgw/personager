import {
  ListItemButton,
  ListItemButtonProps as MuiListItemButtonProps,
} from "@mui/material";
import Link, { LinkProps } from "next/link";
import { FC } from "react";

type ListItemLinkProps = MuiListItemButtonProps &
  Pick<LinkProps, "href" | "as" | "prefetch">;

const ListItemLink: FC<ListItemLinkProps> = ({
  href,
  as,
  prefetch,
  children,
  ...props
}) => (
  <Link href={href} as={as} prefetch={prefetch} passHref>
    <ListItemButton {...props}>{children}</ListItemButton>
  </Link>
);

export default ListItemLink;
