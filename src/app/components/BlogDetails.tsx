"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Container from "./Container";
import { useState, useTransition } from "react";
import { useSession } from "next-auth/react";
import { addCommentAction } from "@/utils/serverActions";

interface Props {
  post: Blog;
}

const BlogDetails = ({ post }: Props) => {
  const router = useRouter();
  const [comment, setComment] = useState("");
  const { data: session } = useSession();
  const [isPending, startTransition] = useTransition();

  const handleCommentSave = () => {
    if (!comment) return;
    let newComments = [...post.comments];
    newComments.push(comment);

    startTransition(async () => {
      const updatedPost = await addCommentAction({
        id: post.id,
        comments: newComments,
      });
      console.log("updatedPost", updatedPost);
      setComment("");
      //router.refresh();
    });
  };

  return (
    <div className="flex my-10 flex-col">
      <Container>
        <div className="flex flex-col gap-5">
          <h2 className="text-3xl font-bold text-slate-800">{post.title}</h2>
          <div className="flex justify-between px-10">
            <div className="flex gap-5 items-center">
              <div className="avatar">
                <div className="w-14 rounded-full relative">
                  <Image src={post.userimage} alt="profile image" fill />
                </div>
              </div>
              <div className="flex flex-col">
                <p>By</p>
                <h3 className="text-xl font-bold">{post.username}</h3>
              </div>
            </div>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => router.push(`/category/${post.category}`)}
            >
              {post.category.toUpperCase()}
            </button>
          </div>
        </div>
        <div className="mt-2 bg-slate-400 h-[1px]"> </div>

        {/* image */}
        <div className="mt-8 aspect-[5/3] w-[600px] relative">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="rounded-md"
          />
        </div>
        <p className="mt-5 max-w-4xl text-justify">{post.description}</p>

        {/* comments */}
        <div className="flex flex-col mt-10 gap-4">
          <textarea
            className="textarea textarea-bordered max-w-4xl"
            placeholder="Add Comments"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            className="btn btn-secondary w-fit"
            onClick={handleCommentSave}
          >
            Add Comment
          </button>
        </div>

        {/* discussion */}
        {post.comments && post.comments.length ? (
          <div className="flex flex-col mt-8">
            <h2 className="text-3xl font-bold text-slate-800">
              Discussion ({post.comments.length})
            </h2>

            <div className="mt-8 flex flex-col gap-5">
              {post.comments.map((comment, index) => (
                <div
                  key={index}
                  className="border border-slate-300 p-5 rounded-md flex flex-col gap-4"
                >
                  <h3 className="font-bold">
                    {post.username}{" "}
                    {`${session?.user.id === post.userid && "(Author)"}`}
                  </h3>
                  <p>{comment}</p>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </Container>
    </div>
  );
};

export default BlogDetails;
