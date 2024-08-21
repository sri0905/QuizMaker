import React, { useEffect } from 'react'
import axios from "axios";

export default function FetchingAllTheQuestions() {

    const fetchData = async () => {
        try {
          const response = await axios.post('http://localhost:4000/fetchAllQuestions', {}, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
        console.log(response.data);
      
        } catch (error) {
          console.error('Error fetching all dresses:', error);
        }
      };
    useEffect(()=>{
        fetchData()
    },[])
  return (
    <div>

    </div>
  )
}
