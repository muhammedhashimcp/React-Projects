// import { useState } from 'react';
// import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
// import storage from '../config/firebaseConfig';



// const FileUploader = () => {
// 	const [percent, setPercent] = useState(0);

// 	function handleUpload(file) {
// 		if (!file) {
// 			alert("Please choose a file first!")
// 		}

// 		const storageRef = ref(storage, `/files/${file.name}`)
// 		const uploadTask = uploadBytesResumable(storageRef, file);

// 		uploadTask.on(
// 			"state_changed",
// 			(snapshot) => {
// 				const percent = Math.round(
// 					(snapshot.bytesTransferred / snapshot.totalBytes) * 100
// 				);
// 				// update progress
// 				setPercent(percent);
// 			},
// 			(err) => console.log(err),
// 			() => {
// 				// download url
// 				getDownloadURL(uploadTask.snapshot.ref).then((url) => {
// 					console.log(url);
// 				});
// 			}
// 		);
// 	}

// 	return (
// 		<div>
// 			<h2>File Uploader</h2>
// 			<div>
// 				<input type="file" onChange={handleChange} accept="" />
// 				<button onClick={handleUpload}>Upload to Firebase</button>
// 				<p>{percent} "% done"</p>
// 			</div>
// 			<div>
// 				<input type="file" onChange={handleFileChange} />
// 				<input
// 					type="text"
// 					placeholder="Enter URL"
// 					onChange={handleUrlChange}
// 				/>
// 				<button onClick={handleUpload}>Upload</button>
// 			</div>
// 			{url && (
// 				<div>
// 					<h3>Image Preview</h3>
// 					<img
// 						src={url}
// 						alt="Uploaded File"
// 						style={{ width: '300px' }}
// 					/>
// 				</div>
// 			)}
// 		</div>
// 	);
// };

// export default FileUploader;
