import passport from 'passport';
import {
    findAggregation,
    findById,
    createOne,
    deleteOne,
    updateOne
} from "../services/products.services.js";
import CustomError from "../errors/error.generator.js";
import { ErrorMessages } from "../errors/errors.enum.js";
import { authMiddleware } from '../middlewares/auth.middleware.js';

    export const findProductAggregation = async (req, res) => {
        try {
            const products = await findAggregation(req.query);
            res.status(200).json({ message: "Products found", products });
        } catch (error) {
            //res.status(500).json({ message: error.message });
            CustomError.generateError(
                ErrorMessages.CAN_NOT_FIND_AGGREGATION,
                500,
                ErrorMessages.CAN_NOT_FIND_AGGREGATION
            );
        }
    };
    
    export const findProductById = async (req, res) => {
        const { idProduct } = req.params;
        try {
            const product = await findById(idProduct);
            if (!product) {
                return res.status(404).json({ message: "No product found with that id" });
            }
            res.status(200).json({ message: "Product found", product });
        } catch (error) {
            //res.status(500).json({ message: error.message });
            CustomError.generateError(
                ErrorMessages.CAN_NOT_FIND_PRODUCT_BY_ID,
                500,
                ErrorMessages.CAN_NOT_FIND_PRODUCT_BY_ID
            );
        }
    };
    
    export const createProduct = async (req, res) => {
        passport.authenticate('jwt', { session: false })(req, res, async () =>{
            authMiddleware(['admin'])(req, res, async () => {
                const { title, description, code, price, stock } = req.body;
                if (!title || !description || !code || !price) {
                    return res.status(400).json({ message: "Required data is missing" });
                }
                try {
                    const newProduct = await createOne(req.body);
                    res.status(201).json({ message: "Product created", product: newProduct });
                } catch (error) {
                    //res.status(500).json({ message: error.message });
                    CustomError.generateError(
                        ErrorMessages.CAN_NOT_CREATE_PRODUCT,
                        500,
                        ErrorMessages.CAN_NOT_CREATE_PRODUCT
                    );
                }
            });
        });
    };
    
    export const deleteProduct = async (req, res) => {
        passport.authenticate('jwt', { session: false })(req, res, async () =>{
            authMiddleware(['admin'])(req, res, async () => {
                const { idProduct } = req.params;
                try {
                    if (!idProduct) {
                        return res.status(404).json({ message: "No product found with that id" });
                    }
                    await deleteOne(idProduct);
                    res.status(200).json({ message: "Product deleted" });
                } catch (error) {
                    //res.status(500).json({ message: error.message });
                    CustomError.generateError(
                        ErrorMessages.CAN_NOT_DELETE_PRODUCT,
                        500,
                        ErrorMessages.CAN_NOT_DELETE_PRODUCT
                    );
                }
            });
        });
    };
    

    export const updateProductById = async (req, res) =>{
        passport.authenticate('jwt', { session: false })(req, res, async () =>{
            authMiddleware(['admin'])(req, res, async () => {
                const { idProduct } = req.params;
                try {
                    if (!idProduct) {
                        return res.status(404).json({ message: "No product found with that id" });
                    }
                    await updateOne(idProduct);
                    res.status(200).json({ message: "Product updated" });
                } catch (error) {
                    //res.status(500).json({ message: error.message });
                    CustomError.generateError(
                        ErrorMessages.CAN_NOT_UPDATE_PRODUCT,
                        500,
                        ErrorMessages.CAN_NOT_UPDATE_PRODUCT
                    );
                }
            });
        });
    };