import React, {useState} from 'react'
import { Base } from '../core/Base'
import { Link } from 'react-router-dom'
import { signup } from '../auth/helper'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
 


const Signup = () => {

   const [values, setValues] = useState({
        name: "",
        email : "",
        password : "",
        error: "",
        loading : false,
        success: false
});

    const {name, email, password, error, loading, success} = values;

    const handleChange = name => event =>{
        setValues({...values, error: false, [name]: event.target.value})
    };

    const onSubmit = event => {
        event.preventDefault();
        setValues({...values, error: false, loading:true})
        signup({name, email, password})
        .then(data => {
            console.log(data);
            if(data?.error){
                setValues({...values, error: data.error, success: false, loading:false})
            }
            else{
                setValues({
                    ...values,
                    name: "",
                    email : "",
                    password : "",
                    error: "",
                    success: true,
                })
            }
        })
        .catch(console.log("Error in signUp process."))
        
    }

    const signUpForm = () => {

    //     return(

    //         <Card className="mx-auto max-w-sm">
    //   <CardHeader>
    //     <CardTitle className="text-xl">Sign Up</CardTitle>
    //     <CardDescription>
    //       Enter your information to create an account
    //     </CardDescription>
    //   </CardHeader>
    //   <CardContent>
    //     <div className="grid gap-4">
    //       <div className="grid grid-cols-2 gap-4">
    //         <div className="grid gap-2">
    //           <Label htmlFor="first-name">First name</Label>
    //           <Input id="first-name" placeholder="Max" required />
    //         </div>
    //         <div className="grid gap-2">
    //           <Label htmlFor="last-name">Last name</Label>
    //           <Input id="last-name" placeholder="Robinson" required />
    //         </div>
    //       </div>
    //       <div className="grid gap-2">
    //         <Label htmlFor="email">Email</Label>
    //         <Input
    //           id="email"
    //           type="email"
    //           placeholder="m@example.com"
    //           required
    //         />
    //       </div>
    //       <div className="grid gap-2">
    //         <Label htmlFor="password">Password</Label>
    //         <Input id="password" type="password" />
    //       </div>
    //       <Button type="submit" className="w-full">
    //         Create an account
    //       </Button>
    //       <Button variant="outline" className="w-full">
    //         Sign up with GitHub
    //       </Button>
    //     </div>
    //     <div className="mt-4 text-center text-sm">
    //       Already have an account?{" "}
    //       <Link to="/signin" className="underline">
    //         Sign in
    //       </Link>
    //     </div>
    //   </CardContent>
    // </Card>

        //         <Row className="container-fluid my-5 py-4"> 
        //             <Col className="border rounded p-lg-4 shadow-lg" lg={{ span: 4, offset: 4 }} sm={{span :12 }} md= {{span:7, offset:2}}>       
        //             <h3 className="text-dark">SignUp</h3>
        //             <Form className="mt-3 p-2" variant="light">
        //         <Form.Group>
        //                 <Form.Label className="float-left text-dark">Name </Form.Label>
        //                 <Form.Control 
        //                     type="text" 
        //                     className="form-control" 
        //                     onChange={handleChange("name")} 
        //                     value={name}
        //                 />
        //         </Form.Group>
        //         <Form.Group >
        //                 <Form.Label className="float-left text-dark">Email </Form.Label>
        //                 <Form.Control 
        //                     type="email" 
        //                     placeholder="xyz@abc.com" 
        //                     required
        //                     id="email"
        //                     onChange = {handleChange("email")}
        //                     value = {email}
        //                 />
        //         </Form.Group>
        //         <Form.Group >
        //                 <Form.Label className="float-left text-dark">Password </Form.Label>
        //                 <Form.Control 
        //                     type="password" 
        //                     placeholder="Password" 
        //                     onChange = {handleChange("password")}
        //                     value = {password}
        //                 />
        //         </Form.Group>
        // <Button 
        // className="btn btn-success btn-block rounded my-4"
        //     type="submit"
        //     onClick = {onSubmit}
        // >
        // SignUp
        // </Button>


        //     </Form>
        //     </Col>
        // </Row>   
        // )
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left border rounded">
                <h3 className="text-center mt-4">Sign Up</h3>
                <form className="m-3 p-2">
                    <div className="form-group">
                         <label  className="form-group">Name</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            onChange={handleChange("name")} 
                            placeholder=" Enter Your Name" 
                            value={name}
                        />
                   </div>

                    <div className="form-group ">
                         <label  className="form-group">Email</label> 
                         <input 
                            type="email" 
                            className="form-control" 
                            onChange={handleChange("email")}  
                            placeholder=" Enter Your Email Address"
                            value={email} 
                         />
                    </div>

                    <div className="form-group ">
                            <label className="form-group">Password</label>
                            <input 
                                type="password" 
                                className="form-control "
                                onChange={handleChange("password")}  
                                placeholder=""
                                value={password}
                            />
                    </div>

                    <div className="form-group form-center ">
                        <button type="button" onClick={onSubmit} className="btn btn-success btn-block">Sign Up</button>
                    </div>
                    
                    
                </form>
                </div>               
            </div>
            
        )
    };

    const successMessage = () =>{
        return(
            <div className="col-md-6 offset-sm-3 text-center">
        <div className="alert alert-success "
            style={{display: success ? "" : "none"}}>
                New account created successfully. Please
                <Link to="/signin"> Login here.</Link>
        </div>
        </div>
        );
    };

    const errorMessage = () =>{
        return(
            <div className="col-md-6 offset-sm-3 text-center">
        <div className="alert alert-success"
            style={{display: error ? "" : "none"}}>
                {error}
        </div>
        </div>
        );
    };

    const loadingMessage = () =>{
        return(
            loading && (
                <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
                </Spinner>
            )
        )
    };

    return (
        <Base>
            {successMessage()}
            {loadingMessage()}
            {errorMessage()}
            {signUpForm()} 
            {/* <p className="text-white text-center">{JSON.stringify(values)}</p> */}
        </Base>
    )
}

export default Signup;