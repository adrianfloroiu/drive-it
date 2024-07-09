"use client";
import React from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Input } from "antd";

const { Search } = Input;

function SearchBar() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const onSearch = (value, _e, info) => {
        const params = new URLSearchParams(searchParams);
        if (value) {
            params.set("search", value);
            params.delete("page");
        } else {
            params.delete("search");
        }

        router.replace(`${pathname}?${params.toString()}`);
    };

    return (
        <Search
            placeholder="Car Name"
            onSearch={onSearch}
            size="large"
            style={{ width: 500 }}
        />
    );
}

export default SearchBar;
