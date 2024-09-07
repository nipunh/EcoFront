import React from 'react'
import Menu from './Menu';
import { Button } from "@/components/ui/button"


const PrevBase = ({
    className = "text-white p-4",
    children, title, description
}) => {
    return (
        
            <div className="bg-background">
                <Menu />
                <div className="">
                <div className = "text-black text-center ">
                    <h3 className="display-4 ">{title}</h3>
                    <p className="lead mb-5">{description}</p>
                    <div className={className}>{children}</div>
                    </div>                
                
            {/* <footer className="footer bg-dark mt-auto py-3">
                <div className=" bg-secondary text-white text-center py-3">
                    <h4> If you've any doubts feel free to ask!</h4>
                    <Button>Contact Us</Button>
                </div>
            </footer> */}
        </div>
        </div>   
    )
}

export default PrevBase; 