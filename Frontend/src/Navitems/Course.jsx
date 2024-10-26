import React from 'react'
import { Link } from 'react-router-dom'

const Course = () => {
  return (
    <div>
         <div className='mx-[20px] sm:mx-[30px] lg:mx-[120px]'>
      <div className='mt-[50px]'>
        <h1 className='mb-[30px] text-4xl font-bold'>ABOUT OUR BOOKSTORE</h1>
        <p className='text-xl'>
          Welcome to our online bookstore, your one-stop destination for a wide variety of books! 
          Whether you're looking for the latest bestsellers, classic literature, or educational resources, 
          we have something for everyone. Our mission is to foster a love for reading and provide access 
          to books that inspire, educate, and entertain.
        </p>
      </div>

      <div className='mt-[50px]'>
        <h1 className='mb-[30px] text-4xl font-bold text-violet-800'>What We Offer</h1>
        <p className='text-xl'>
          At our bookstore, we provide:
          <ul className='list-disc list-inside'>
            <li><strong>Vast Collection:</strong> A curated selection of books across various genres.</li>
            <li><strong>Competitive Prices:</strong> Affordable pricing to make reading accessible to all.</li>
            <li><strong>Fast Shipping:</strong> Quick and reliable shipping options to get your books to you as soon as possible.</li>
            <li><strong>Personalized Recommendations:</strong> Tailored book suggestions based on your preferences.</li>
            <li><strong>Secure Payments:</strong> Safe and easy checkout process to protect your personal information.</li>
          </ul>
        </p>
      </div>

      <div className='mt-[50px]'>
        <h1 className='mb-[30px] text-4xl font-bold text-violet-800'>Technical Expertise</h1>
        <p className='text-xl'>
          Our team is skilled in MERN stack development, ensuring a smooth and engaging user experience.
          We use the latest technologies to build a robust platform that supports our bookstore's operations
          and provides you with a seamless shopping experience.
        </p>
      </div>

      <div className='mt-[50px]'>
        <h1 className='mb-[30px] text-3xl font-bold text-violet-800'>Professional Highlights</h1>
        <p className='text-xl'>
          We are proud of our commitment to quality service and customer satisfaction. Our platform is designed 
          to be user-friendly, and we continuously work on improving our features to meet your needs.
        </p>
      </div>

      <div className='mt-[50px]'>
        <h1 className='mb-[30px] text-3xl font-bold text-violet-800'>Personal Interests and Inspiration</h1>
        <p className='mb-[60px] text-xl'>
          Our love for books goes beyond mere commerce; we believe in the power of stories to connect people.
          We host community events and book clubs to engage with our readers and promote a culture of reading.
        </p>
      </div>
    </div>
  );
};

      
    </div>
  )
}

export default Course
