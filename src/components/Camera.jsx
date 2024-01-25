import React, { useState, useEffect, useRef } from "react";

import { CameraIcon } from "@heroicons/react/24/outline";

function Camera(props) {
  const [stream, setStream] = useState(null);
  const [img, setImg] = useState(null);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    let stream;
    async function enableStream() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        });
        setStream(stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
      }
    }

    enableStream();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const captureImage = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (video && canvas) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext("2d");
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      // Image can be processed further from here
      setImg(canvas.toDataURL("image/jpeg"));
    }
  };

  // If no image, need to take picture
  return (
    <>
      <div
        className="relative h-full w-full"
        style={{ display: img ? "none" : "block" }}
      >
        <video
          ref={videoRef}
          playsInline
          autoPlay
          muted
          className="bg-black w-full h-full object-cover"
        ></video>

        <div className="flex fixed gap-4 justify-center bottom-0 left-0 w-full p-4">
          <button
            onClick={captureImage}
            className="bg-white text-black p-4 rounded-full"
          >
            <CameraIcon className="h-8 w-8 text-black" />
          </button>
        </div>

        <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
      </div>

      {img && (
        <div className="relative h-full w-full">
          <img
            src={img}
            alt="captured"
            className="bg-black w-full h-full object-cover"
          />

          <div className="flex fixed gap-4 justify-center bottom-0 left-0 w-full p-4">
            <button
              onClick={() => setImg(null)}
              className="bg-white text-black p-4 rounded-full"
            >
              Retake
            </button>
            <button
              onClick={() => {
                props.onNewImage(img.replace("data:image/jpeg;base64,", ""));
                setImg(null);
              }}
              className="bg-white text-black p-4 rounded-full"
            >
              Accept
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Camera;
