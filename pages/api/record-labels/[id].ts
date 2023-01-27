import { NextApiRequest, NextApiResponse } from 'next'
import RecordLabel from '../../../models/RecordLabel'

const RecordLabelPage = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id },
    method
  } = req

  switch (method) {
    case 'GET':
      try {
        const recordLabel = await RecordLabel.findById(id)

        if (!recordLabel) {
          console.log('RecordLabel with this ID doesn’t exists')
          return res.status(400).json({
            success: false
          })
        }

        res.status(200).json(recordLabel)
      } catch (error) {
        console.error(error)

        res.status(400).json({ success: false })
      }
      break

    case 'PUT':
      try {
        const data = req.body

        const recordLabel = await RecordLabel.findByIdAndUpdate(id, data, {
          new: true,
          runValidators: true
        })

        if (!recordLabel) {
          console.log('Can`t update informations for RecordLabel with this ID')

          return res.status(400).json({ success: false })
        }

        res.status(200).json(recordLabel)
      } catch (error) {
        console.error
        res.status(400).json({ success: false, message: error })
      }
      break

    case 'DELETE':
      try {
        const deletedRecordLabel = await RecordLabel.deleteOne({ _id: id })

        if (!deletedRecordLabel) {
          console.log('RecordLabel with this ID doesn’t exists')
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

export default RecordLabelPage
