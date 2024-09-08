import React, { useState } from 'react'
import { Base } from '../core/Base';
import { Redirect, Link } from 'react-router-dom';
import { signin, authenticate, isAuthenticated } from '../auth/helper';
// import { Input } from "@/components/ui/input"
// import FacebookLogin from 'react-facebook-login';
// import { GoogleLogin } from 'react-google-login'
// import {
//     Card,
//     CardContent,
//     CardDescription,
//     CardFooter,
//     CardHeader,
//     CardTitle,
// } from "@/components/ui/card"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const Signin = () => {

    const [values, setValues] = useState({
        email: "",
        password: "",
        error: "",
        loading: false,
        didRedirect: false,

    });

    const { email, password, error, loading, didRedirect } = values;
    const { user } = isAuthenticated();

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value })
    };

    const loadingMessage = () => {
        return (
            loading && (
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            )
        )
    };

    const errorMessage = () => {
        return (
            <div className="col-md-6 offset-sm-3 text-left">
                <div className="alert alert-success"
                    style={{ display: error ? "" : "none" }}>
                    {error}
                </div>
            </div>
        );
    };

    const onSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false, loading: true })
        signin({ email, password })
            .then(data => {
                console.log(data);
                if (data?.error) {
                    setValues({ ...values, error: data.error, loading: false })
                } else {
                    authenticate(data, () => {
                        setValues({
                            ...values,
                            didRedirect: true,
                        })
                    })
                }
            })
            .catch((err) => console.log(err))
    }

    const performRedirect = () => {
        if (didRedirect) {
            if (user && user.role === 1) {
                return <Redirect to="/admin/dashboard" />
            }
            else {
                return <Redirect to="/user/dashboard" />

            }
        }

        if (isAuthenticated()) {
            return <Redirect to="/" />;
        }
    };

    const signInForm = () => {
        return(

            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                <form >
                    <div className="form-group ">
                         <label  className="form-group">Email</label>
                         <input 
                         type="email" 
                         className="form-control "  
                         placeholder=" Enter Your Email Address" 
                         onChange = {handleChange("email")}
                         value = {email}
                         />
                    </div>

                    <div className="form-group ">
                        <label className="form-group">Password</label>
                        <input 
                        type="password" 
                        className="form-control" 
                        name="" 
                        id="" 
                        placeholder=""
                        onChange = {handleChange("password")}
                        value = {password}
                        />
                    </div>

                    <div className="form-group form-center ">
                        <button 
                        type="button" 
                        className="btn btn-success btn-block"
                        onClick = {onSubmit}

                        >Submit</button>
                    </div>


                </form>
                </div>               
            </div>

        )

        //Bootstrap UI
  //       return(
            
  //   <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
  //   <div className="flex items-center justify-center py-12">
  //     <div className="mx-auto grid w-[350px] gap-6">
  //       <div className="grid gap-2 text-center">
  //         <h1 className="text-3xl font-bold">Login</h1>
  //         <p className="text-balance text-muted-foreground">
  //           Enter your email below to login to your account
  //         </p>
  //       </div>
  //       <div className="grid gap-4">
  //         <div className="grid gap-2">
  //           <Label htmlFor="email">Email</Label>
  //           <Input
  //             id="email"
  //             type="email"
  //             placeholder="m@example.com"
  //             required
  //           />
  //         </div>
  //         <div className="grid gap-2">
  //           <div className="flex items-center">
  //             <Label htmlFor="password">Password</Label>
  //             {/* <Link
  //               href="/forgot-password"
  //               className="ml-auto inline-block text-sm underline"
  //             >
  //               Forgot your password?
  //             </Link> */}
  //           </div>
  //           <Input id="password" type="password" required />
  //         </div>
  //         <Button type="submit" className="w-full">
  //           Login
  //         </Button>
  //         <Button variant="outline" className="w-full">
  //           Login with Google
  //         </Button>
  //       </div>
  //       <div className="mt-4 text-center text-sm">
  //         Don&apos;t have an account?{" "}
  //         <Link href="#" className="underline">
  //           Sign up
  //         </Link>
  //       </div>
  //     </div>
  //   </div>
  //   <div className="hidden bg-muted lg:block">
  //     <img
  //       src="/placeholder.svg"
  //       alt="Image"
  //       width="1920"
  //       height="1080"
  //       className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
  //     />
  //   </div>
  // </div>
  //       )
        
        // (
            // <Card className="">
            //     <CardHeader>
            //         <CardTitle>Login</CardTitle>
            //         <CardDescription>Login to access all features</CardDescription>
            //     </CardHeader>
            //     <CardContent>
            //         <Form className="mt-3 p-2" variant="light">
            //             <Form.Group >
            //                 <Form.Label className="float-left text-dark">Email </Form.Label>
            //                 <Form.Control
            //                     type="email"
            //                     placeholder="xyz@abc.com"
            //                     required
            //                     id="email"
            //                     onChange={handleChange("email")}
            //                     value={email}
            //                 />
            //             </Form.Group>

            //             <Form.Group >
            //                 <Form.Label className="float-left text-dark">Password</Form.Label>
            //                 <Form.Control
            //                     type="password"
            //                     placeholder="Password"
            //                     onChange={handleChange("password")}
            //                     value={password}
            //                 />
            //             </Form.Group>
            //         </Form>
            //     </CardContent>

            //     <CardFooter className="flex justify-between">
            //         <Button
            //             className="rounded mt-4"
            //             type="submit"
            //             onClick={onSubmit}
            //         >
            //             Login
            //         </Button>

            //         <Row>
            //             <Col className="text-lg-left text-md-left" lg={{ span: 4, offset: 0 }} sm={{ span: 12 }} md={{ span: 4, offset: 0 }}>
            //                 <Link to="/home" variant="body2">
            //                     Forgot password?
            //                 </Link>
            //             </Col>
            //             <Col className="text-lg-right text-md-right" lg={{ span: 6, offset: 2 }} sm={{ span: 12 }} md={{ span: 8, offset: 0 }}>
            //                 <Link href="/signup" >
            //                     {"Don't have an account? Signup"}
            //                 </Link>

            //             </Col>
            //         </Row>
            //     </CardFooter>
            // </Card>)

        {/* <Row className="zindex-popover py-4"> 
        <Col className="border rounded p-lg-4 shadow-lg" lg={{ span: 4, offset: 4 }} sm={{span :12 }} md= {{span:4, offset:3}}>       
            <h3 className="text-dark">Login</h3>
        
        <Button
            className="rounded mt-4"
                type="submit"
                onClick = {onSubmit}
            >
            Login
        </Button>

             */}
        {/* 
            <Row className="my-4 ml-1 d-none d-lg-block">
                <div className="bar bar-top"></div>
                <span className="login-or offset-4">OR</span>
                <div className="bar bar-bottom"></div>
            </Row>

            <Row className="my-4"></Row>
             <Row >
                <Col className="my-lg-4 py-lg-1 offset-lg-1"  lg={{ span: 4, offset: 1 }} sm={{span :12 }} md= {{span:4, offset:0}}>
                    <FacebookLogin
                    // appId="1088597931155576"
                    render={renderProps => (
                        <button className="loginBtn loginBtn--google" onClick={renderProps.onClick} disabled={renderProps.disabled}>Login</button>
                        )}
                    textButton="Login"
                    cssClass= "loginBtn loginBtn--facebook"
                    fields="name,email,picture"
                    />
                </Col>

                <Col className="my-lg-4 py-lg-1" lg={{ span: 4, offset:2 }} sm={{span :12 }} md= {{span:4, offset:0}}>
                    <GoogleLogin
                        // clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                        render={renderProps => (
                        <button className="loginBtn loginBtn--google" onClick={renderProps.onClick} disabled={renderProps.disabled}>Login</button>
                        )}
                        buttonText="Login"
                        // onSuccess={responseGoogle}
                        // onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    />
                </Col> */}
        {/* </Row>     */ }
        //     </Form.Group>
        //     </Form>
        //     </Col>
        // </Row>   
        //     )
    };

    return (
        <Base>
            {loadingMessage()}
            {errorMessage()}
            {signInForm()}
            {performRedirect()}
            {/* <p className="text-white text-center">{JSON.stringify(values)}</p> */}
        </Base>
    )
}

export default Signin;