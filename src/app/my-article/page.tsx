"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import { FaImage } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { apiCall } from "@/helper/apiCall";
import { useState } from "react";


import { toast } from "react-toastify";
import PostEditDialog from "./components/PostDialog";

const PostPage: React.FunctionComponent = () => {
  const router = useRouter();
  const articleContentRef = React.useRef<HTMLTextAreaElement>(null);
  const articleTitleRef = React.useRef<HTMLInputElement>(null);
  const articleThumbnailRef = React.useRef<HTMLInputElement>(null);
  const articleCategoryRef = React.useRef<string | null>(null);

  const [isDialog, setDialog] = useState(false)

  const [articleList, SetArticleList] = React.useState<any[]>([]);
  const [postSelected, SetPostSelected] = useState<any | null>(null);
  const [formData, setFormData] = useState({ title: "", content: "", thumbnail: "", category: "" })

  const getArticlesList = async () => {
    try {
      const res = await apiCall.get("/articles?pageSize=100&sortBy=%60created%60%20desc");
      SetArticleList(res.data)
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect hanya akan menjalankan fungsi didalamnya sekali saat pertama kali render halaman
  React.useEffect(() => {
    getArticlesList();
  }, []);




  const printPostsList = () => {
    return articleList.map((val: any, idx: number) => {
      return (
        <div
          key={val.objectId}
          className="w-full p-4 flex items-center rounded-md bg-white cursor-pointer"
        >

          <div className="w-full rounded-e-xl">
            <h4
              className="font-bold cursor-pointer"
              onClick={() => router.push(`/article/${val.title}`)}
            >
              {val.title}
            </h4>
            <div className="w-full flex items-center justify-between">
              <div className="flex text-xs items-center gap-4">
                <h6 className="text-xs font-thin">
                  {new Date(val.created).toLocaleString()}
                </h6>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm" onClick={() => deletePost(val.objectId)}>
                  Delete
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleDialog(val)}>
                  Edit
                </Button>

              </div>
            </div>
          </div>
        </div>
      );
    });
  };


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLAreaElement>) => {

    const { name, value } = e.target;

    setFormData(prevData => ({

      ...prevData, [name]: value,

    }));

  }

  const handleDialog = (obj: any) => {

    SetPostSelected(obj);

    setFormData({
      title: obj.title,
      content: obj.content,
      thumbnail: obj.thumbnail,
      category: obj.category,

    })

    setDialog(true);

  }

  const deletePost = async (idToDelete: any) => {

    try {

      const res = await apiCall.delete(`/articles/${idToDelete}`)
      // getArticlesList()
      SetArticleList(currentPosts =>
        currentPosts.filter(post => post.objectId !== idToDelete)) // .filter create new array,  filtering only data that meets the condition, so practically deleting ones that don't
      // alert("THe post has been deleted")
      toast.success("Delete post success", { autoClose: 3000 })
      // console.log(res.data)

    } catch (error) {
      console.log(error)
    }


  }

  const submitEdit = async () => {
    try {

      if (formData.title) {

        const res = await apiCall.put(`/articles/${postSelected.objectId}`, formData)
        // getArticlesList() // this actually update the list by sending the server the data then request the data from the server to re-list, which might affects performance 

        const updatedPost = res.data;

        SetArticleList(currentPosts =>
          currentPosts.map(post => post.objectId === updatedPost.objectId ? updatedPost : post))  // this one, 
        // it changes things locally after updating the data in server, and uses the same stored variable hence they are in sync
        // .map create new array, with each data being scanned and updated based on the condition and modification specified, which is good for updating or editing content
        // alert("THe post has been edited")
        toast.success("Post has been edited", { autoClose: 3000 })

        setDialog(false);

      }

    } catch (error) {

      console.log(error)
    }

    console.log(formData)

  }

  // const test = () => 


  const onCreateArticle = async () => {
    try {
      if (articleTitleRef.current) {
        const response = await apiCall.post("/articles", {
          title: articleTitleRef.current.value,
          category: articleCategoryRef.current,
          thumbnail: articleThumbnailRef.current?.value,
          content: articleContentRef.current?.value,
        });
        alert("Tambah data article berhasil");
        getArticlesList();
      } else {
        alert("Form article jangan sampai kosong");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (

    <div id="timeline" className="w-full md:flex gap-4">
      <div className="lg:w-1/2 items-center">
        <div className="w-full bg-white md:p-3 rounded-lg shadow-md">
          <input
            placeholder="Title"
            className="w-full p-3 rounded-md focus:outline-none"
            ref={articleTitleRef}
            type="text"
          />
          <div className="flex items-center">
            <input
              placeholder="Thumbnail URL"
              className="w-full p-3 rounded-md focus:outline-none"
              ref={articleThumbnailRef}
              type="text"
            />
            <Select
              onValueChange={(value) => (articleCategoryRef.current = value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Business">Business</SelectItem>
                <SelectItem value="Technology">Technology</SelectItem>
                <SelectItem value="Economics">Economics</SelectItem>
                <SelectItem value="Lifestyle">Lifestyle</SelectItem>
                <SelectItem value="Goverment">Goverment</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <textarea ref={articleContentRef} />
          <hr className="md:mb-4" />
          <div className="flex p-2 justify-between items-center">
            <div className="flex gap-2">
              <div>
                <FaImage size={24} color="#334156" />
              </div>
            </div>
            <Button
              type="button"
              className="bg-slate-700 text-white md:px-3 md:py-0.5 text-sm rounded-full shadow"
              onClick={onCreateArticle}
            >
              Post
            </Button>
          </div>
        </div>
      </div>
      <div className="lg:w-1/2 space-y-3">{printPostsList()}</div>
      <PostEditDialog isDialog={isDialog} setDialog={setDialog} formData={formData} setFormData={setFormData} handleInputChange={handleInputChange} submitEdit={submitEdit}></PostEditDialog>
    </div>
  );
};

export default PostPage;
