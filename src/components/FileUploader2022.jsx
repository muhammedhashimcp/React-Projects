import { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import storage from '../config/firebaseConfig';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
	'pdfjs-dist/build/pdf.worker.min.js',
	import.meta.url,
).toString();

function FileUploader2022() {
	const [selectedFile, setSelectedFile] = useState(null);
	const [file, setFile] = useState('');
	const [percent, setPercent] = useState(0);
	const [fileType, setFileType] = useState(null);
	const [numPages, setNumPages] = useState(null);
	const [pageNumber, setPageNumber] = useState(1);

	function handleChange(event) {
		const fileSelected = event.target.files[0];
		if (fileSelected) {
			setFile(fileSelected);
			const reader = new FileReader();
			reader.onloadend = () => {
				const dataURL = reader.result;
				setSelectedFile(dataURL);
				// Extract the MIME type
				const mimeType = dataURL.split(',')[0].split(':')[1].split(';')[0];
				if (mimeType === 'application/pdf') {
					setFileType('PDF');
				} else {
					setFileType('IMG');
				}
			};
			reader.readAsDataURL(fileSelected);
		}
	}

	const handleUpload = () => {
		if (!file) {
			alert('Please upload a file first!');
			return;
		}
		const storageRef = ref(storage, `/files/${file.name}`);
		const uploadTask = uploadBytesResumable(storageRef, file);
		uploadTask.on(
			'state_changed',
			(snapshot) => {
				const percent = Math.round(
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100
				);
				setPercent(percent);
			},
			(err) => {
				// Handle upload error
				console.log(err);
				alert('An error occurred during upload. Please try again.');
			},
			() => {
				// Upload completed, get download URL
				getDownloadURL(uploadTask.snapshot.ref).then((url) => {
					console.log(url);
				});
			}
		);
	};

	function onDocumentLoadSuccess({ numPages }) {
		setNumPages(numPages);
	}

	return (
		<div>
			<input type="file" onChange={handleChange} accept=".pdf,.png,.jpeg ,.svg" />
			{selectedFile && (
				<div className="file-preview">
					<h3>File Preview</h3>
					{fileType === 'IMG' && (
						<div className="image-preview">
							<img src={selectedFile} alt="Uploaded File" />
						</div>
					)}
					{fileType === 'PDF' && (
						<div className="pdf-preview">
							<Document file={selectedFile} onLoadSuccess={onDocumentLoadSuccess}>
								<Page pageNumber={pageNumber} />
							</Document>
							{numPages && (
								<p>
									Page {pageNumber} of {numPages}
								</p>
							)}
							<div className="pagination-buttons">
								<button onClick={() => setPageNumber(pageNumber - 1)}>Change Page -</button>
								<button onClick={() => setPageNumber(pageNumber + 1)}>Change Page +</button>
							</div>
						</div>
					)}
				</div>
			)}

			<button onClick={handleUpload}>Upload to Firebase</button>
			<p>{percent}% done</p>
		</div>
	);
}

export default FileUploader2022;
