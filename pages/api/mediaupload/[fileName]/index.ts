// everything used to alter images

import { NextApiRequest, NextApiResponse } from 'next'
import { db } from '@/src/lib/db'
import { withMethods } from '@/src/lib/apiMiddlewares/withMethods'
import { withAuthentication } from '@/src/lib/apiMiddlewares/withAuthentication'
import { authOptions } from '@/src/lib/auth'
import { z } from 'zod'
import { getServerSession } from 'next-auth'
import * as minio from 'minio'

async function generatePresignedUrl(
  method: string,
  fileName: string,
  minioClient: minio.Client,
  bucketName: string,
): Promise<string> {
  return new Promise((resolve, reject) => {
    minioClient.presignedUrl(method, bucketName, fileName, (err, url) => {
      if (err) {
        reject(err)
      }
      resolve(url)
    })
  })
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    let media
    const session = await getServerSession(req, res, authOptions)
    const userid = session?.user.id
    if (req.method === 'POST') {
      media = await db.media.create({
        data: {
          ...req.body,
        },
      })

      res.json(media)
      return res.end()
    }

    if (req.method === 'DELETE') {
      const fileName = req.body.mediaId + '.' + req.query.fileName
      media = await db.media.delete({
        where: { id: req.body.mediaId as string },
      })
      const minioClient = new minio.Client({
        endPoint: process.env.S3_ENDPOINT!,
        port: parseInt(process.env.S3_PORT!),
        useSSL: process.env.S3_USE_SSL === 'true'!,
        accessKey: process.env.S3_ACCESS_KEY!,
        secretKey: process.env.S3_SECRET_KEY!,
      })
      minioClient.removeObject(
        process.env.S3_BUCKET_NAME!,
        `${fileName}`,
        err => {
          if (err) {
            console.log(err)
          }
        },
      )
    }

    if (req.method === 'PUT') {
      const mediaId = req.query.mediaId as string

      const updatedContent = await db.media.update({
        where: { id: mediaId },
        data: { ...req.body, options: req.body.options ?? {} },
      })

      res.json(updatedContent)

      return res.end()
    }

    res.json(media)
    return res.end()
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(422).json(error.issues)
    }

    return res.status(422).json(error.message)
  }
}

export default withMethods(
  ['POST', 'DELETE', 'GET'],
  withAuthentication(handler),
)
