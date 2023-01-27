import dbConnect from '../../../utils/dbConnect'
import { NextApiRequest, NextApiResponse } from 'next'
import RecordLabel from '../../../models/RecordLabel'

const RecordLabelsRequests = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  await dbConnect()

  const { method, query } = req

  var page = parseInt(query.page as string) || 1

  switch (method) {
    case 'GET':
      try {
        const options = {
          page: page,
          limit: 100,
          collation: {
            locale: 'en'
          },
          sort: query.name === 'desc' ? query.name : { name: 'asc' }
        }

        const recordLabels = await RecordLabel.paginate({}, options)

        res.status(200).json(recordLabels)
      } catch (error) {
        console.error
        res.status(400).json({
          success: false
        })
      }
      break
    case 'POST':
      try {
        const stringifyData = JSON.stringify(req.body)
        const data = JSON.parse(stringifyData)
        const recordLabels = await RecordLabel.create(data)

        res.status(201).json(recordLabels)
      } catch (error) {
        console.error
        console.error(error)
        res.status(400).json({
          success: false,
          data: 'Error'
        })
      }
      break
    default:
      res.status(400).json({
        success: false
      })
      break
  }
}

export default RecordLabelsRequests
