import { useState, useRef } from "react";

const WebcamComponent: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState<string | null>(null);

  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      setError("Failed to access webcam: ");
    }
  };

  return (
    <div className="flex flex-row">
      <button className="text-white" onClick={startWebcam}>
        Turn on Webcam
      </button>
      {error && <p>{error}</p>}
      <video className="w-10 h-10" ref={videoRef} autoPlay muted />
    </div>
  );
};

export default WebcamComponent;
