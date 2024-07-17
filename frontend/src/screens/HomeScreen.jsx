import React, { useEffect, useState } from "react";
import ProductList from "../components/ProductList";
import { getProducts } from "../service/productService";

const HomeScreen = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      getProducts().then((res)=>{
        console.log("res",res)
        const success = res?.data?.success
        if(success){
          setProducts(res?.data?.products);
        }else{

        }
      })
    };

    fetchProducts();
  }, []);

  return (
    <div className="my-5 mx-10">
      <div className="flex  gap-2">
        <div className="w-2/3">
          <h1 className="text-6xl ">
            Elevate Your wardrobe with Irresistible fashion finds
          </h1>
        </div>
        <div className="flex flex-col w-1/3 justify-between">
          <h1>
            you will discover a world of style at skilkify , where fashion meets
            comfort
          </h1>
          <div className="flex gap-2">
            <div class="flex -space-x-4">
              <img
                src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?crop=faces&fit=crop&w=50&h=50"
                alt="Avatar 1"
                class="w-12 h-12 rounded-full border-2 border-white shadow"
              />
              <img
                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?crop=faces&fit=crop&w=50&h=50"
                alt="Avatar 2"
                class="w-12 h-12 rounded-full border-2 border-white shadow"
              />
              <img
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?crop=faces&fit=crop&w=50&h=50"
                alt="Avatar 3"
                class="w-12 h-12 rounded-full border-2 border-white shadow"
              />
              <img
                src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?crop=faces&fit=crop&w=50&h=50"
                alt="Avatar 4"
                class="w-12 h-12 rounded-full border-2 border-white shadow"
              />
              <div class="w-12 h-12 rounded-full border-2 border-white bg-gray-400 flex items-center justify-center text-white shadow">
                +80
              </div>
            </div>
            <div className="flex flex-col">
              <h1 className="text-bold">80+</h1>
              <h1>User Satisfied</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full bg-yellow-200 gap-3 mt-10">
        <div className="flex flex-col w-1/2 bg-green-300 gap-3 ">
          <div className="flex w-full h-48 rounded-2xl bg-red-600 justify-center">
            <img
              src="/th.jpeg"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
          <div className="flex w-full gap-2 ">
            <div className="relative w-1/2">
              <img src="/th.jpeg" className="rounded-2xl w-full" alt="Image" />
              <div className="absolute top-0 left-0 mt-2 mr-2 bg-black text-white text-xs font-semibold px-2 py-1 rounded">
                Top Right Text
              </div>
            </div>
            <div className="relative w-1/2">
              <img src="/th.jpeg" className="rounded-2xl w-full" alt="Image" />
              <div className="absolute top-0 left-0 mt-2 mr-2 bg-black text-white text-xs font-semibold px-2 py-1 rounded">
                Top Right Text
              </div>
            </div>
          </div>
        </div>
        <div className="bg-green-300 w-1/2 flex items-center">
          <div className="relative w-full">
            <img src="/th.jpeg" className="rounded-2xl w-full" alt="Image" />
            <div className="absolute top-1/2 left-0 mt-2 mr-2 bg-black text-white text-xs font-semibold px-2 py-1 rounded">
              Top Right Text
            </div>
          </div>
        </div>
      </div>
      {/* <Navbar/> */}
      <h1 className="text-red-500">Products</h1>
      <ProductList products={products} />
    </div>
  );
};

export default HomeScreen;
