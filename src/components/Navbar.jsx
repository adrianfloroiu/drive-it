"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetCurrentUser } from "@/redux/userSlice";
import { SetLoading } from "@/redux/loaderSlice";
import { Menu, Dropdown, Button, Avatar, Drawer, Grid } from "antd";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import axios from "axios";

const { useBreakpoint } = Grid;

const navItems = [
    {
        label: "Home",
        key: "home",
    },
    {
        label: "Cars",
        key: "cars",
    },
    {
        label: "Contact",
        key: "contact",
    },
];

function Navbar() {
    const [visible, setVisible] = useState(false);
    const screen = useBreakpoint();
    const { currentUser } = useSelector((state) => state.user);
    const router = useRouter();
    const pathname = usePathname();
    const dispatch = useDispatch();
    const [currentPath, setCurrentPath] = useState("");

    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };

    const getCurrentUser = async () => {
        try {
            const response = await axios.get("/api/users/currentUser");
            dispatch(SetCurrentUser(response.data.user));
        } catch (error) {
            console.log(error);
        }
    };

    const onLogout = async () => {
        try {
            dispatch(SetLoading(true));
            await axios.get("/api/users/logout");
            router.push("/login");
            dispatch(SetCurrentUser(null));
        } catch (error) {
            console.log(error);
        } finally {
            dispatch(SetLoading(false));
        }
    };

    const onMenuItemClick = (e) => {
        e.key == "home" ? router.push("/") : router.push(`/${e.key}`);
    };

    useEffect(() => {
        if (pathname !== "/login" && pathname !== "/register" && !currentUser) {
            getCurrentUser();
        }

        setCurrentPath(pathname == "/" ? "home" : pathname.slice(1));
    }, [pathname]);

    const dropdownItems = [
        {
            label: <Link href="/panel">Panel</Link>,
            key: "0",
        },
        {
            label: <span onClick={onLogout}>Logout</span>,
            key: "1",
        },
    ];

    return (
        <>
            <span
                className="text-xl text-bold text-white spaced-letters cursor-pointer"
                onClick={() => router.push("/")}
            >
                DriveIt
            </span>

            {screen.md ? (
                <div className="flex items-center">
                    <Menu
                        onClick={onMenuItemClick}
                        theme="dark"
                        mode="horizontal"
                        items={navItems}
                        selectedKeys={[currentPath]}
                        style={{ width: "16rem" }}
                    />

                    <div>
                        {currentUser ? (
                            <Dropdown menu={{ items: dropdownItems }}>
                                <Avatar size="large" className="cursor-pointer">
                                    {currentUser.name[0]}
                                </Avatar>
                            </Dropdown>
                        ) : (
                            <Button onClick={() => router.push("/login")}>
                                Login / Register
                            </Button>
                        )}
                    </div>
                </div>
            ) : (
                <div className="flex items-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="35"
                        fill="white"
                        onClick={showDrawer}
                    >
                        <path d="M3 4H21V6H3V4ZM3 11H21V13H3V11ZM3 18H21V20H3V18Z"></path>
                    </svg>

                    <Drawer
                        title="Menu"
                        placement="right"
                        closable={false}
                        onClose={onClose}
                        open={visible}
                    >
                        <Menu
                            onClick={onMenuItemClick}
                            mode="inline"
                            items={navItems}
                            selectedKeys={[currentPath]}
                        />
                        <div>
                            {currentUser ? (
                                <div className="p-4">
                                    <div
                                        className="text-md text-black cursor-pointer p-3"
                                        onClick={() => router.push("/panel")}
                                    >
                                        Panel
                                    </div>
                                    <Button type="primary" onClick={onLogout}>
                                        Logout
                                    </Button>
                                </div>
                            ) : (
                                <div className="p-3">
                                    <Button
                                        type="primary"
                                        onClick={() => router.push("/login")}
                                    >
                                        Login / Register
                                    </Button>
                                </div>
                            )}
                        </div>
                    </Drawer>
                </div>
            )}
        </>
    );
}

export default Navbar;
