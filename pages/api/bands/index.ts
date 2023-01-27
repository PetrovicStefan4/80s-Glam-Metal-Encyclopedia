import dbConnect from '../../../utils/dbConnect'
import { NextApiRequest, NextApiResponse } from 'next'
import Band from '../../../models/Band'

const BandsRequests = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect()

  const { method, query } = req

  var page = parseInt(query.page as string) || 1

  switch (method) {
    case 'GET':
      try {
        
        const options = {
          page: page,
          limit: 15,
          collation: {
            locale: 'en'
          },
          sort: query.name === 'desc' ? query.name : { name: 'asc' },
        }

        const bands = await Band.paginate({}, options)

        res.status(200).json(bands)
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
        const bands = await Band.create(data)

        res.status(201).json(bands)
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

export default BandsRequests
