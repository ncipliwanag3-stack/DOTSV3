import React, { useState, useEffect } from 'react';
import { X, QrCode } from 'lucide-react';

const QRScannerModal = ({ isOpen, onClose, onScan }) => {
    const [scanning, setScanning] = useState(true);
    const [scannedData, setScannedData] = useState('');

    useEffect(() => {
        if (isOpen) {
            setScanning(true);
            // Simulate QR scanning
            const timer = setTimeout(() => {
                setScannedData('NCIP-2024-001');
                setScanning(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleConfirm = () => {
        onScan(scannedData);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <X size={24} />
                </button>

                <div className="text-center mb-6">
                    <h3 className="text-xl font-semibold text-gray-800">QR Scanner</h3>
                    <p className="text-sm text-gray-600">Scan the QR code on the document</p>
                </div>

                <div className="aspect-square bg-gray-100 rounded-xl flex items-center justify-center relative overflow-hidden">
                    {scanning ? (
                        <>
                            <div className="absolute inset-0 bg-black/5"></div>
                            <div className="w-48 h-48 border-4 border-amber-800 rounded-lg animate-pulse">
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                    <div className="w-8 h-8 border-4 border-amber-800 border-t-transparent rounded-full animate-spin"></div>
                                </div>
                            </div>
                            <p className="absolute bottom-4 text-xs text-gray-500 bg-white px-3 py-1 rounded-full">
                                Scanning...
                            </p>
                        </>
                    ) : (
                        <div className="text-center">
                            <QrCode size={64} className="text-amber-800 mx-auto mb-4" />
                            <p className="text-lg font-semibold text-gray-800">QR Code Detected!</p>
                            <p className="text-sm text-gray-600">Data: {scannedData}</p>
                        </div>
                    )}
                </div>

                {!scanning && (
                    <div className="mt-6 flex space-x-3">
                        <button
                            onClick={onClose}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleConfirm}
                            className="flex-1 px-4 py-2 bg-amber-800 text-white rounded-lg hover:bg-amber-900 transition-colors"
                        >
                            Confirm
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default QRScannerModal;