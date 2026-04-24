interface DefaultProps {
  className?: string | undefined;
  children?: string | undefined;
}

export interface LinkProps extends DefaultProps {
  id: string;
  href: string;
  ariaLabel: string;
  target?: string;
}

export interface ActionProps extends DefaultProps {
  id: string;
  ariaLabel: string;
  onClick: (e: MouseEvent, id: string) => void;
}

export interface UserCardProps extends DefaultProps {
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  company: {
    name: string;
  };
}
