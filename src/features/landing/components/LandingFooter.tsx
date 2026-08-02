import Link from "next/link";

export function LandingFooter() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">

      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">

        <div className="grid gap-14 lg:grid-cols-5">

          {/* BRAND */}

          <div className="lg:col-span-2">

            <Link
              href="/"
              className="flex items-center gap-4"
            >
              <div
                className="
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center

                  rounded-2xl

                  bg-[#343C67]
                "
              >
                <img
                  src="/favicon.png"
                  alt="IndoPOS"
                  className="h-8 w-8"
                />
              </div>

              <div>

                <h2
                  className="
                    text-2xl
                    font-bold

                    text-[#343C67]
                  "
                >
                  IndoPOS
                </h2>

                <p className="text-sm text-slate-500">
                  Smart Business Platform
                </p>

              </div>

            </Link>

            <p
              className="
                mt-6

                max-w-md

                leading-7

                text-slate-500
              "
            >
              Platform Point of Sale modern
              untuk Restaurant, Cafe, Coffee Shop,
              Retail, UMKM dan berbagai jenis bisnis
              di Indonesia.
            </p>

          </div>

          {/* PRODUCT */}

          <div>

            <h3
              className="
                mb-5

                font-bold

                text-slate-900
              "
            >
              Product
            </h3>

            <ul className="space-y-4 text-slate-500">

              <li>
                <a href="#features" className="hover:text-[#343C67]">
                  Features
                </a>
              </li>

              <li>
                <a href="#showcase" className="hover:text-[#343C67]">
                  Showcase
                </a>
              </li>

              <li>
                <a href="#pricing" className="hover:text-[#343C67]">
                  Pricing
                </a>
              </li>

              <li>
                <Link href="/login" className="hover:text-[#343C67]">
                  Login
                </Link>
              </li>

            </ul>

          </div>

          {/* COMPANY */}

          <div>

            <h3
              className="
                mb-5

                font-bold

                text-slate-900
              "
            >
              Company
            </h3>

            <ul className="space-y-4 text-slate-500">

              <li>About Us</li>

              <li>Contact</li>

              <li>Career</li>

              <li>Partnership</li>

            </ul>

          </div>

          {/* LEGAL */}

          <div>

            <h3
              className="
                mb-5

                font-bold

                text-slate-900
              "
            >
              Legal
            </h3>

            <ul className="space-y-4 text-slate-500">

              <li>Privacy Policy</li>

              <li>Terms of Service</li>

              <li>Cookie Policy</li>

              <li>License</li>

            </ul>

          </div>

        </div>

        {/* Divider */}

        <div className="my-10 border-t border-slate-200" />

        {/* Bottom */}

        <div
          className="
            flex
            flex-col
            gap-4

            text-sm
            text-slate-500

            lg:flex-row
            lg:items-center
            lg:justify-between
          "
        >

          <p>
            © {new Date().getFullYear()} IndoPOS.
            All rights reserved.
          </p>

          <p>
            Built with ❤️ in Indonesia
          </p>

        </div>

      </div>

    </footer>
  );
}