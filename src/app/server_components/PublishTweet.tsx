

import { cookies } from "next/headers";
import { AiOutlinePicture } from "react-icons/ai";

const PublishTweet = () => {

  async function addTweet(formData: FormData) {
    "use server";
    console.log(formData)
  }
  return (
    <form action={addTweet}>
      <div className="h-62 mx-1">
        <input
          type="text"
          name="tweet"
          placeholder="What is happening?!"
          autoComplete="off"
          className=" w-full h-62 bg-transparent 
        placeholder:text-gray-600
        outline-none border-none border-b-[0.5px] px-2 py-2 text-xl font-light"
          id="tweetInput"
        />
      </div>
      <div>{/* everyone can reply */}</div>
      <div className=" w-full justify-between items-center flex">
        <div></div>
        <div className="w-[100%] h-[10%] flex items-center justify-between p-2">
          <button className="w-10 h-10 flex items-end justify-center text-blue-600 rounded-full hover:bg-blue-800/20">
            <input className="hidden" type="file" id="image-upload" accept="image/*" />
          <AiOutlinePicture 
          className="w-[50%] h-[50%]" 
          />
          </button>
          <button className="w-[20%] rounded-3xl bg-blue-600 py-1 px-4 text-md hover:bg-opacity-70 transition duration-200">
            Post
          </button>
        </div>
      </div>
    </form>
  );
};

export default PublishTweet;
