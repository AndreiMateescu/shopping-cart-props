function ShoppingCart(props) {
  return (
    <div>
      {props.children}
      {props.shoppingCartProducts.map((product) => (
        <p>{product.name}</p>
      ))}
    </div>
  );
}

export default ShoppingCart;
