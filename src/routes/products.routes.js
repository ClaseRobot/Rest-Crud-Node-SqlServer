import {Router} from 'express';
import { 
    getProducts, 
    createNewProduct, 
    getProductById, 
    deleteProduct, 
    getTotalProducts,
    updateProduct,
 } from '../controllers/products.controller.js'; 

const router = Router()

router.get('/products', getProducts)

router.post('/products', createNewProduct)

router.get('/products/count', getTotalProducts)

router.get('/products/:id', getProductById)

router.delete('/products/:id', deleteProduct)

router.put('/products/:id', updateProduct)

export default router;