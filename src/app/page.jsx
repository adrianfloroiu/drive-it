import Hero from "@/components/homeComponents/Hero";
import WhyUs from "@/components/homeComponents/WhyUs";
import Gallery from "@/components/homeComponents/Gallery";
import Questions from "@/components/homeComponents/Questions";
import { Divider } from "antd";

export default async function Home() {
    return (
        <div className="p-5">
            <Hero />
            <WhyUs />
            <Divider />
            <Gallery />
            <Divider />
            <Questions />
        </div>
    );
}
