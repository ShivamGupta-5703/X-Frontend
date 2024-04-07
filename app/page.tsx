"use client"
import "./globals.css";
import { TweetModal } from "./components/TwitterModal";
import Feed  from "./components/Feed";



function Home(){

  return (
    <section>
      <TweetModal/>
      <Feed/>
    </section>
  );
}


export default Home ;