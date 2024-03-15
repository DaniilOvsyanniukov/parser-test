import express from 'express'
import { getArticles, createArticle, updateArticle, deleteArticle, getArticle } from '../controllers/articleController'

const router = express.Router()

router.get('/', getArticles)
router.post('/', createArticle)
router.get('/:id', getArticle)
router.put('/:id', updateArticle)
router.delete('/:id', deleteArticle)

export default router
