import axios from "axios";

class UploadAdapter {
  private loader: any;
  private url: string;
  private apiKey: string;

  constructor(loader: any) {
    this.loader = loader;
    this.url = "https://api.imgbb.com/1/upload";
    this.apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY || "";
  }

  upload() {
    return this.loader.file.then(
      (file: File) =>
        new Promise((resolve, reject) => {
          const data = new FormData();
          data.append("image", file);
          data.append("key", this.apiKey);

          axios
            .post(this.url, data)
            .then((response) => {
              resolve({
                default: response.data.data.url,
              });
            })
            .catch((error) => {
              reject(error);
            });
        })
    );
  }

  abort() {}
}

export default UploadAdapter;
