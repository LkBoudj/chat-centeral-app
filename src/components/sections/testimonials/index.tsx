"use client";
import React, { LegacyRef, useMemo, useRef } from "react";
//@ts-ignore
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Button } from "@nextui-org/react";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Testimonial from "./components/Testimonial";
import Section from "@/components/Section";

const Testimonials = ({ id }: { id?: LegacyRef<HTMLElement> }) => {
  const reFT: any = useRef(null);
  const testimonialsSettings = {
    dots: false,
    center: true,
    autoplay: true,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1520,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1018,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const testimonials = useMemo(
    () => [
      {
        name: "John Doe",
        job: "Graduated student",
        comment:
          "Tung Phan is very conscientious and thoughtful. He always calls to inform us about time frames, changes and costs. He is certainly an asset to your company. ",
        photo: "/images/testimonials/u1.jpg",
        date: "written 2023",
      },
      {
        name: "John Doe",
        job: "Graduated student",
        comment:
          "Tung Phan is very conscientious and thoughtful. He always calls to inform us about time frames, changes and costs. He is certainly an asset to your company. ",
        photo: "/images/testimonials/u2.jpg",
        date: "written 2023",
      },
      {
        name: "John Doe",
        job: "Graduated student",
        comment:
          "Tung Phan is very conscientious and thoughtful. He always calls to inform us about time frames, changes and costs. He is certainly an asset to your company. ",
        photo: "/images/testimonials/u3.jpg",
        date: "written 2023",
      },
      {
        name: "John Doe",
        job: "Graduated student",
        comment:
          "Tung Phan is very conscientious and thoughtful. He always calls to inform us about time frames, changes and costs. He is certainly an asset to your company. ",
        photo: "/images/testimonials/u1.jpg",
        date: "written 2023",
      },
      {
        name: "John Doe",
        job: "Graduated student",
        comment:
          "Tung Phan is very conscientious and thoughtful. He always calls to inform us about time frames, changes and costs. He is certainly an asset to your company. ",
        photo: "/images/testimonials/u2.jpg",
        date: "written 2023",
      },
      {
        name: "John Doe",
        job: "Graduated student",
        comment:
          "Tung Phan is very conscientious and thoughtful. He always calls to inform us about time frames, changes and costs. He is certainly an asset to your company. ",
        photo: "/images/testimonials/u3.jpg",
        date: "written 2023",
      },
    ],
    []
  );
  return (
    <Section id={id} sectionClass="bg-white" containerClass=" pt-32">
      <div className="space-y-16">
        <div className="flex items-center justify-between w-full">
          {/* <h2 className="max-w-[489px]  font-bold text-[30px] leading-[43px]">
            
          </h2> */}
          <h4 className="max-w-[548px] capitalize text-[43px] font-bold text-[#001131]">
            How Users like you are achieving their goals
          </h4>
          <div className="space-y-3 md:space-y-0 md:space-x-8">
            <Button
              isIconOnly
              className=" bg-transparent rounded-full pr-1 border border-black"
              variant="flat"
              onClick={() => reFT.current?.slickPrev()}
            >
              <ChevronLeft className="text-[#001131]" />
            </Button>
            <Button
              isIconOnly
              className=" bg-transparent rounded-full  border border-black"
              variant="flat"
              onClick={() => reFT.current?.slickNext()}
            >
              <ChevronRight />
            </Button>
          </div>
        </div>
        <div>
          <Slider ref={reFT} {...testimonialsSettings}>
            {testimonials.map((s, i) => (
              <Testimonial
                key={i}
                name={s.name}
                job={s.job}
                comment={s.comment}
                photo={s.photo}
                date={s.date}
              />
            ))}
          </Slider>
        </div>
      </div>
    </Section>
  );
};

export default Testimonials;
