import React from 'react'
import {motion} from 'framer-motion'
import Card from './Card'
import "../../styles/product.scss"

const Products = () => {
    return (
        <div className="main-products bg-grid-white/[0.01] ">
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "circInOut" }}
                viewport={{ once: true }}
                className="product-heading">Product <span>Suite</span></motion.h1>
            <div className="py-8 flex justify-center flex-wrap w-[70%] mx-auto gap-12">
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <div className="gradient-container"></div>
            </div>
           
        </div>
    )
}

export default Products
