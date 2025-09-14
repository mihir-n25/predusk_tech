import React from 'react'
import "../../styles/product.scss"
import { Sparkles } from 'lucide-react'

const Card = () => {
    return (
        <div className="card">
            <div className="card-img" >
            <Sparkles className="w-full h-full text-blue-400" />
            </div>
            <div className="card-info">
                <p className="text-title">Mirofy SDK</p>
                <p className="text-body">Empowering developers to integrate
                    AI-Powered Interfaces in minutes , provides collaboration ,
                    automation and optimization.</p>
            </div>
        </div>
    )
}

export default Card
