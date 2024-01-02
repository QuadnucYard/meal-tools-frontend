import api from "./request";

export async function uploadImage(image: Blob | File) {
  return await api.postForm<string, string>("/upload/image", { image });
}

export async function uploadImages(images: (Blob | File)[]) {
  return await api.postForm<string[], string[]>("/upload/images", { images });
}
