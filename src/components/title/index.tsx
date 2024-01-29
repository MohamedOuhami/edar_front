import React from "react";
import {
    useRouterContext,
    TitleProps,
    useLink,
    useRouterType,
} from "@refinedev/core";

import Button from "@mui/material/Button";
import { logo, yariga } from "assets";

export const CustomTitle: React.FC<TitleProps> = ({ collapsed }) => {
    const routerType = useRouterType();
    const Link = useLink();
    const { Link: LegacyLink } = useRouterContext();

    const ActiveLink = routerType === "legacy" ? LegacyLink : Link;

    return (
        <Button fullWidth variant="text" disableRipple>
            <ActiveLink to="/">
                {collapsed ? (
                    <img
                        src={logo}
                        alt="Refine"
                        width="28px"
                        style={{ maxHeight: "38px" }}
                    />
                ) : (
                    <img
                        src={yariga}
                        alt="Yariga"
                        width="140px"
                    />
                )}
            </ActiveLink>
        </Button>
    );
};
