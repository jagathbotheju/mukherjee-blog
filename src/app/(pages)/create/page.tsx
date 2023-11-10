"use client";
import Container from "@/app/components/Container";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ChangeEvent, useState } from "react";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "@/utils/fbConfig";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import Spinner from "@/app/components/Spinner";
import axios from "axios";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createPostAction } from "@/utils/serverActions";

const fbApp = initializeApp(firebaseConfig);
const fbStorage = getStorage(fbApp, "gs://my-projects-d7fc1.appspot.com");

const formSchema = yup.object({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
});

interface FormData {
  title: string;
  description: string;
}

const CreatePost = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [imageLoading, setImageLoading] = useState(false);
  const [category, setCategory] = useState<string>("application");
  const [imageUrl, setImageUrl] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(formSchema),
    mode: "all",
  });

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
    console.log(e.target.value);
  };

  const createUniqueFileName = (fileName: string) => {
    const timeStamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 12);
    return `${fileName}-${timeStamp}-${randomString}`;
  };

  const handleImageSaveToFB = async (file: any) => {
    const uniqueFile = createUniqueFileName(file.name);
    const storageRef = ref(fbStorage, `blog/${uniqueFile}`);
    const uploadImage = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadImage.on(
        "state_changed",
        (snapshot) => {},
        (error) => reject(error),
        () => {
          getDownloadURL(uploadImage.snapshot.ref)
            .then((url) => resolve(url))
            .catch((error) => reject(error));
        }
      );
    });
  };

  const handleBlogImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setImageLoading(true);
    const file = e.target.files[0];
    const savedImageUrl = await handleImageSaveToFB(file);

    if (savedImageUrl !== "" && savedImageUrl) {
      setImageLoading(false);
      setImageUrl(savedImageUrl.toString());
    }
  };

  const handleFormSubmit = (data: FormData) => {
    const formData = {
      ...data,
      image: imageUrl,
      category,
      userid: session?.user?.id ?? "",
      userimage: session?.user?.image ?? "",
      username: session?.user?.name ?? "",
    };
    if (formData) {
      createPostAction(formData).then((response) => {
        if (response.success) {
          toast.success("Post added Successfully");
          router.push("/blogs");
          reset();
        } else {
          toast.error(response.message);
        }
      });
    }
  };

  return (
    <section className="py-8 md:py-10 lg:py-14">
      <Container>
        <h2 className="text-2xl font-bold mb-6">Create New Blog Post</h2>

        <form
          className="flex flex-col gap-2 w-2/3"
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          <div className="flex gap-3 items-center">
            <div className={`flex flex-col mb-4 `}>
              {/* image upload */}
              <label className="mb-1 font-medium whitespace-nowrap">
                Upload Blog Image
              </label>
              <div className="w-full rounded-md px-6 focus:border-primary input input-bordered">
                <input
                  id="fileInput"
                  accept="image/*"
                  type="file"
                  className="mt-2"
                  onChange={handleBlogImageChange}
                />
              </div>
            </div>
            {imageLoading && <Spinner />}
          </div>

          {/* title */}
          <label className="label -mb-3">
            <span className="label-text">Title</span>
          </label>
          <input
            type="text"
            className={`input input-bordered w-full mb-2 ${
              errors["title"] && "input-error"
            }`}
            {...register("title")}
          />
          {errors["title"] && (
            <p className="text-red-300 text-sm">{errors["title"].message}</p>
          )}

          {/* description */}
          <label className="label -mb-3">
            <span className="label-text">Description</span>
          </label>
          <textarea
            className={`textarea textarea-bordered w-full mb-2 textarea-lg ${
              errors["description"] && "input-error"
            }`}
            {...register("description")}
          />
          {errors["description"] && (
            <p className="text-red-300 text-sm">
              {errors["description"].message}
            </p>
          )}

          {/* category */}
          <label className="label -mb-3">
            <span className="label-text">Category</span>
          </label>
          <select
            onChange={handleCategoryChange}
            className="select select-bordered w-full max-w-xs"
          >
            <option value="application">Application</option>
            <option value="data">Data</option>
            <option value="software">Software</option>
            <option value="tech">Technology</option>
            <option value="science">Science</option>
          </select>

          <button className="btn btn-primary mt-10 w-fit">
            Create New Post
          </button>
        </form>
      </Container>
    </section>
  );
};

export default CreatePost;
