import { create } from 'zustand';

export const useProductStore = create((set) => ({
    products: [],
    setProducts: (products) => set({products}),
    createProduct: async (newProduct) => {
        if(!newProduct.name || !newProduct.price || !newProduct.image){
            return {
                success: false,
                message: "Please fill in all the fields"
            }
        }
        const res = await fetch("/api/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newProduct)
        });
        const data = await res.json();
        set((state) => ({products:[...state.products, data.data]}));
        return {
            success: true,
            message: "Product created successfully!"
        };
    },

    fetchProducts: async () => {
        const res = await fetch("/api/products");
        const data = await res.json();
        set({
            products: data.data
        })
    },

    deleteProduct: async (pid) => {
        try {
            // Send DELETE request to the API
            const res = await fetch(`/api/products/${pid}`, {
                method: "DELETE"
            });
    
            const data = await res.json();
    
            // Check if the response was successful
            if (!res.ok) {
                return {
                    success: false,
                    message: data.message || "Failed to delete product"
                };
            }
    
            // Update the products list in state after deletion
            set((state) => ({
                products: state.products.filter((product) => product._id !== pid)
            }));
    
            return {
                success: true,
                message: data.message || "Product deleted successfully"
            };
        } catch (error) {
            // Catch any network or server errors
            console.error("Error deleting product:", error);
            return {
                success: false,
                message: "An error occurred while deleting the product"
            };
        }
        // const res = await fetch(`/api/products/${pid}`, {
        //     method: "DELETE"
        // });
        // const data = await res.json();
        // if(!data.success){
        //     return {
        //         success: false,
        //         message: data.message
        //     };
        // }

        // set((state) => ({products: state.products.filter((product) => product._id !== pid) }));
        // return {
        //     success: true,
        //     message: data.message
        // }
    },

    updateProduct: async (pid, updatedProduct) => {
        try {
            const res = await fetch(`/api/products/${pid}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedProduct),
            });

            const data = await res.json();

            if(!data.success){
                return {
                    success: false,
                    message: data.message
                }
            };
            set((state) => ({
                products: state.products.map((product) => (product._id === pid ? data.data : product))
            }));
    
            return {
                success: true,
                message: data.message
            }
        } catch (error) {
            console.error("Error updating product:", error);
            return {
                success: false,
                message: error.message || 'Server error occurred',
            };
        }
        
    },

}));
