import Footer from 'components/Footer'
import Header from 'components/Header'
import React, { FC } from 'react'
import img1 from '../../assets/images/iPhone-12-Mockup.png'
import img2 from '../../assets/images/tailwind.svg'
import img3 from '../../assets/images/aws.svg'
import img4 from '../../assets/images/stripe.svg'
import img5 from '../../assets/images/Data Arranging_Outline.svg'
import img6 from '../../assets/images/react.svg'
import racoonSVG from '../../assets/images/racoon.svg'
interface landingPage {
  title: string
}

const LandingPage: FC<landingPage> = ({ title }) => {
  return (
    <>
      <Header />
      <section className="text-gray-600 body-font">
        <div className="max-w-7xl mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 md:ml-24 pt-6 flex flex-col md:items-start md:text-left mb-40 items-center text-center">
            <h1 className="mb-5 sm:text-6xl text-5xl items-center Avenir xl:w-2/2 text-gray-900">
              EDI Processing for the Modern Age
            </h1>
            <p className="mb-4 xl:w-3/4 text-gray-600 text-lg">
              Lightning-fast and easy-to-use EDI parsing, splitting, validation,
              and configuring for any EDI format.
            </p>
            <div className="flex justify-center">
              <a
                className="inline-flex items-center px-5 py-3 mt-2 font-medium text-white transition duration-500 ease-in-out transform bg-transparent border rounded-lg bg-gray-900"
                href="/#/login"
              >
                <span className="justify-center">Sign Up</span>
              </a>
            </div>
          </div>
          <div className="xl:mr-44 sm:mr-0 sm:mb-28 mb-0 lg:mb-0 mr-48 md:pl-10">
            <img
              className="w-80 md:ml-1 ml-24"
              alt="iPhone-12"
              src={racoonSVG}
            ></img>
          </div>
        </div>
        <section className="mx-auto" style={{ background: '#f5f6fe' }}>
          <div className="container p-5 mx-auto lg:p-24 w-1/2 ">
            <div className="flex flex-col w-full mb-4 text-left lg:text-center">
              <h1 className="mb-8 text-4xl Avenir font-semibold text-black ">
                Leveraging top-tier technologies
              </h1>
            </div>
            <div className="grid m-8 text-center lg:grid-cols-4 sm:grid-cols-1">
              <div className="flex items-center justify-center sm:pb-10">
                <img
                  src={img3}
                  alt="AWS Logo"
                  className="block object-contain h-16 greyC"
                ></img>
              </div>
              <div className="flex items-center justify-center sm:pb-8">
                <img
                  src={img6}
                  alt="React Logo"
                  className="block object-contain h-16 greyC"
                ></img>
              </div>
              <div className="flex items-center justify-center sm:pb-4">
                <img
                  src={img2}
                  alt="Tailwind Logo"
                  className="block object-contain h-16 greyC"
                ></img>
              </div>
              <div className="flex items-center justify-center">
                <img
                  src={img4}
                  alt="Stripe Logo"
                  className="block object-contain h-16 greyC"
                ></img>
              </div>
            </div>
          </div>
        </section>
        <div className=" max-w-7xl pt-20 mx-auto text-center">
          <h1 className="mb-8 text-6xl Avenir font-semibold text-gray-900">
            Less Code, More Customization.
          </h1>
          <h1 className="mb-8 text-2xl Avenir font-semibold text-gray-600 text-center">
            A simple UI to setup your trading partners and their EDI
            transactions in a standardized process that is also highly
            customizable and secure.
          </h1>
          <div className="container flex flex-col items-center justify-center mx-auto rounded-lg ">
            <img
              className="object-cover object-center w-3/4 mb-10 g327 border rounded-lg shadow-md"
              alt="Placeholder Image"
              src={img5}
            ></img>
          </div>
        </div>
        <section className="relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
            <div className="py-24 md:py-36">
              <h1 className="mb-5 text-6xl Avenir font-semibold text-gray-900">
                Sign up for our beta!
              </h1>
              <h1 className="mb-9 text-2xl font-semibold text-gray-600">
                Enter your email address and get our updates straight away.
              </h1>
              <input
                placeholder="jack@example.com"
                name="email"
                type="email"
                autoComplete="email"
                className="border border-gray-600 w-1/4 pr-2 pl-2 py-3 mt-2 rounded-md text-gray-800 font-semibold hover:border-gray-900"
              ></input>{' '}
              <a
                className="inline-flex items-center px-14 py-3 mt-2 ml-2 font-medium text-white transition duration-500 ease-in-out transform bg-transparent border rounded-lg bg-gray-900"
                href="/"
              >
                <span className="justify-center">Subscribe</span>
              </a>
            </div>
          </div>
        </section>
      </section>
      <Footer />
    </>
  )
}

export default LandingPage
