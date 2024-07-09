import React from "react";
import axios from "axios";
import { cookies } from "next/headers";
import { Flex } from "antd";
import SearchBar from "@/components/carsComponents/SearchBar";
import CarCard from "@/components/carsComponents/CarCard";
import Filter from "@/components/carsComponents/Filter";
import PaginationComponent from "@/components/carsComponents/Pagination";
import { brands, bodies } from "@/helpers/filterOptions";

export async function getCars(
    search = "",
    brand = "",
    body = "",
    sort = "",
    limit = 6,
    page = 1
) {
    try {
        const cookieStore = cookies();
        const token = cookieStore.get("token").value;
        const response = await axios.get(
            `${process.env.domain}/api/cars?search=${search}&brand=${brand}&body=${body}&sort=${sort}&limit=${limit}&page=${page}`,
            {
                headers: {
                    Cookie: `token=${token}`,
                },
            }
        );

        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export default async function Cars({ searchParams }) {
    const search = searchParams?.search;
    const brand = searchParams?.brand;
    const body = searchParams?.body;
    const sort = searchParams?.sort;
    const page = parseInt(searchParams?.page) || 1;
    const limit = 6;

    const data = await getCars(search, brand, body, sort, limit, page);

    return (
        <div className="p-5 w-75 mx-auto">
            <div className="text-center">
                <h1 className="text-3xl text-bolder">Car Catalogue</h1>
                <p className="text-md">Explore our wide selection of cars</p>
            </div>
            <div className="py-4 flex justify-center items-center gap-5 wrap">
                <SearchBar />
                <div className="flex gap-2 justify-center items-center text-md wrap">
                    <Filter filterName="Brand" options={brands} />
                    <Filter filterName="Body" options={bodies} />
                    <Filter
                        filterName="Sort"
                        options={[
                            { label: "Price - Ascending", value: "asc" },
                            { label: "Price - Descending", value: "desc" },
                        ]}
                    />
                </div>
            </div>
            <section className="mt-5">
                <Flex wrap="wrap" gap="large" justify="center" align="center">
                    {data.cars.length > 0 ? (
                        data.cars.map((car) => (
                            <CarCard key={car._id} car={car} />
                        ))
                    ) : (
                        <p className="text-lg">No cars found</p>
                    )}
                </Flex>
            </section>
            <section className="mt-5 text-center">
                <PaginationComponent
                    currentPage={page}
                    totalItems={data.totalCars}
                    pageSize={limit}
                />
            </section>
        </div>
    );
}
