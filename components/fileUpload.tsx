import React, { useState } from "react";
import { uploadImage } from "../api/assets";
import Icon from "./icon";
import Modal from "./modal";

type FileUploadProps = {
  editable: boolean;
  imageUrl: string;
  onSuccess: Function;
  imageClassName: string;
};

const FileUpload = (props: FileUploadProps) => {
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (image) {
      const data = new FormData();
      data.append("files", image);
      uploadImage(data)
        .then((res) => {
          if (res && res.length) {
            return props.onSuccess(res[0].id);
          }
        })
        .then(() => setImage(null))
        .catch((e) => {
          console.error(e);
          setImage(null);
          setError(e);
          setShowModal(true);
        });
    }
  };

  const handleChange = (e: any) => {
    if (e.target.files && e.target.files.length) {
      setImage(e.target.files[0]);
    }
  };
  return (
    <>
      <div className="inline-block relative">
        <img
          src={image ? URL.createObjectURL(image) : props.imageUrl}
          alt="placeholder"
          className={props.imageClassName}
        ></img>
        {props.editable && (
          <a className="absolute w-full h-full flex flex-col justify-center items-center bg-black text-center top-0 opacity-0 hover:opacity-50 rounded-3xl md:rounded-none">
            <label className="mb-4">
              <span className="opacity-100 text-white cursor-pointer">
                <div className="h-20 w-20">
                  <Icon type="upload" />
                </div>
              </span>
              <input onChange={handleChange} type="file" className="hidden" />
            </label>
          </a>
        )}
      </div>
      {image && (
        <div className="absolute">
          <button
            className="bg-red-500 text-white p-2"
            onClick={() => setImage(null)}
          >
            <div className="h-6 w-6">
              <Icon type="delete" />
            </div>
          </button>
          <button
            className="bg-green-500 text-white p-2"
            onClick={handleSubmit}
          >
            <div className="h-6 w-6">
              <Icon type="save" />
            </div>
          </button>
        </div>
      )}
      {error && (
        <Modal
          headline="Error occcured"
          show={showModal}
          toggle={setShowModal}
          message="Something went wrong while uploading the image. Please try again. If it still does not work, contact us."
        />
      )}
    </>
  );
};

export default FileUpload;
