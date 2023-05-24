import { v2 as _cloudinary } from 'cloudinary'

const cloudinary = () => {
  const config = useRuntimeConfig()
  _cloudinary.config({
    cloud_name: config.cloudinaryCloudName,
    api_key: config.cloudinaryApiKey,
    api_secret: config.cloudinaryApiSecret
  });
  return _cloudinary
}

/**
 *
 * {                                                                                                                                                       20:40:22
  asset_id: '0545ee49eed174686aac6785accbf76c',
  public_id: 'yx51zahf2gee8ry1ruea',
  version: 1684932022,
  version_id: '3a9b67887a05270ec3c3b99d67c7e99f',
  signature: 'e4cb2f80a3191ad3a73273172c3fe528bc925e0c',
  width: 192,
  height: 192,
  format: 'png',
  resource_type: 'image',
  created_at: '2023-05-24T12:40:22Z',
  tags: [],
  bytes: 6003,
  type: 'upload',
  etag: '7bb5ecaaad789f1df9a55883b1bcbbcd',
  placeholder: false,
  url: 'http://res.cloudinary.com/dv2o5ymsg/image/upload/v1684932022/yx51zahf2gee8ry1ruea.png',
  secure_url: 'https://res.cloudinary.com/dv2o5ymsg/image/upload/v1684932022/yx51zahf2gee8ry1ruea.png',
  folder: '',
  original_filename: 'fc7fa9bd007bbd4e0352d1600',
  api_key: '944614268552174'
}
 */
export const uploadToCloudinary = (image) => {
  return new Promise((resolve, reject) => {
    cloudinary().uploader.upload(image, (error, data) => {
      if (error) {
        console.error('cloudinary error', error);
        reject(error)
      }
      resolve(data)
    })
  })
}
