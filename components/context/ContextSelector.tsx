"use client";

import  { useEffect, useState } from "react";
import {contextVideoPatterns } from "@/constants";
import ContextVideoCard from "./ContextVideoCard";
import ContextFaqCard from "./ContextFaqCard";

const ContextSelector = () => {
 const [loading, setLoading] = useState(false);
 const [faqs, setFaqs] = useState(null);

//  useEffect(() => {
//   const config = {
//     headers: {
//       'Content-Type': 'application/json',
//        'Access-Control-Allow-Credentials': true,
//       'Access-Control-Allow-Origin': '*',
//     },
//     withCredentials: true // Include credentials (cookies) in the request, if necessary
//   };

//   const fetchData = async () => {
//     const response = await axios.get("http://10.1.10.170:8000/faq", config);
//     const newData = response.data;
//     setFaqs(newData);
//   };

//   fetchData();
// });





//  useEffect(() => {
//   const getData =  () => {
//     axios.get("http://10.1.10.170:8000/faq").then((res) => console.log(res));
//   // console.log("faqsList::", faqsList);
//  //setFaqs(faqsList);
//   }
//    getData();
//   //console.log("faqs::", faqs);
// }, []);

useEffect(() => {
  fetch("http://10.1.10.170:8000/faq")
    .then(function (response) {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(function (data) {
      setFaqs(data);
      console.log("response.data:", data);
    })
    .catch(function (error) {
      console.error('Error during fetch operation:', error);
    })
    .finally(function () {
      setLoading(false);
    });
}, []);

//  useEffect(() => {
//   setLoading(true);

//   const getFaqs = async () => {
//     try {
//       const faqsList: FaqItem[] = await axios.get(`${API_URL}/faq`);
//       console.log("hhhh", faqsList);
//      setFaqs(faqsList);
//     } catch (error) {
//       // Handle error if needed
//       console.error("Error fetching FAQs:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   getFaqs();
//  }, []);

 if (loading) return <p>Loaidng....</p>;
 console.log("faqs:", faqs);

  return (
    <div className="flex w-full gap-5 pt-5">
      <div className="light-border flex flex-col items-center justify-center rounded-lg p-5">
        <h3 className="text-dark400_light900 py-2">
          نوع ویدثوی درخواستی خود را انتخاب نمایید
        </h3>
        <ContextVideoCard items={contextVideoPatterns} />
      </div>
      <div className="flex flex-col items-start justify-start gap-5">
        {JSON.stringify(faqs)}
        <ContextFaqCard 
          id="faq"
          title="سوالات متداول"
          messages={faqs}
        />
      
      </div>
    </div>
  );
};

export default ContextSelector;
