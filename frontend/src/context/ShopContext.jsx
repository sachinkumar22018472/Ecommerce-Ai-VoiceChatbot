import React, {
    createContext,
    useContext,
    useState,
    useEffect
} from "react";
import { authDataContext } from "./AuthContext";
import axios from "axios";
import { userDataContext } from "./UserContext";

export const shopDataContext = createContext();

function ShopContext({ children }) {

    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const [cartItem, setCartItem] = useState({});

    // Contexts
    const { serverUrl } = useContext(authDataContext);
    const { userData } = useContext(userDataContext);

    const currency = "₹";
    const delivery_fee = 40;

    // =========================
    // GET ALL PRODUCTS
    // =========================
    const getProducts = async () => {
        try {
            const result = await axios.get(`${serverUrl}/api/product/list`);

            console.log("Products:", result.data);

            if (Array.isArray(result.data)) {
                setProducts(result.data);
            } else if (result.data.products) {
                setProducts(result.data.products);
            }

        } catch (error) {
            console.log(
                "Error fetching products:",
                error.response?.data || error.message
            );
        }
    };

    // =========================
    // ADD TO CART
    // =========================
    const addtoCart = async (itemId, size) => {

        if (!size) {
            console.log("Select Product Size");
            return;
        }

        // Optimistic UI Update
        const cartData = structuredClone(cartItem);

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }

        setCartItem(cartData);

        // API Call
        if (userData) {
            try {
                const result = await axios.post(
                    `${serverUrl}/api/cart/add`,
                    { itemId, size },
                    { withCredentials: true }
                );
                console.log("Cart added:", result.data);
            } catch (error) {
                console.log(
                    "Error adding to cart:",
                    error.response?.data || error.message
                );
            }
        }
    };

    // =========================
    // GET USER CART
    // =========================
    const getUserCart = async () => {
        try {
            const result = await axios.post(
                `${serverUrl}/api/cart/get`,
                {},
                { withCredentials: true }
            );

            console.log("User Cart fetched:", result.data);

            // Handle response format properly
            if (result.data && result.data.cartData) {
                setCartItem(result.data.cartData);
            } else if (result.data) {
                setCartItem(result.data);
            }

        } catch (error) {
            console.log(
                "Error getting cart:",
                error.response?.data || error.message
            );
        }
    };

    // =========================
    // UPDATE QUANTITY
    // =========================
    const updatedQuantity = async (itemId, size, quantity) => {
        try {
            let cartData = structuredClone(cartItem);
            
            if (!cartData[itemId]) cartData[itemId] = {};
            
            cartData[itemId][size] = quantity;
            setCartItem(cartData);

            if (userData) {
                await axios.post(
                    `${serverUrl}/api/cart/update`,
                    { itemId, size, quantity },
                    { withCredentials: true }
                );
            }
        } catch (error) {
            console.log("Error updating quantity:", error);
        }
    };

    // =========================
    // GET CART TOTAL COUNT
    // =========================
    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItem) {
            for (const item in cartItem[items]) {
                try {
                    if (cartItem[items][item] > 0) {
                        totalCount += cartItem[items][item];
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        }
        return totalCount;
    };

    // =========================
    // GET CART TOTAL AMOUNT (FIXED SYNTAX)
    // =========================
    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItem) {
            let itemInfo = products.find((product) => product._id === items);
            if (itemInfo) {
                for (const item in cartItem[items]) {
                    try {
                        if (cartItem[items][item] > 0) {
                            totalAmount += itemInfo.price * cartItem[items][item];
                        }
                    } catch (error) {
                        console.log(error);
                    }
                }
            }
        }
        return totalAmount;
    };

    // Initial Fetch Products
    useEffect(() => {
        if (serverUrl) {
            getProducts();
        }
    }, [serverUrl]);

    // Initial Fetch User Cart when logged in
    useEffect(() => {
        if (serverUrl && userData) {
            getUserCart();
        }
    }, [serverUrl, userData]);

    // Context value
    const value = {
        products,
        currency,
        delivery_fee,
        getProducts,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItem,
        setCartItem,
        addtoCart,
        getCartCount,
        getCartAmount,
        updatedQuantity,
        getUserCart
    };

    return (
        <shopDataContext.Provider value={value}>
            {children}
        </shopDataContext.Provider>
    );
}

export default ShopContext;
