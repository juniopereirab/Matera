import { Pagination } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setPage } from "../../store/actions/products";
import {
  ProductImage,
  ProductInfo,
  ProductItem,
  ProductListContainer,
  ProductPrice,
  ProductText,
} from "./styles";

export function ProductList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list, currentPage } = useSelector(
    (state: MainState) => state.product
  );
  const handlePaginationChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    dispatch(
      setPage({
        page: value,
      })
    );
  };

  const elementsByPage = () => {
    const start = currentPage * 15;
    const end = start + 15;
    return list.slice(start, end);
  };
  return (
    <>
      <ProductListContainer container>
        {list.length > 0 &&
          elementsByPage().map((product) => (
            <ProductItem
              item
              key={Math.random()}
              sx={12}
              sm={6}
              onClick={() => navigate(`/produtos/${product.id}`)}
            >
              <ProductImage src={product.avatar} alt="product" />
              <ProductInfo>
                <ProductText>{product.nome}</ProductText>
                <ProductText>by {product.marca}</ProductText>
                <ProductPrice>R$ {product.preco}</ProductPrice>
                <ProductText>{product.qt_vendas} vendidos</ProductText>
                <ProductText>{product.qt_estoque} em estoque</ProductText>
                <ProductText>
                  Criado em {new Date(product.createdAt).toLocaleDateString()}
                </ProductText>
              </ProductInfo>
            </ProductItem>
          ))}
      </ProductListContainer>
      <Pagination
        count={Math.floor(list.length / 15)}
        page={currentPage}
        onChange={handlePaginationChange}
      />
    </>
  );
}
