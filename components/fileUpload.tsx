import React, { useState } from "react";
import { uploadImage } from "../api/assets";
import Icon from "./icon";
import Modal from "./modal";
import Spinner from "./spinner";

type FileUploadProps = {
  editable: boolean;
  imageUrl: string;
  onSuccess: Function;
  imageClassName: string;
};

const FileUpload = (props: FileUploadProps) => {
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (image) {
      setLoading(true);
      const data = new FormData();
      data.append("files", image);
      uploadImage(data)
        .then((res) => {
          if (res && res.length) {
            return props.onSuccess(res[0].id);
          }
        })
        .then(() => {
          setImage(null);
          setLoading(false);
        })
        .catch((e) => {
          console.error(e);
          setImage(null);
          setLoading(false);
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

  const renderUpload = () => {
    return (
      <a className="absolute -top-4 -right-4 p-2 text-primary border-primary border-2 bg-white rounded-full cursor-pointer hover:bg-primary hover:text-white">
        <label>
          <div className="h-6 w-6 cursor-pointer">
            <Icon type="camera" />
          </div>
          <input onChange={handleChange} type="file" className="hidden" />
        </label>
      </a>
    );
  };
  return (
    <>
      <div className="inline-block relative">
        <img
          src={image ? URL.createObjectURL(image) : props.imageUrl}
          alt="placeholder"
          className={props.imageClassName}
        ></img>
        {loading && (
          <div className="absolute left-1/2 -ml-8 top-1/2 mt-8">
            <Spinner />
          </div>
        )}
        {props.editable && !loading && !image && renderUpload()}
        {image && (
          <>
            <a
              className="absolute -top-5 -right-5 p-2 border-2 border-green-500 text-white bg-green-500 rounded-full cursor-pointer hover:border-green-500 hover:bg-white hover:text-green-500"
              onClick={handleSubmit}
            >
              <div className="h-6 w-6 cursor-pointer">
                <Icon type="save" />
              </div>
            </a>
            <a
              className="absolute -top-5 -left-3 p-2 border-2 border-red-500 text-white bg-red-500 hover:border-red-500 hover:bg-white hover:text-red-500 rounded-full cursor-pointer"
              onClick={() => setImage(null)}
            >
              <div className="h-6 w-6 cursor-pointer">
                <Icon type="delete" />
              </div>
            </a>
          </>
        )}
      </div>
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
