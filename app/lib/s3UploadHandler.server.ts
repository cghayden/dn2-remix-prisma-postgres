// import { PassThrough, Readable } from 'stream'
// import https from 'https'
// import { writeAsyncIterableToWritable } from '@remix-run/node'
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import type { UploadHandler } from '@remix-run/node'
import axios from 'axios'

// const { STORAGE_ACCESS_KEY, STORAGE_SECRET, STORAGE_REGION, STORAGE_BUCKET } =
//   process.env

// if (
//   !(STORAGE_ACCESS_KEY && STORAGE_SECRET && STORAGE_REGION && STORAGE_BUCKET)
// ) {
//   throw new Error(`Storage is missing required configuration.`)
// }

// const uploadStream = ({ Key }: Pick<AWS.S3.Types.PutObjectRequest, 'Key'>) => {
//   const s3 = new AWS.S3({
//     credentials: {
//       accessKeyId: STORAGE_ACCESS_KEY,
//       secretAccessKey: STORAGE_SECRET,
//     },
//     region: STORAGE_REGION,
//   })
//   const pass = new PassThrough()
//   return {
//     writeStream: pass,
//     promise: s3.upload({ Bucket: STORAGE_BUCKET, Key, Body: pass }).promise(),
//   }
// }

// export async function uploadStreamToS3(data: any, filename: string) {
//   // const stream = uploadStream({
//   //   Key: filename,
//   // })
//   await writeAsyncIterableToWritable(data, stream.writeStream)
//   const file = await stream.promise
//   return file.Location
// }

export const s3UploadHandler: UploadHandler = async ({
  name,
  filename,
  data,
}) => {
  console.log('data', data)
  console.log('filename', filename)
  console.log('name', name)
  if (name !== 'img') {
    return undefined
  }

  const client = new S3Client({
    credentials: {
      accessKeyId: process.env.STORAGE_ACCESS_KEY!,
      secretAccessKey: process.env.STORAGE_SECRET!,
    },
    region: process.env.STORAGE_REGION,
  })

  const presignedUrl = await getSignedUrl(
    client,
    new PutObjectCommand({
      Bucket: 'dancernotes',
      Key: 'filename456',
      ContentType: 'image/jpeg',
    })
  )
  const res = await axios.put(presignedUrl, data).catch((err) => {
    console.log(err)
    throw new Error(err)
  })
  console.log('res', res)
  console.log('presignedUrl', presignedUrl)

  // try {
  //   const stream = Readable.from(data) // Convert async iterable to a readable stream

  //   const res = await fetch(presignedUrl, {
  //     method: 'PUT',
  //     headers: {
  //       'Content-Type': 'image/jpeg', // Adjust the content type as needed
  //     },
  //     body: stream, // data is a stream here
  //   })

  //   if (!res.ok) {
  //     throw new Error(`Failed to upload file: ${res.statusText}`)
  //   }

  //   console.log('File uploaded successfully')
  //   console.log('res', res)
  //   // return res
  // } catch (error) {
  //   console.error('Error uploading file:', error)
  // }

  // const uploadedFileLocation = await uploadStreamToS3(data, filename!)
  // return uploadedFileLocation
}

// export const myUploadHandler: UploadHandler = async ({
//   name,
//   filename,
//   data,
// }) => {
//   console.log('data', data)
//   console.log('filename', filename)
//   console.log('name', name)
// }

// const client = new S3Client({
//   credentials: {
//     accessKeyId: process.env.STORAGE_ACCESS_KEY!,
//     secretAccessKey: process.env.STORAGE_SECRET!,
//   },
//   region: process.env.STORAGE_REGION,
// })

// //get presigned url
// const presignedUrl = await getSignedUrl(
//   client,
//   new PutObjectCommand({
//     Bucket: 'dancernotes',
//     Key: 'filename123',
//     ContentType: 'image/jpeg',
//   })
// )
// console.log('presignedUrl', presignedUrl)
