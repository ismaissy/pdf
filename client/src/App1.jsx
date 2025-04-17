import React, { useState } from "react";
import { PDFDownloadLink, pdf } from "@react-pdf/renderer";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import jpgImage from './1.jpg';

import MyDocument from "./MyDocument";

const App = () => {
  const person = {
    firstName: "dfjnvdjfk",
    lastName: "sdfvsdfvdfsvd",
    age: 40
  };
  const [blobUrl, setBlobUrl] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  const defaultPluginInstance = defaultLayoutPlugin(); // ✅ вызываем всегда

  const longText = `
 1 This is a very long text example to demonstrate PDF generation. This is a very long text example to demonstrate PDF generation. 
  `.repeat(50);
  //  2 This is a very long text example to demonstrate PDF generation.
  //  3 This is a very long text example to demonstrate PDF generation.

  const generateAndPreviewPdf = async () => {
    const docInstance = <MyDocument longText={longText} />;
    const blob = await pdf(docInstance).toBlob();
    const url = URL.createObjectURL(blob);
    setBlobUrl(url);
    setShowPreview(true);
  };

  return (
    <div>
      <h1>PDF генератор с превью</h1>
      <button onClick={generateAndPreviewPdf}>Превью PDF</button>

      {showPreview && blobUrl && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "#fff",
            zIndex: 1000,
          }}
        >
          <button
            onClick={() => {
              setShowPreview(false);
              URL.revokeObjectURL(blobUrl);
            }}
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              zIndex: 9999,
              background: "red",
              color: "white",
              padding: "5px 10px",
            }}
          >
            Закрыть
          </button>
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.0.279/build/pdf.worker.min.js">
            <Viewer fileUrl={blobUrl} plugins={[defaultPluginInstance]} />
          </Worker>
        </div>
      )}

      <PDFDownloadLink
        document={<MyDocument longText={longText} person={person} />}
        fileName="preview.pdf"
      >
        {({ loading }) =>
          loading ? "Генерация PDF..." : <button>Скачать PDF</button>
        }
      </PDFDownloadLink>
    </div>
  );
};

export default App;
