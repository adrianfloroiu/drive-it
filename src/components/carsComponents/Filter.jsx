"use client";
import React from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Select } from "antd";

function Filter({ filterName, options }) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const onChange = (value) => {
        const params = new URLSearchParams(searchParams);
        if (value) {
            params.set(filterName.toLowerCase(), value);
            params.delete("page");
        } else {
            params.delete(filterName.toLowerCase());
        }

        router.replace(`${pathname}?${params.toString()}`);
    };

    return (
        <Select
            placeholder={filterName}
            style={{ width: 150 }}
            value={searchParams.get(filterName.toLowerCase())}
            onChange={onChange}
            options={options}
            allowClear
        />
    );
}

export default Filter;
