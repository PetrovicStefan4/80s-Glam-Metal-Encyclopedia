import { NextApiRequest, NextApiResponse } from 'next'
import Band from '../../../models/Band'

const BandPage = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id },
    method
  } = req

  switch (method) {
    case 'GET':
      try {
        const band = await Band.findById(id)

        if (!band) {
          console.log('Band with this ID doesn’t exists')
          return res.status(400).json({
            success: false
          })
        }

        res.status(200).json(band)
      } catch (error) {
        console.error(error)

        res.status(400).json({ success: false })
      }
      break

    case 'PUT':
      try {
        const data = req.body

        const band = await Band.findByIdAndUpdate(id, data, {
          new: true,
          runValidators: true
        })

        if (!band) {
          console.log('Can`t update informations for Band with this ID')

          return res.status(400).json({ success: false })
        }

        res.status(200).json(band)
      } catch (error) {
        console.error
        res.status(400).json({ success: false, message: error })
      }
      break

    case 'DELETE':
      try {
        const deletedBand = await Band.deleteOne({ _id: id })

      
        if (!deletedBand) {
          console.log('Band with this ID doesn’t exists')
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

export default BandPage
