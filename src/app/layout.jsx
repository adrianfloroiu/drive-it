import { AntdRegistry } from "@ant-design/nextjs-registry";
import LayoutProvider from "@/components/LayoutProvider";
import "./globals.css";
import "@/styles/commonClasses.css";
import ReduxStoreProvider from "@/components/ReduxStoreProvider";

export const metadata = {
    title: "Drive It",
    description: "Car Rental Web Application",
};

export default function RootLayout({ children }) {
    return (
        <AntdRegistry>
            <ReduxStoreProvider>
                <LayoutProvider>{children}</LayoutProvider>
            </ReduxStoreProvider>
        </AntdRegistry>
    );
}
