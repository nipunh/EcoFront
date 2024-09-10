import React, {useEffect, useState} from 'react'
import {Base} from '../core/Base';
import { Link, Redirect } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import { getCategories, getProduct, updateProduct } from './helper/adminapicall';
import {
  ChevronLeft,
  Home,
  LineChart,
  Package,
  Package2,
  PanelLeft,
  PlusCircle,
  Search,
  Settings,
  ShoppingCart,
  Upload,
  Users2,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"


const UpdateProduct = ({match}) => {
    const {user, token} = isAuthenticated()

    const [values, setValues] = useState({
        name: "",
        description: "",
        price: "",
        stock:"",
        photo : "",
        categories : [],
        category: "",
        loading: false,
        error: "",
        createdProduct: "",
        getRedirect : false,
        formData : ""
    });

    const {name, stock, description, price, categories, category, createdProduct, getRedirect, formData} = values;

    const preload = productId => {
        console.log(productId);
        getProduct(productId).then(data => {
            console.log(data);
            if(data.error){
                setValues({...values, error: data.error })
            }else{
                preloadCategories();
                setValues({
                    ...values,
                    name: data.name,
                    description: data.description,
                    price: data.price,
                    category: data.category._id,
                    stock: data.stock,
                    fromData: new FormData()
                    
                });
            }
        });
    };
    
    const preloadCategories = () => {
       getCategories().then(data =>{
        if(data.error){
            setValues({...values, error: data.error })
        }else{
            setValues({
                categories: data,
                formData: new FormData()
            });
    }
});
}

    useEffect(() => {
        preload(match.params.productId);
    }, []);

    const handleChange = name => event => {
        const value = name === "photo" ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({...values, [name]: value})
    };

    const successMessage = () => (
      <div className="alert alert-success mt-3" style={{display:createdProduct ? "" : "none"}}>
        <h5> {createdProduct} updated successfully. </h5>
      </div>
    ); 

//TODO : Work on it.

    const onSubmit = event => {
        event.preventDefault();
        setValues({...values, error:"", loading: true});
        
        updateProduct(match.params.productId , user._id, token, formData).then(
          data =>{
            if(data.error){
              setValues({...values, error: data.error})
            }else{
              setValues({
                ...values,
                name:"",
                description:"",
                price: "",
                photo: "",
                stock : "",
                loading: false,
                createdProduct: data.name
              })
            }
          }
        )
    }



    const updateProductForm = () => (
        <form >
          <span className="mb-3">Add all the details related to product and upload image of product</span>
          <div className="form-group">
            <label className="btn btn-block btn-success">
              <input
                onChange={handleChange("photo")}
                type="file"
                name="photo"
                accept="image"
                placeholder="choose a file"
              />
            </label>
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("name")}
              name="photo"
              className="form-control"
              placeholder="Name"
              value={name}
            />
          </div>
          <div className="form-group">
            <textarea
              onChange={handleChange("description")}
              name="photo"
              className="form-control"
              placeholder="Description"
              value={description}
            />
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("price")}
              type="number"
              className="form-control"
              placeholder="Price"
              value={price}
            />
          </div>
          <div className="form-group">
            <select
              onChange={handleChange("category")}
              className="form-control"
              placeholder="Category"
            >
              <option>Select</option>
              <option value="a">a</option>
              {categories && categories.map((cate, index)=>(
                  <option key={index} value={cate._id}>
                      {cate.name}
                  </option>
                ))
              }
            </select>
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("stock")}
              type="number"
              className="form-control"
              placeholder="Quantity"
              value={stock}
            />
          </div>
          
          <button type="submit" onClick={onSubmit} className="btn btn-success mb-3">
            Update Product
          </button>
        </form>
      );

    // return (
    //     <Base title="Add a product here!"
    //     description="Welcome to product creation section"
    //     className="container p-4"
    //   >
    //     <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">
    //       Admin Home
    //     </Link>
    //     <div className="row bg-dark text-white rounded p-4">
    //       <div className="col-md-8 offset-md-2">
    //         {successMessage()}
    //         {updateProductForm()}
    //       </div>
    //     </div>
            
    //     </Base>
    // )

    return(
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
          <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
            <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
              <Link
                href="#"
                className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
              >
                <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
                <span className="sr-only">Acme Inc</span>
              </Link>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href="#"
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  >
                    <Home className="h-5 w-5" />
                    <span className="sr-only">Dashboard</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Dashboard</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href="#"
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    <span className="sr-only">Orders</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Orders</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href="#"
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  >
                    <Package className="h-5 w-5" />
                    <span className="sr-only">Products</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Products</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href="#"
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  >
                    <Users2 className="h-5 w-5" />
                    <span className="sr-only">Customers</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Customers</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href="#"
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  >
                    <LineChart className="h-5 w-5" />
                    <span className="sr-only">Analytics</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Analytics</TooltipContent>
              </Tooltip>
            </nav>
            <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href="#"
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  >
                    <Settings className="h-5 w-5" />
                    <span className="sr-only">Settings</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Settings</TooltipContent>
              </Tooltip>
            </nav>
          </aside>
          <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
            <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
              <Sheet>
                <SheetTrigger asChild>
                  <Button size="icon" variant="outline" className="sm:hidden">
                    <PanelLeft className="h-5 w-5" />
                    <span className="sr-only">Toggle Menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="sm:max-w-xs">
                  <nav className="grid gap-6 text-lg font-medium">
                    <Link
                      href="#"
                      className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                    >
                      <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                      <span className="sr-only">Acme Inc</span>
                    </Link>
                    <Link
                      href="#"
                      className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                    >
                      <Home className="h-5 w-5" />
                      Dashboard
                    </Link>
                    <Link
                      href="#"
                      className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                    >
                      <ShoppingCart className="h-5 w-5" />
                      Orders
                    </Link>
                    <Link
                      href="#"
                      className="flex items-center gap-4 px-2.5 text-foreground"
                    >
                      <Package className="h-5 w-5" />
                      Products
                    </Link>
                    <Link
                      href="#"
                      className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                    >
                      <Users2 className="h-5 w-5" />
                      Customers
                    </Link>
                    <Link
                      href="#"
                      className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                    >
                      <LineChart className="h-5 w-5" />
                      Settings
                    </Link>
                  </nav>
                </SheetContent>
              </Sheet>
              <Breadcrumb className="hidden md:flex">
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link href="#">Dashboard</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link href="#">Products</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Edit Product</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
              <div className="relative ml-auto flex-1 md:grow-0">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="overflow-hidden rounded-full"
                  >
                    {/* <Image
                      src="/placeholder-user.jpg"
                      width={36}
                      height={36}
                      alt="Avatar"
                      className="overflow-hidden rounded-full"
                    /> */}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Support</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </header>
            <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
              <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
                <div className="flex items-center gap-4">
                  <Button variant="outline" size="icon" className="h-7 w-7">
                    <ChevronLeft className="h-4 w-4" />
                    <span className="sr-only">Back</span>
                  </Button>
                  <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                    Pro Controller
                  </h1>
                  <Badge variant="outline" className="ml-auto sm:ml-0">
                    In stock
                  </Badge>
                  <div className="hidden items-center gap-2 md:ml-auto md:flex">
                    <Button variant="outline" size="sm">
                      Discard
                    </Button>
                    <Button size="sm">Save Product</Button>
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                  <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                    <Card x-chunk="dashboard-07-chunk-0">
                      <CardHeader>
                        <CardTitle>Product Details</CardTitle>
                        <CardDescription>
                          Lipsum dolor sit amet, consectetur adipiscing elit
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-6">
                          <div className="grid gap-3">
                            <Label htmlFor="name">Name</Label>
                            <Input
                              id="name"
                              type="text"
                              className="w-full"
                              defaultValue="Gamer Gear Pro Controller"
                            />
                          </div>
                          <div className="grid gap-3">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                              id="description"
                              defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl nec ultricies ultricies, nunc nisl ultricies nunc, nec ultricies nunc nisl nec nunc."
                              className="min-h-32"
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card x-chunk="dashboard-07-chunk-1">
                      <CardHeader>
                        <CardTitle>Stock</CardTitle>
                        <CardDescription>
                          Lipsum dolor sit amet, consectetur adipiscing elit
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-[100px]">SKU</TableHead>
                              <TableHead>Stock</TableHead>
                              <TableHead>Price</TableHead>
                              <TableHead className="w-[100px]">Size</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell className="font-semibold">
                                GGPC-001
                              </TableCell>
                              <TableCell>
                                <Label htmlFor="stock-1" className="sr-only">
                                  Stock
                                </Label>
                                <Input
                                  id="stock-1"
                                  type="number"
                                  defaultValue="100"
                                />
                              </TableCell>
                              <TableCell>
                                <Label htmlFor="price-1" className="sr-only">
                                  Price
                                </Label>
                                <Input
                                  id="price-1"
                                  type="number"
                                  defaultValue="99.99"
                                />
                              </TableCell>
                              <TableCell>
                                <ToggleGroup
                                  type="single"
                                  defaultValue="s"
                                  variant="outline"
                                >
                                  <ToggleGroupItem value="s">S</ToggleGroupItem>
                                  <ToggleGroupItem value="m">M</ToggleGroupItem>
                                  <ToggleGroupItem value="l">L</ToggleGroupItem>
                                </ToggleGroup>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-semibold">
                                GGPC-002
                              </TableCell>
                              <TableCell>
                                <Label htmlFor="stock-2" className="sr-only">
                                  Stock
                                </Label>
                                <Input
                                  id="stock-2"
                                  type="number"
                                  defaultValue="143"
                                />
                              </TableCell>
                              <TableCell>
                                <Label htmlFor="price-2" className="sr-only">
                                  Price
                                </Label>
                                <Input
                                  id="price-2"
                                  type="number"
                                  defaultValue="99.99"
                                />
                              </TableCell>
                              <TableCell>
                                <ToggleGroup
                                  type="single"
                                  defaultValue="m"
                                  variant="outline"
                                >
                                  <ToggleGroupItem value="s">S</ToggleGroupItem>
                                  <ToggleGroupItem value="m">M</ToggleGroupItem>
                                  <ToggleGroupItem value="l">L</ToggleGroupItem>
                                </ToggleGroup>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-semibold">
                                GGPC-003
                              </TableCell>
                              <TableCell>
                                <Label htmlFor="stock-3" className="sr-only">
                                  Stock
                                </Label>
                                <Input
                                  id="stock-3"
                                  type="number"
                                  defaultValue="32"
                                />
                              </TableCell>
                              <TableCell>
                                <Label htmlFor="price-3" className="sr-only">
                                  Stock
                                </Label>
                                <Input
                                  id="price-3"
                                  type="number"
                                  defaultValue="99.99"
                                />
                              </TableCell>
                              <TableCell>
                                <ToggleGroup
                                  type="single"
                                  defaultValue="s"
                                  variant="outline"
                                >
                                  <ToggleGroupItem value="s">S</ToggleGroupItem>
                                  <ToggleGroupItem value="m">M</ToggleGroupItem>
                                  <ToggleGroupItem value="l">L</ToggleGroupItem>
                                </ToggleGroup>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </CardContent>
                      <CardFooter className="justify-center border-t p-4">
                        <Button size="sm" variant="ghost" className="gap-1">
                          <PlusCircle className="h-3.5 w-3.5" />
                          Add Variant
                        </Button>
                      </CardFooter>
                    </Card>
                    <Card x-chunk="dashboard-07-chunk-2">
                      <CardHeader>
                        <CardTitle>Product Category</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-6 sm:grid-cols-3">
                          <div className="grid gap-3">
                            <Label htmlFor="category">Category</Label>
                            <Select>
                              <SelectTrigger
                                id="category"
                                aria-label="Select category"
                              >
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="clothing">Clothing</SelectItem>
                                <SelectItem value="electronics">
                                  Electronics
                                </SelectItem>
                                <SelectItem value="accessories">
                                  Accessories
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid gap-3">
                            <Label htmlFor="subcategory">
                              Subcategory (optional)
                            </Label>
                            <Select>
                              <SelectTrigger
                                id="subcategory"
                                aria-label="Select subcategory"
                              >
                                <SelectValue placeholder="Select subcategory" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="t-shirts">T-Shirts</SelectItem>
                                <SelectItem value="hoodies">Hoodies</SelectItem>
                                <SelectItem value="sweatshirts">
                                  Sweatshirts
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                    <Card x-chunk="dashboard-07-chunk-3">
                      <CardHeader>
                        <CardTitle>Product Status</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-6">
                          <div className="grid gap-3">
                            <Label htmlFor="status">Status</Label>
                            <Select>
                              <SelectTrigger id="status" aria-label="Select status">
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="draft">Draft</SelectItem>
                                <SelectItem value="published">Active</SelectItem>
                                <SelectItem value="archived">Archived</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card
                      className="overflow-hidden" x-chunk="dashboard-07-chunk-4"
                    >
                      <CardHeader>
                        <CardTitle>Product Images</CardTitle>
                        <CardDescription>
                          Lipsum dolor sit amet, consectetur adipiscing elit
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-2">
                          {/* <Image
                            alt="Product image"
                            className="aspect-square w-full rounded-md object-cover"
                            height="300"
                            src="/placeholder.svg"
                            width="300"
                          /> */}
                          <div className="grid grid-cols-3 gap-2">
                            <button>
                              {/* <Image
                                alt="Product image"
                                className="aspect-square w-full rounded-md object-cover"
                                height="84"
                                src="/placeholder.svg"
                                width="84"
                              /> */}
                            </button>
                            <button>
                              {/* <Image
                                alt="Product image"
                                className="aspect-square w-full rounded-md object-cover"
                                height="84"
                                src="/placeholder.svg"
                                width="84"
                              /> */}
                            </button>
                            <button className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed">
                              <Upload className="h-4 w-4 text-muted-foreground" />
                              <span className="sr-only">Upload</span>
                            </button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card x-chunk="dashboard-07-chunk-5">
                      <CardHeader>
                        <CardTitle>Archive Product</CardTitle>
                        <CardDescription>
                          Lipsum dolor sit amet, consectetur adipiscing elit.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div></div>
                        <Button size="sm" variant="secondary">
                          Archive Product
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-2 md:hidden">
                  <Button variant="outline" size="sm">
                    Discard
                  </Button>
                  <Button size="sm">Save Product</Button>
                </div>
              </div>
            </main>
          </div>
        </div>
      )
}

export default UpdateProduct;
