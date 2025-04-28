import { useState, useEffect } from 'react';

/**
 * Custom React Hook to convert an image URL into a Base64-encoded string.
 * @param {string} url - The URL of the image to be converted.
 * @returns {string|null} - Base64 encoded image string, or null if not yet loaded.
 */
const useBase64Image = (url) => {
    const [data, setData] = useState(null); // State to store the Base64 data

    useEffect(() => {
        let cancelled = false; // Flag to avoid setting state on unmounted component

        (async () => {
            // Fetch the image as a Blob
            const res = await fetch(url);
            const blob = await res.blob();

            // Use FileReader to convert Blob to Base64
            const reader = new FileReader();
            reader.onloadend = () => {
                // Only update state if the component is still mounted
                if (!cancelled) setData(reader.result);
            };
            reader.readAsDataURL(blob);
        })();

        // Cleanup function to prevent memory leaks if the component unmounts
        return () => { cancelled = true; };
    }, [url]); // Re-run if the URL changes

    return data; // Return the Base64-encoded image
}

export default useBase64Image;

// import { useState, useEffect } from 'react';

// const useBase64Image = (url) => {
//     const [data, setData] = useState(null);
//     useEffect(() => {
//         let cancelled = false;
//         (async () => {
//             const res = await fetch(url);
//             const blob = await res.blob();
//             const reader = new FileReader();
//             reader.onloadend = () => {
//                 if (!cancelled) setData(reader.result);
//             };
//             reader.readAsDataURL(blob);
//         })();
//         return () => { cancelled = true; };
//     }, [url]);
//     return data;
// }

// export default useBase64Image;