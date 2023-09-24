"use client";
import React from "react";
import SlideMenu from "../component/SlideMenu";
import { useCookies } from "react-cookie";

function Page() {
  const [cookies] = useCookies(["user"]);

  return cookies.user && cookies.user.admin ? (
    <main className="max-w-4xl mx-auto  mt-4">
      <div className="text-center my-5 flex flex-col gap-4"></div>
    </main>
  ) : (
    <main className="min-h-screen flex justify-center overflow-hidden relative">
      <div className="min-h-screen home-grid-d w100 bg-red-500 flex flex-col justify-center items-center bottom-0 pb-28">
        <div className="h-48"></div>
        <div className="card w-96 bg-base-100 shadow-xl mt-16">
          {/* <figure className="max-h-60">
            <img src="iqraimage.jpg" alt="Campus" />
          </figure> */}
          <div className="carousel box-rounded mx-auto">
            <div className="carousel-item w-full">
              <img
                src="iqraimage.jpg"
                className="w-full"
                alt="Tailwind CSS Carousel component"
              />
            </div>
            <div className="carousel-item w-full">
              <img
                src="iqraimage1.jpg"
                className="w-full"
                alt="Tailwind CSS Carousel component"
              />
            </div>
            <div className="carousel-item w-full">
              <img
                src="iqraimage2.jpg"
                className="w-full"
                alt="Tailwind CSS Carousel component"
              />
            </div>
            <div className="carousel-item w-full">
              <img
                src="iqraimage3.jpg"
                className="w-full"
                alt="Tailwind CSS Carousel component"
              />
            </div>
            <div className="carousel-item w-full">
              <img
                src="iqraimage4.jpg"
                className="w-full"
                alt="Tailwind CSS Carousel component"
              />
            </div>
            <div className="carousel-item w-full">
              <img
                src="iqraimage5.jpg"
                className="w-full"
                alt="Tailwind CSS Carousel component"
              />
            </div>
            <div className="carousel-item w-full">
              <img
                src="iqraimage6.jpg"
                className="w-full"
                alt="Tailwind CSS Carousel component"
              />
            </div>
          </div>
          <div className="card-body">
            <h2 className="card-title">IQRA</h2>
            <p>
              India&apos;s first qur&apos;anic research institute A world-class
              research institute envisioned to deliver authentic research on
              quran studies and its allied disciplines Islamic studies, art, and
              literature In the memory of a great legacy OK Zainudin Kutti
              Musliyar The ocean of knowledge, OK Zainudin Kutti Musliyar was
              hailed with this unique title for his unmatched depth of knowledge
              in Islamic sciences An erudite scholar of the 21st century in
              South India, he was honored to be the teacher and mentor of almost
              all Muslim scholars in the post-independent Kerala, thereby he is
              called as Ustad al Asatid, the teacher of teachers. India&apos;s
              first Quranic research institute Best-in-class infrastructure
              Quranic research and its dissemination have stood the test of time
              adapting and addressing the ever-changing educational and social
              scenario. Here we develop an excellent center for advanced study
              and research on Quran and its allied subjects. integrated with
              modern academics, the center will strive to adopt comprehensive
              syllabi encompassing all aspects of theology, jurisprudence,
              etiquettes, literature, and exegesis of the Quran. This center
              provides full-time, part-time, and diploma courses in different
              subjects of Islamic sciences, specifically Quran studies
              integrated with modern science, business, law, literature,
              language, and academics.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Page;
