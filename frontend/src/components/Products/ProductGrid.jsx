import { Link } from "react-router-dom";

const ProductGrid = ({ products, loading, error}) => {
  if (loading) {
    return <p className="text-center">Loading ...</p>;
  }

  if (error) {
    return <p className="text-center">Error: {error}</p>;
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product, index) => (
        <Link to={`/product/${product._id}`} key={index} className="block">
          <div className="bg-white p-4 rounded-lg">
            <div className="w-full h-96 mb-4">
              <img
                src={product.images[0].url}
                alt={product.images[0].altText || product.name}
                className="w-full h-full object-cover rounded-lg"
              />
              <h3 className="text-sm mt-4">{product.name}</h3>
              <p className="text-gray-500 font-medium text-sm tracking-tighter">
                $ {product.price}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductGrid;
