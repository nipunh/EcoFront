import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Base } from "../core/Base"
import { useEffect, useState } from "react"
import { getProductById } from "../core/helper/coreapicalls"
import { useParams } from "react-router-dom"
import ImageHelper from "../core/helper/ImageHelper"
import { addItemToCart } from "../core/helper/cartHelper"


export default function ProductDetailPage() {
    const { productId } = useParams(); // Use useParams to get the route parameters
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState("1");

    // Function to handle value changes
    const handleValueChange = (value) => {
        setQuantity(value);
    };

    useEffect(() => {
        const loadProduct = async () => {
            try {
                const data = await getProductById(productId);
                if (data?.error) {
                    setError(data.error);
                } else {
                    setProduct(data);
                }
            } catch (err) {
                setError("An error occurred while fetching the product.");
            } finally {
                setLoading(false);
            }
        };

        loadProduct();
    }, [productId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    const addToCart = () => {
        addItemToCart(product, () => setRedirect(true), parseInt(quantity));
        setQuantity(1);
    }
    return (
        <Base>
            <div className="grid md:grid-cols-2 items-start max-w-3xl px-4 mx-auto py-6 gap-6 md:gap-12">
                <div className="grid gap-4 items-start">
                    <div className="flex items-start">
                        <div className="grid gap-4">
                            <h1 className="font-bold text-2xl sm:text-3xl text-black">
                                {product?.name || "Product Name"}
                            </h1>
                            <div>
                                <p>60% combed ringspun cotton 40% polyester jersey tee.</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-0.5">
                                    <StarIcon className="w-5 h-5 fill-primary" />
                                    <StarIcon className="w-5 h-5 fill-primary" />
                                    <StarIcon className="w-5 h-5 fill-primary" />
                                    <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                                    <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                                </div>
                            </div>
                        </div>
                        <div className="text-4xl font-bold ml-auto">${product.price}</div>
                    </div>
                    <form className="grid gap-4 md:gap-10">
                        <div className="grid gap-2">
                            <Label htmlFor="color" className="text-base">
                                Color
                            </Label>
                            <RadioGroup id="color" defaultValue="black" className="flex items-center gap-2">
                                <Label
                                    htmlFor="color-black"
                                    className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                                >
                                    <RadioGroupItem id="color-black" value="black" />
                                    Black
                                </Label>
                                <Label
                                    htmlFor="color-white"
                                    className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                                >
                                    <RadioGroupItem id="color-white" value="white" />
                                    White
                                </Label>
                                <Label
                                    htmlFor="color-blue"
                                    className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                                >
                                    <RadioGroupItem id="color-blue" value="blue" />
                                    Blue
                                </Label>
                            </RadioGroup>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="size" className="text-base">
                                Size
                            </Label>
                            <RadioGroup id="size" defaultValue="m" className="flex items-center gap-2">
                                <Label
                                    htmlFor="size-xs"
                                    className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                                >
                                    <RadioGroupItem id="size-xs" value="xs" />
                                    XS
                                </Label>
                                <Label
                                    htmlFor="size-s"
                                    className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                                >
                                    <RadioGroupItem id="size-s" value="s" />
                                    S
                                </Label>
                                <Label
                                    htmlFor="size-m"
                                    className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                                >
                                    <RadioGroupItem id="size-m" value="m" />
                                    M
                                </Label>
                                <Label
                                    htmlFor="size-l"
                                    className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                                >
                                    <RadioGroupItem id="size-l" value="l" />
                                    L
                                </Label>
                                <Label
                                    htmlFor="size-xl"
                                    className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                                >
                                    <RadioGroupItem id="size-xl" value="xl" />
                                    XL
                                </Label>
                            </RadioGroup>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="quantity" className="text-base">
                                Quantity
                            </Label>
                            <Select defaultValue="1" onValueChange={handleValueChange}>
                                <SelectTrigger className="w-24">
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1">1</SelectItem>
                                    <SelectItem value="2">2</SelectItem>
                                    <SelectItem value="3">3</SelectItem>
                                    <SelectItem value="4">4</SelectItem>
                                    <SelectItem value="5">5</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Button onClick={() => addToCart(product)} size="lg">Add to cart</Button>
                    </form>
                    <Separator className="border-gray-200 dark:border-gray-800" />
                    <div className="grid gap-4 text-sm leading-loose">
                        <p>
                            {product?.description}
                        </p>
                        <p>
                            {product?.description}
                        </p>
                    </div>
                </div>
                <div className="grid gap-3 items-start">
                    <div className="hidden md:flex gap-4 items-start">
                        <button className="border hover:border-gray-900 rounded-lg overflow-hidden transition-colors dark:hover:border-gray-50">
                            <img
                                src="/placeholder.svg"
                                alt="Preview thumbnail"
                                width={100}
                                height={100}
                                className="aspect-square object-cover"
                            />
                            <span className="sr-only">View Image 1</span>
                        </button>
                        <button className="border hover:border-gray-900 rounded-lg overflow-hidden transition-colors dark:hover:border-gray-50">
                            <img
                                src="/placeholder.svg"
                                alt="Preview thumbnail"
                                width={100}
                                height={100}
                                className="aspect-square object-cover"
                            />
                            <span className="sr-only">View Image 2</span>
                        </button>
                        <button className="border hover:border-gray-900 rounded-lg overflow-hidden transition-colors dark:hover:border-gray-50">
                            <img
                                src="/placeholder.svg"
                                alt="Preview thumbnail"
                                width={100}
                                height={100}
                                className="aspect-square object-cover"
                            />
                            <span className="sr-only">View Image 3</span>
                        </button>
                        <button className="border hover:border-gray-900 rounded-lg overflow-hidden transition-colors dark:hover:border-gray-50">
                            <img
                                src="/placeholder.svg"
                                alt="Preview thumbnail"
                                width={100}
                                height={100}
                                className="aspect-square object-cover"
                            />
                            <span className="sr-only">View Image 4</span>
                        </button>
                        <button className="border hover:border-gray-900 rounded-lg overflow-hidden transition-colors dark:hover:border-gray-50">
                            <img
                                src="/placeholder.svg"
                                alt="Preview thumbnail"
                                width={100}
                                height={100}
                                className="aspect-square object-cover"
                            />
                            <span className="sr-only">View Image 5</span>
                        </button>
                    </div>
                    <div className="grid gap-4 md:gap-10">
                        <ImageHelper product={product} />
                        <div className="flex md:hidden items-start">
                            <button className="border hover:border-gray-900 rounded-lg overflow-hidden transition-colors dark:hover:border-gray-50">
                                <img
                                    src="/placeholder.svg"
                                    alt="Preview thumbnail"
                                    width={100}
                                    height={100}
                                    className="aspect-square object-cover"
                                />
                                <span className="sr-only">View Image 1</span>
                            </button>
                            <button className="border hover:border-gray-900 rounded-lg overflow-hidden transition-colors dark:hover:border-gray-50">
                                <img
                                    src="/placeholder.svg"
                                    alt="Preview thumbnail"
                                    width={100}
                                    height={100}
                                    className="aspect-square object-cover"
                                />
                                <span className="sr-only">View Image 2</span>
                            </button>
                            <button className="border hover:border-gray-900 rounded-lg overflow-hidden transition-colors dark:hover:border-gray-50">
                                <img
                                    src="/placeholder.svg"
                                    alt="Preview thumbnail"
                                    width={100}
                                    height={100}
                                    className="aspect-square object-cover"
                                />
                                <span className="sr-only">View Image 3</span>
                            </button>
                            <button className="border hover:border-gray-900 rounded-lg overflow-hidden transition-colors dark:hover:border-gray-50">
                                <img
                                    src="/placeholder.svg"
                                    alt="Preview thumbnail"
                                    width={100}
                                    height={100}
                                    className="aspect-square object-cover"
                                />
                                <span className="sr-only">View Image 4</span>
                            </button>
                            <button className="border hover:border-gray-900 rounded-lg overflow-hidden transition-colors dark:hover:border-gray-50">
                                <img
                                    src="/placeholder.svg"
                                    alt="Preview thumbnail"
                                    width={100}
                                    height={100}
                                    className="aspect-square object-cover"
                                />
                                <span className="sr-only">View Image 5</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Base>
    )
}

function StarIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
    )
}
