import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import UploadAdapter from "@/lib/uploadAdapter";

interface Props {
  content: string;
  setContent: (content: string) => void;
}
const CustomEditor = ({ content, setContent }: Props) => {
  const config: any = {
    extraPlugins: [MyCustomUploadAdapterPlugin],
    mediaEmbed: {
      previewsInData: true,
    },
  };

  function MyCustomUploadAdapterPlugin(editor: any) {
    editor.plugins.get("FileRepository").createUploadAdapter = (
      loader: any
    ) => {
      return new UploadAdapter(loader);
    };
  }

  return (
    <CKEditor
      editor={Editor}
      data={content}
      onReady={(editor: any) => {
        // You can store the "editor" and use when it is needed.
        console.log("Editor is ready to use!", editor);
      }}
      config={config}
      onChange={(event: any, editor: any) => {
        const data = editor.getData();
        setContent(data);
      }}
      onBlur={(event: any, editor: any) => {
        console.log("Blur.", editor);
      }}
      onFocus={(event: any, editor: any) => {
        console.log("Focus.", editor);
      }}
    />
  );
};

export default CustomEditor;
