// import Image from "next/image"
// import Link from "next/link"
import {
    ChevronLeft,
    ChevronRight,
    CircleUserRound,
    Copy,
    CreditCard,
    File,
    Fingerprint,
    Home,
    LayoutDashboard,
    LifeBuoy,
    LineChart,
    ListFilter,
    LogOut,
    MoreVertical,
    Package,
    Package2,
    PanelLeft,
    Search,
    Settings,
    ShoppingBasket,
    ShoppingCart,
    Truck,
    User,
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
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
} from "@/components/ui/pagination"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    TooltipProvider
} from "@/components/ui/tooltip"
import { Link } from 'react-router-dom'
import { isAuthenticated, signout } from "../auth/helper"

import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { useState } from "react"
import clsx from "clsx"

export function Base({ title, description, children }) {
    const [activeLink, setActiveLink] = useState('/'); // Track active link

    console.log(activeLink);
    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <aside className="fixed inset-y-0 left-0 z-10 w-14 flex-col border-r bg-background sm:flex">
                <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
                    <Link
                        to="/signup"
                        className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
                    >
                        <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
                        <span className="sr-only">Acme Inc</span>
                    </Link>

                    {/* User Routes */}
                    {isAuthenticated() && isAuthenticated().user.role === 1 &&
                        <TooltipProvider>
                            {/* Products */}
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Link
                                        to="/"
                                        className={clsx(
                                            'flex h-9 w-9 items-center justify-center rounded-lg transition-colors',
                                            {
                                                'text-foreground': activeLink === '/',
                                                'text-muted-foreground hover:text-foreground': activeLink !== '/',
                                            }
                                        )}
                                        onClick={() => setActiveLink('/')}
                                    >
                                        <Home className="h-5 w-5" />
                                        <span className="sr-only">Dashboard</span>
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent side="right">Dashboard</TooltipContent>
                            </Tooltip>
                            {/* Cart */}
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Link
                                        to="/cart"
                                        className={clsx(
                                            'flex h-9 w-9 items-center justify-center rounded-lg transition-colors',
                                            {
                                                'text-foreground': activeLink === '/cart',
                                                'text-accent-foreground hover:text-foreground': activeLink !== '/cart',
                                            }
                                        )}
                                        onClick={() => setActiveLink('/cart')}
                                    >
                                        <ShoppingCart className="h-5 w-5" />
                                        <span className="sr-only">Orders</span>
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent side="right">Orders</TooltipContent>
                            </Tooltip>
                            {/* Product Page */}
                            {/* Checkout */}
                        </TooltipProvider>

                    }


                    {/* Admin Routes */}
                    {isAuthenticated() && isAuthenticated().user.role === 1 &&
                        <TooltipProvider>
                            {/* Dashboard */}
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Link
                                        to="/admin/dashboard"
                                        className={clsx(
                                            'flex h-9 w-9 items-center justify-center rounded-lg transition-colors',
                                            {
                                                'text-foreground': activeLink === '/admin/dashboard',
                                                'text-accent-foreground hover:text-foreground': activeLink !== '/cart',
                                            }
                                        )}
                                        onClick={() => setActiveLink('/admin/dashboard')}
                                    >

                                        <LayoutDashboard className="h-5 w-5" />
                                        <span className="sr-only">Orders</span>
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent side="right">Orders</TooltipContent>
                            </Tooltip>
                            {/* Products */}
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Link
                                        to="/admin/dashboard"
                                        className={clsx(
                                            'flex h-9 w-9 items-center justify-center rounded-lg transition-colors',
                                            {
                                                'text-foreground': activeLink === '/admin/dashboard',
                                                'text-accent-foreground hover:text-foreground': activeLink !== '/cart',
                                            }
                                        )}
                                        onClick={() => setActiveLink('/admin/dashboard')}
                                    >

                                        <LayoutDashboard className="h-5 w-5" />
                                        <span className="sr-only">Orders</span>
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent side="right">Orders</TooltipContent>
                            </Tooltip>
                            {/* Orders */}
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Link
                                        to="/admin/dashboard"
                                        className={clsx(
                                            'flex h-9 w-9 items-center justify-center rounded-lg transition-colors',
                                            {
                                                'text-foreground': activeLink === '/admin/dashboard',
                                                'text-accent-foreground hover:text-foreground': activeLink !== '/cart',
                                            }
                                        )}
                                        onClick={() => setActiveLink('/admin/dashboard')}
                                    >

                                        <LayoutDashboard className="h-5 w-5" />
                                        <span className="sr-only">Orders</span>
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent side="right">Orders</TooltipContent>
                            </Tooltip>
                            {/* Customers */}
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Link
                                        to="/admin/dashboard"
                                        className={clsx(
                                            'flex h-9 w-9 items-center justify-center rounded-lg transition-colors',
                                            {
                                                'text-foreground': activeLink === '/admin/dashboard',
                                                'text-accent-foreground hover:text-foreground': activeLink !== '/cart',
                                            }
                                        )}
                                        onClick={() => setActiveLink('/admin/dashboard')}
                                    >

                                        <LayoutDashboard className="h-5 w-5" />
                                        <span className="sr-only">Orders</span>
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent side="right">Orders</TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    }

                </nav>


                {/* Settings */}
                <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    to="/settings"
                                    className={clsx(
                                        'flex h-9 w-9 items-center justify-center rounded-lg transition-colors',
                                        {
                                            'text-foreground': activeLink === '/settings',
                                            'text-muted-foreground hover:text-foreground': activeLink !== '/settings',
                                        }
                                    )}
                                    onClick={() => setActiveLink('/settings')}
                                >
                                    <Settings className="h-5 w-5" />
                                    <span className="sr-only">Settings</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">Settings</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
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
                                    to="/"
                                    className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                                >
                                    <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                                    <span className="sr-only">Acme Inc</span>
                                </Link>
                                <Link
                                    to="/"
                                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                                >
                                    <Home className="h-5 w-5" />
                                    Dashboard
                                </Link>
                                <Link
                                    to="/cart"
                                    className="flex items-center gap-4 px-2.5 text-foreground"
                                >
                                    <ShoppingCart className="h-5 w-5" />
                                    Orders
                                </Link>
                                <Link
                                    to="/"
                                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                                >
                                    <Package className="h-5 w-5" />
                                    Products
                                </Link>
                                <Link
                                    to="/"
                                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                                >
                                    <Users2 className="h-5 w-5" />
                                    Customers
                                </Link>
                                <Link
                                    to="/"
                                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                                >
                                    <LineChart className="h-5 w-5" />
                                    Settings
                                </Link>
                            </nav>
                        </SheetContent>
                    </Sheet>

                    <div className="relative ml-auto flex-1 md:grow-0">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search..."
                            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
                        />
                    </div>


                    {/* Top Bar */}
                    {
                        isAuthenticated()
                            ?
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        // variant="outline"
                                        className="p-4"
                                    >
                                        <CircleUserRound className="mr-2 h-4 w-4" /> Profile
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    {/* <DropdownMenuLabel className="w-60 flex flex-row justify-between align-middle">
                                    <span className="py-3">New Customer?</span>
                                    <DropdownMenuItem variant="outline" >Sign Up</DropdownMenuItem></DropdownMenuLabel>
                                <DropdownMenuSeparator /> */}
                                    <DropdownMenuItem>
                                        <User className="mr-2 h-4 w-4" />
                                        <span>My Profile</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <ShoppingBasket className="mr-2 h-4 w-4" />
                                        <span>Orders</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <LifeBuoy className="mr-2 h-4 w-4" />
                                        <span>Support</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={() => { signout(() => { history.push("/") }) }}>
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span>Logout</span>
                                    </DropdownMenuItem>

                                </DropdownMenuContent>
                            </DropdownMenu>
                            :
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        // variant="outline"
                                        className="p-4"
                                    >
                                        <CircleUserRound className="mr-2 h-4 w-4" /> Login
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <Link to="/signup">
                                        <DropdownMenuLabel className="w-60 flex flex-row justify-between align-middle">
                                            <span className="py-3">New Customer?</span>
                                            <DropdownMenuItem variant="outline" onClick={() => { signout(() => { history.push("/") }) }} >Sign Up</DropdownMenuItem>
                                        </DropdownMenuLabel>
                                    </Link>
                                    <DropdownMenuSeparator />
                                    <Link to="/signin">
                                        <DropdownMenuItem>
                                            <Fingerprint className="mr-2 h-4 w-4" />
                                            <span>Login</span>
                                        </DropdownMenuItem>
                                    </Link>
                                    <DropdownMenuItem>
                                        <User className="mr-2 h-4 w-4" />
                                        <span>My Profile</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <ShoppingBasket className="mr-2 h-4 w-4" />
                                        <span>Orders</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <LifeBuoy className="mr-2 h-4 w-4" />
                                        <span>Support</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                </DropdownMenuContent>
                            </DropdownMenu>
                    }

                    <Link to="/cart">
                        <Button>
                            <ShoppingCart className="mr-2 h-4 w-4" />
                            Cart
                        </Button>
                    </Link>

                </header>

                {/* <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3"> */}
                {children}
                {/* </main> */}
            </div>
        </div>
    )
}
