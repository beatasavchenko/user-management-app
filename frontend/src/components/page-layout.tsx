import type { ReactNode } from "react";

type PageLayoutProps = {
    children: ReactNode;
};

export default function PageLayout(props: PageLayoutProps) {
    return <div id="page-layout">{props.children}</div>;
}
