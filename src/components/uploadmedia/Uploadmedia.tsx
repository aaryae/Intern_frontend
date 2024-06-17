import { ChangeEvent, useState } from "react";
import axiosInstance from "service/Instance";



const Uploadmedia = () => {
  const [file, setFile] = useState<File>();

  const handleMediaSubmit = () => {
    const fetchdata = async () => {
      const formData = new FormData();
      formData.append('type', 'PROFILE');
      formData.append('file', file as File);
      try {
  
        const response = await axiosInstance({
          method: "post",
          url: "/media",
          headers: {
            'content-type': 'multipart/form-data',
          },
        });
        
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchdata();
  };

  return (
    <>
    <form onChange={handleMediaSubmit}>


      <div className="w-full md:w-1/2 pt-3 mb-6 mt-2 md:mb-0 ">
      <input
  type="file"
  placeholder=""
  name="file"
  onChange={(event: ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files?.[0]); 
  }}
/>
      </div>
    </form>
      <button onClick={handleMediaSubmit}>Submit</button>
    </>
  );
};

export default Uploadmedia;
