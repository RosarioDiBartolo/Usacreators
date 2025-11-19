export default function Section(){
    return (
         <section className="relative w-full max-w-none text-start overflow-hidden bg-radial from-tertiary to-primary py-12 ">
      {/* Top-left decorative border */}
      <div className="absolute -left-7 -top-12 bg-background h-30 w-20 rotate-45  " />
      
      {/* Bottom-right decorative border */}
      <div className="absolute -bottom-12 -right-7 h-30 w-20 bg-background rotate-45" />

      <div className="container mx-auto">
        <div className="flex items-center">
          {/* Left content */}
          <div className="relative z-10 flex-1">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight lg:leading-[70px] mb-6 lg:mb-8 bg-gradient-to-r from-[#2A1F1D] via-[#7B3306] to-[#461901] bg-clip-text text-transparent">
              10x More Efficient
              <br />
              Than Traditional Media.
            </h2>

            <ul className="space-y-4  text-xl lg:space-y-6">
              <li className="flex items-start gap-4 lg:gap-6">
                <svg className="w-9 h-[26px] flex-shrink-0 mt-1" viewBox="0 0 36 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M35.2467 0.7616C36.2511 1.77707 36.2511 3.42618 35.2467 4.44165L14.6776 25.2384C13.6733 26.2539 12.0422 26.2539 11.0378 25.2384L0.753264 14.84C-0.251088 13.8246 -0.251088 12.1754 0.753264 11.16C1.75762 10.1445 3.38868 10.1445 4.39304 11.16L12.8617 19.7143L31.615 0.7616C32.6194 -0.253867 34.2504 -0.253867 35.2548 0.7616H35.2467Z" fill="url(#paint0_linear_check1)"/>
                  <defs>
                    <linearGradient id="paint0_linear_check1" x1="29.8414" y1="1.70857" x2="1.25942" y2="1.60308" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#2A1F1D"/>
                      <stop offset="0.5" stopColor="#7B3306"/>
                      <stop offset="1" stopColor="#461901"/>
                    </linearGradient>
                  </defs>
                </svg>
                <span className=" bg-gradient-to-r from-[#2A1F1D] via-[#7B3306] to-[#461901] bg-clip-text text-transparent">
                  Save on media costs while boosting campaign ROI.
                </span>
              </li>

              <li className="flex items-start gap-4 lg:gap-6">
                <svg className="w-9 h-[26px] flex-shrink-0 mt-1" viewBox="0 0 36 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M35.2467 0.7616C36.2511 1.77707 36.2511 3.42618 35.2467 4.44165L14.6776 25.2384C13.6733 26.2539 12.0422 26.2539 11.0378 25.2384L0.753264 14.84C-0.251088 13.8246 -0.251088 12.1754 0.753264 11.16C1.75762 10.1445 3.38868 10.1445 4.39304 11.16L12.8617 19.7143L31.615 0.7616C32.6194 -0.253867 34.2504 -0.253867 35.2548 0.7616H35.2467Z" fill="url(#paint0_linear_check2)"/>
                  <defs>
                    <linearGradient id="paint0_linear_check2" x1="29.8414" y1="1.70857" x2="1.25942" y2="1.60308" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#2A1F1D"/>
                      <stop offset="0.5" stopColor="#7B3306"/>
                      <stop offset="1" stopColor="#461901"/>
                    </linearGradient>
                  </defs>
                </svg>
                <span className=" bg-gradient-to-r from-[#2A1F1D] via-[#7B3306] to-[#461901] bg-clip-text text-transparent">
                  Reach your target audience through authentic contents.
                </span>
              </li>

              <li className="flex items-start gap-4 lg:gap-6">
                <svg className="w-9 h-[26px] flex-shrink-0 mt-1" viewBox="0 0 36 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M35.2467 0.7616C36.2511 1.77707 36.2511 3.42618 35.2467 4.44165L14.6776 25.2384C13.6733 26.2539 12.0422 26.2539 11.0378 25.2384L0.753264 14.84C-0.251088 13.8246 -0.251088 12.1754 0.753264 11.16C1.75762 10.1445 3.38868 10.1445 4.39304 11.16L12.8617 19.7143L31.615 0.7616C32.6194 -0.253867 34.2504 -0.253867 35.2548 0.7616H35.2467Z" fill="url(#paint0_linear_check3)"/>
                  <defs>
                    <linearGradient id="paint0_linear_check3" x1="29.8414" y1="1.70857" x2="1.25942" y2="1.60308" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#2A1F1D"/>
                      <stop offset="0.5" stopColor="#7B3306"/>
                      <stop offset="1" stopColor="#461901"/>
                    </linearGradient>
                  </defs>
                </svg>
                <span className=" bg-gradient-to-r from-[#2A1F1D] via-[#7B3306] to-[#461901] bg-clip-text text-transparent">
                  Social content drives more sales, engagement, and real impact.
                </span>
              </li>
            </ul>
          </div>

          {/* Right content - Laptop image */}
          <div className="relative  max-w-2xl flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[600px] lg:max-w-none">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/8d03c2cc651fa4b2844c91423f5bf1f476e83369?width=1590"
                alt="Marketing efficiency comparison chart"
                className="w-full h-auto -rotate-[10deg]  "
              />
            </div>
          </div>
        </div>
      </div>
    </section>
    )
}