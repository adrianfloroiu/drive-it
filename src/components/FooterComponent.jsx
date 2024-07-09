import React from "react";
import Link from "next/link";

function FooterComponent() {
    return (
        <div className="text-white flex justify-around items-center text-center">
            <h3 className="px-3">DriveIt {new Date().getFullYear()}</h3>
            <Link
                className="text-white"
                href="https://maps.app.goo.gl/8TL9Wgq5bLt9MCHE8"
            >
                <h4 className="px-3">
                    Address: Strada Mihai Eminescu, Mioveni
                </h4>
            </Link>
        </div>
    );
}

export default FooterComponent;
