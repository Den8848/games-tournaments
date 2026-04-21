import type { ReactNode } from "react";

interface TournamentsLayoutProps {
  children: ReactNode;
  modal: ReactNode;
}

export default function TournamentsLayout({ children, modal }: TournamentsLayoutProps) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}

