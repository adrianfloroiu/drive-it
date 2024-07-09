"use client";
import React from "react";
import { useSelector } from "react-redux";
import { Poppins } from "next/font/google";
import { ConfigProvider, Layout } from "antd";
import Navbar from "./Navbar";
import FooterComponent from "./FooterComponent";
import Spinner from "./Spinner";
import { usePathname } from "next/navigation";

const { Header, Footer, Content } = Layout;

const poppins = Poppins({
    weight: ["400", "700", "800"],
    subsets: ["latin"],
    display: "swap",
});

function LayoutProvider({ children }) {
    const { loading } = useSelector((state) => state.loader);
    const pathname = usePathname();

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: "#000",
                    fontFamily: poppins.style.fontFamily,
                },
            }}
        >
            <html>
                <body className={poppins.className}>
                    {loading && <Spinner />}
                    <Layout>
                        <Header
                            className="flex justify-between no-selection w-100"
                            style={{
                                position: "sticky",
                                top: 0,
                                zIndex: 999,
                            }}
                        >
                            <Navbar />
                        </Header>
                        <Content
                            className="w-screen"
                            style={{
                                paddingBottom:
                                    pathname === "/login" ||
                                    pathname === "/register"
                                        ? 0
                                        : 100,
                            }}
                        >
                            {children}
                        </Content>
                        {pathname !== "/login" && pathname !== "/register" && (
                            <Footer
                                className="w-100"
                                style={{
                                    position: "fixed",
                                    bottom: 0,
                                    zIndex: 999,
                                    background: "#001529",
                                }}
                            >
                                <FooterComponent />
                            </Footer>
                        )}
                    </Layout>
                </body>
            </html>
        </ConfigProvider>
    );
}

export default LayoutProvider;
