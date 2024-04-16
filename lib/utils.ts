import axios from "axios";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const uploadImage = async (imageFile: File | undefined) => {
  if (!imageFile){
    throw new Error("Error uploading image");
  }
  try {
    const formData = new FormData();
    formData.append("file", imageFile);

    const response = await axios.post(
      "/api/model/upload/cover_image",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    console.log("Image uploaded successfully:", response.data);

    return response.data;
  } catch (error) {
    // Handle errors
    console.error("Error uploading image:", error);
    throw new Error("Error uploading image");
  }
};