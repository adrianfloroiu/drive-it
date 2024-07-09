import React from "react";
import { Carousel } from "antd";

function Gallery() {
    return (
        <section className="mt-4">
            <div className="text-center">
                <h2 className="text-3xl underline">Gallery</h2>
            </div>
            <div className="p-3">
                <Carousel className="carousel">
                    <div className="carousel-img">
                        <img src="/home/gallery/gallery-1.jpg" alt="Car 1" />
                    </div>
                    <div className="carousel-img">
                        <img src="/home/gallery/gallery-2.jpg" alt="Car 2" />
                    </div>
                    <div className="carousel-img">
                        <img src="/home/gallery/gallery-3.jpg" alt="Car 3" />
                    </div>
                    <div className="carousel-img">
                        <img src="/home/gallery/gallery-4.jpg" alt="Car 4" />
                    </div>
                    <div className="carousel-img">
                        <img src="/home/gallery/gallery-5.jpg" alt="Car 5" />
                    </div>
                </Carousel>
            </div>
        </section>
    );
}

export default Gallery;
