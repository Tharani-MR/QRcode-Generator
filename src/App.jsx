import { useState } from "react";
import QRcode from "qrcode";
import "./App.css";

function App() {

  const [url, setUrl] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  async function generateQR() {

    if (!url.trim()) {
      setErr("Please enter URL");
      return;
    }

    setErr("");
    setLoading(true);

    try {
      const qr = await QRcode.toDataURL(url);
      setQrCode(qr);
    } catch (error) {
      console.error("Error generating QR:", error);
    } finally {
      setLoading(false);
    }
    setUrl("");
  }

  return (
    <div className="outer-container">

      <h2>QR Code Generator</h2>

      <div className="inner-container">

        {loading && (
          <p>Please wait... your QR code is being generated.</p>
        )}

        {qrCode && (
          <img src={qrCode} alt="QR Code" className="qr-image" />
        )}

        <form
          className="input-container"
          onSubmit={(e) => {
            e.preventDefault();
            generateQR();
          }}
        >

          {err && <p className="error">{err}</p>}

          <input
            type="text"
            placeholder="Enter URL here"
            value={url}
            className={err ? "error" : ""}
            onChange={(e) => {
              setUrl(e.target.value);
              setErr("");
            }}
          />

          <button type="submit">
            Generate QR Code
          </button>

        </form>

        {qrCode && (
          <a href={qrCode} download="qrcode.png">
            <button className="download-btn">
              Download QR Code
            </button>
          </a>
        )}

      </div>

    </div>
  );
}

export default App;