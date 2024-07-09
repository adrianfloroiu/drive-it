"use client";
import React from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Pagination } from "antd";

const PaginationComponent = ({ currentPage, totalItems, pageSize }) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const handlePageChange = (page) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", page);
        router.replace(`${pathname}?${params.toString()}`);
    };

    return (
        <Pagination
            current={currentPage}
            total={totalItems}
            pageSize={pageSize}
            onChange={handlePageChange}
        />
    );
};

export default PaginationComponent;
