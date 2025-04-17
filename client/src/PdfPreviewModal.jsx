import { useMemo } from 'react';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const PdfPreviewModal = ({ pdfData, show, onClose, onDownload }) => {
    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    const blobUrl = useMemo(() => {
        if (!pdfData) return null;
        return URL.createObjectURL(new Blob([pdfData], { type: 'application/pdf' }));
    }, [pdfData]);

    if (!show || !blobUrl) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0, left: 0, width: '100%', height: '100%',
            background: '#fff', zIndex: 1000, paddingTop: '40px'
        }}>
            <div style={{ position: 'absolute', top: 10, right: 10, zIndex: 999 }}>
                <button onClick={onClose} style={{ marginRight: 10 }}>Закрыть</button>
                <button onClick={onDownload}>Скачать</button>
            </div>
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.0.279/build/pdf.worker.min.js">
                <Viewer
                    fileUrl={blobUrl}
                    plugins={[defaultLayoutPluginInstance]}
                />
            </Worker>
        </div>
    );
};

export default PdfPreviewModal;
