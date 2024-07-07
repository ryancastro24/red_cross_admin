import { createUploadthing, UploadThingError } from "uploadthing/next"

const f = createUploadthing();



// FileRouter for your app, can contain multiple FileRoutes
const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: "4MB" } })
   
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.userId);

      console.log("file url", file.url);


      console.log("i will create a mongogdb user connection here")

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId };
    }),

  pdfUploader: f({ pdf: { maxFileSize: "4MB" } })
   
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete PDF FILE:", metadata.userId);

      console.log("file url", file.url);


      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId };
    }),
};








export const OurFileRouter = ourFileRouter;




console.log(OurFileRouter);