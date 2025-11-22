


import React, { useState } from 'react'
 
import axios from "axios";
import { createClient } from "@supabase/supabase-js"; 

const supabaseUrl= "https://zwlsscwirmvseidlmuvz.supabase.co"

const  supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp3bHNzY3dpcm12c2VpZGxtdXZ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2OTc3MTQsImV4cCI6MjA3OTI3MzcxNH0.MazfZ-R159KEle7KnfTZbItEniHUkvb7L7ca6w_K5BY"

 const supabase = createClient(supabaseUrl , supabaseKey)
export default function App() {
 

 let [img,setimg] =  useState(null)  

  const handleFilechange=(e)=>{ 
    setimg(e.target.files[0])
    console.log(img , "imagedata ")
  
  }


 async  function save()
   {
    if(!img)
    {
      alert("please select image ") 
       return ; 
    }   

    try{
 
      const {data  , error } = await supabase.storage
      .from("issta")  
      .upload("insta_imgage/" + img.name , img  ,{upsert:true }) 

       if(error) throw error;
  
   const imageUrl = `${supabaseUrl}/storage/v1/object/public/issta/insta_img/${img.name}`
       
  console.log("image URL" , imageUrl) ;  
 
    await axios.post("http://localhost:4001/upload" , {
        name :img.name, 
         imageUrl:imageUrl , 
          user :localStorage.getItem("userEmail")            
    }, 
    {
      headers: {
         Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }
  )


  alert("Image uploaded successfully! URL: " + imageUrl);

  if(error) throw error;
    } catch (err) {
      console.error("❌ Upload failed:", err);
      alert("Error uploading image. Check console for details.");
    } 
  }

  return (  

   
<div className="container">

  <input type="file"   onChange={handleFilechange}/>
  
  <button
        onClick={save}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 "
      >save </button>  
       </div>


  )
}