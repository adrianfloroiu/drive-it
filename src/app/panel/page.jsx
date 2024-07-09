"use client";
import { useSelector } from "react-redux";
import { Tabs } from "antd";
import General from "@/components/panelComponents/General";
import Cars from "@/components/panelComponents/Cars";
import Users from "@/components/panelComponents/Users";
import Bookings from "@/components/panelComponents/Bookings";

function Panel() {
    const { currentUser } = useSelector((state) => state.user);

    const items = currentUser?.isAdmin
        ? [
              {
                  key: "1",
                  label: "General",
                  children: <General />,
              },
              {
                  key: "2",
                  label: "Cars",
                  children: <Cars />,
              },
              {
                  key: "3",
                  label: "Users",
                  children: <Users />,
              },
              {
                  key: "4",
                  label: "Bookings",
                  children: <Bookings />,
              },
          ]
        : [
              {
                  key: "1",
                  label: "General",
                  children: <General />,
              },
              {
                  key: "2",
                  label: "Bookings",
                  children: <Bookings />,
              },
          ];

    return (
        <div className="p-5" style={{ height: "calc(100vh - 100px)" }}>
            <Tabs defaultActiveKey="1" items={items} />
        </div>
    );
}

export default Panel;
