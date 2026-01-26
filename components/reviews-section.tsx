"use client";

import { motion } from "motion/react";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface Review {
  id: number;
  rating: number;
  date: string;
  text: string;
  name: string;
  title: string;
  company: string;
  avatarColor: string;
}

const reviews: Review[] = [
  {
    id: 1,
    rating: 5,
    date: "2024-08-15",
    text: "fiootv has completely revolutionized how we approach entertainment. The vast content library and real-time updates are incredibly accurate, and the streaming quality ensures we get the best viewing experience. This platform is the future of entertainment. fiootv is more than just a platform. From tracking new releases to managing watchlists, it handles everything seamlessly. Highly recommended!",
    name: "Nasimul Huda",
    title: "CEO",
    company: "Nasim Entertainment Group",
    avatarColor: "bg-blue-200",
  },
  {
    id: 2,
    rating: 5,
    date: "2024-08-15",
    text: "fiootv is more than just a platform; it's a complete ecosystem for entertainment enthusiasts.",
    name: "Nazmul Haque",
    title: "Director",
    company: "Eastern Media Industries",
    avatarColor: "bg-yellow-200",
  },
  {
    id: 3,
    rating: 5,
    date: "2024-08-15",
    text: "The content discovery feature on fiootv is exceptional. It allows us to find exactly what we want to watch.",
    name: "Fahmida Islam",
    title: "Managing Director",
    company: "Global Entertainment Ltd.",
    avatarColor: "bg-purple-200",
  },
  {
    id: 4,
    rating: 5,
    date: "2024-08-15",
    text: "The multi-language support feature is a standout. It simplifies the entire process of finding content in our preferred language.",
    name: "Raihan Karim",
    title: "Founder",
    company: "Karim Media Solutions",
    avatarColor: "bg-green-200",
  },
  {
    id: 5,
    rating: 5,
    date: "2024-08-15",
    text: "fiootv has revolutionized how we approach entertainment consumption.",
    name: "Rafiun Islam",
    title: "CEO",
    company: "Apex Entertainment",
    avatarColor: "bg-green-200",
  },
];

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="bg-white border border-gray-200 p-8 h-full flex flex-col hover:border-primary transition-colors duration-200">
      {/* Rating and Date */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            {[...Array(review.rating)].map((_, i) => (
              <Star
                key={i}
                className="w-5 h-5 fill-primary text-primary"
              />
            ))}
          </div>
          <span className="text-gray-400 text-sm font-medium">(5/5)</span>
        </div>
        <span className="text-gray-400 text-sm font-medium bg-gray-50 px-3 py-1 border border-gray-200">{review.date}</span>
      </div>

      {/* Review Text */}
      <p className="text-gray-900 leading-relaxed mb-8 flex-grow text-lg">
        &quot;{review.text}&quot;
      </p>

      {/* Reviewer Info */}
      <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
        <div
          className={`w-14 h-14 ${review.avatarColor} flex items-center justify-center text-gray-800 font-bold text-xl border border-gray-200`}
        >
          {review.name.charAt(0)}
        </div>
        <div>
          <p className="font-semibold text-gray-900 text-lg">{review.name}</p>
          <p className="text-sm text-gray-500 font-medium">
            {review.title}, {review.company}
          </p>
        </div>
      </div>
    </div>
  );
}

export function ReviewsSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-white py-20 md:py-28">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Top Section - Statistics and CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-12">
            {/* Left Side - Statistics */}
            <div className="flex flex-col w-full md:w-auto">
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-semibold text-primary mb-4 tracking-tight">
                550+
              </h2>
              <p className="text-xl md:text-4xl font-semibold text-gray-900 leading-tight">
                Reviews from Industry Leaders
              </p>
            </div>

           
          </div>
        </motion.div>

        {/* Reviews Grid/Carousel */}
        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-4">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={index === 0 ? "md:col-span-2" : ""}
            >
              <ReviewCard review={review} />
            </motion.div>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            autoHeight={false}
            breakpoints={{
              640: {
                slidesPerView: 1.2,
              },
            }}
            className="review-swiper"
          >
            {reviews.map((review) => (
              <SwiperSlide key={review.id} style={{ height: "auto" }}>
                <div className="h-full" style={{ minHeight: "450px" }}>
                  <ReviewCard review={review} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <style jsx global>{`
        .review-swiper .swiper-button-next,
        .review-swiper .swiper-button-prev {
          color: #ef2828;
        }
        .review-swiper .swiper-pagination-bullet-active {
          background-color: #ef2828;
        }
        .review-swiper .swiper-wrapper {
          display: flex;
          align-items: stretch;
        }
        .review-swiper .swiper-slide {
          height: auto;
          display: flex;
        }
        @media (max-width: 768px) {
          .review-swiper .swiper-slide {
            height: 100%;
            min-height: 450px;
          }
          .review-swiper .swiper-slide > div {
            height: 100%;
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
