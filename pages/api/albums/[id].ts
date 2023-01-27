import { NextApiRequest, NextApiResponse } from 'next'
import Album from '../../../models/Album'
import dbConnect from '../../../utils/dbConnect'

const AlbumPage = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect()

  const {
    query: { id },
    method
  } = req

  switch (method) {
    case 'GET':
      try {
        const album = await Album.findById(id);

        if (!album) {
          console.log('Album with this ID doesn’t exists')
          return res.status(400).json({
            success: false
          })
        }

        res.status(200).json(album)
      } catch (error) {
        console.error(error)

        res.status(400).json({ success: false })
      }
      break

    case 'PUT':
      try {
        const data = req.body

        const album = await Album.findByIdAndUpdate(id, data, {
          new: true,
          runValidators: true
        })

        if (!album) {
          console.log('Can`t update informations for Album with this ID')

          return res.status(400).json({ success: false })
        }

        res.status(200).json(album)
      } catch (error) {
        console.error
        res.status(400).json({ success: false, message: error })
      }
      break

    case 'DELETE':
      try {
        const deletedAlbum = await Album.deleteOne({ _id: id })

        if (!deletedAlbum) {
          console.log('Album with this ID doesn’t exists')
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: {} })
      } catch (error) {
        console.error
        return res.status(400).json({ success: false })
      }
      break

    default:
      break
  }
}

export default AlbumPage
