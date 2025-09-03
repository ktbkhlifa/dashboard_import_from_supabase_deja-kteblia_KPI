
import React, { useState, useCallback, useRef } from 'react';

declare const html2canvas: any;
declare const jspdf: any;

interface ExportButtonProps {
    elementIdToExport: string;
    fileName: string;
}

const ExportButton: React.FC<ExportButtonProps> = ({ elementIdToExport, fileName }) => {
    const [isExporting, setIsExporting] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const exportToPdf = useCallback(async () => {
        setIsExporting(true);
        const input = document.getElementById(elementIdToExport);
        if (!input) {
            console.error("Element to export not found!");
            setIsExporting(false);
            return;
        }

        try {
            const canvas = await html2canvas(input, {
                scale: 2,
                useCORS: true,
                backgroundColor: '#0f172a' // Dark background for better capture
            });
            const imgData = canvas.toDataURL('image/png');
            const { jsPDF } = jspdf;
            const pdf = new jsPDF({
                orientation: 'landscape',
                unit: 'px',
                format: [canvas.width, canvas.height]
            });

            pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
            pdf.save(`${fileName}.pdf`);
        } catch (error) {
            console.error("Error exporting to PDF:", error);
        } finally {
            setIsExporting(false);
        }
    }, [elementIdToExport, fileName]);

    return (
        <div className="relative inline-block text-left">
            <button
                onClick={exportToPdf}
                disabled={isExporting}
                className="inline-flex justify-center w-full rounded-md border border-slate-300 dark:border-slate-600 shadow-sm px-4 py-2 bg-white dark:bg-slate-700 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-100 dark:focus:ring-offset-slate-800 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isExporting ? 'Exporting...' : 'Export as PDF'}
                <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </button>
            <p className="text-xs text-slate-400 mt-1">Exports the current daily view.</p>
        </div>
    );
};

export default ExportButton;
