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
      <button
        className="text-[#51586C] text-lg font-semibold"
        onClick={startWebcam}
      >
        Take a photo with your webcam
      </button>
      {error && <p>{error}</p>}
      <video className="w-10 h-10" ref={videoRef} autoPlay muted />
    </div>
  );
};

export default WebcamComponent;
