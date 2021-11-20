type PathnameType =
  | "/dashboard"
  | "/chat"
  | "/friends"
  | "/notifications"
  | "/search"
  | "/copyright";

export type LinkType = {
  name: string;
  Icon: any;
  pathname: PathnameType;
  Component: any;
};
