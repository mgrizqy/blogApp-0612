"use client";
import * as React from "react";
import { callAPI } from "@/config/axios";
import Image from "next/image";
import { apiCall } from "@/helper/apiCall";
import { dataCategory } from "@/helper/dataCategory";
import { current } from "@reduxjs/toolkit";
import { useRouter } from "next/navigation";

const Home: React.FunctionComponent = () => {

  const router = useRouter();

  const [postsList, setPostsList] = React.useState<any[]>([]);
  const [category, setCategory] = React.useState<string[]>([
    "All",
    ...dataCategory,
  ]);

  // const filteredArticleList = filterCategory === 'All'
  //   ? articleList 
  //   : articleList.filter(item => item.category === filterCategory);

  const [articleList, SetArticleList] = React.useState<any[]>([]);
  const [articleContainer, SetArticleContainer] = React.useState<any[]>([]);
  const [filterCategory, setFilterCategory] = React.useState<string>("All");

  const getArticlesList = async () => {
    try {
      const { data } = await apiCall.get("/articles?pageSize=100&sortBy=%60created%60%20desc");

        SetArticleList(data);
        SetArticleContainer(data);

    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getArticlesList();
  }, []);

  const updateCategory = (category : string) => {

    setFilterCategory(category);

    // category != "All" ? () : ()

    category != "All" ? ( 
      SetArticleList(articleContainer), 
      SetArticleList(currentArticles => 
      currentArticles.filter(article => article.category == category))

    ) : ( SetArticleList(articleContainer) )

  }

  const printArticleList = () => {
    return articleList.map((val: any, idx: number) => {

      
      return (
        <div
          key={val.objectId}
          className="h-72 items-center bg-white rounded-xl cursor-pointer"
          onClick={()=>router.push(`/article/${val.objectId}`)}
        >
          <div className="relative h-36 w-full">
            <Image
              src={
                val.thumbnail &&
                `https://picsum.photos/id/${Math.floor(
                  Math.random() * 30
                )}/200/300`
              }
              alt={val.title}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="w-full p-4 rounded-lg">
            <div className="flex items-center justify-between">
              {/* <h6 className="px-4 uppercase font-semibold text-sm text-gray-500">
                {val.accountData.username}
              </h6> */}
              <span className="border border-slate-500 rounded-full py-0.5 px-2 text-xs">
                {val.category}
              </span>
            </div>
            <p className="font-bold md:text-sm lg:text-lg px-4 py-2">
              {val.title.slice(0, 55)}
            </p>
          </div>
        </div>
      );
    });
  };

  return (
    <main>
      <section id="hero">
        <div className="relative h-[30rem] w-full">
          <Image
            src={`https://picsum.photos/id/${Math.floor(
              Math.random() * 30
            )}/600/300`}
            alt={"test"}
            layout="fill"
            objectFit="cover"
          />
          <div className="absolute bottom-0 right-0 w-full p-4 text-right bg-slate-200 bg-opacity-55">
            <p className="text-2xl md:text-4xl lg:text-5xl italic">
              {articleList[0]?.title}
            </p>
          </div>
        </div>
      </section>
      <section id="article-list" className="space-y-8 mt-8 px-20">
        <div id="article-filter" className="w-full overflow-x-auto py-8">
          {/* filter */}
          <ul className="flex gap-4">
            {category.map((val: string) => (
              <li key={val}>
                <span
                  className={`border ${filterCategory === val && "bg-slate-500 text-white font-semibold"} border-slate-500 rounded-full py-1 px-4 cursor-pointer`}
                  onClick={() => {updateCategory(val); console.log(val)}}
                >
                  {val}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full h-screen md:grid md:grid-cols-3 xl:grid-cols-5 grid-rows-3 items-center gap-3 space-y-5 md:space-y-0">
          {printArticleList()}
        </div>
      </section>
    </main>
  );
};

export default Home;
