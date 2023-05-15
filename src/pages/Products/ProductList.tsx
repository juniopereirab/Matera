import {
  Pagination,
  Paper,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setPage } from "../../store/actions/products";
import {
  ProductImage,
  ProductItem,
  ProductListContainer,
  ProductPrice,
  ProductText,
} from "./styles";

export function ProductList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list, currentPage, filter } = useSelector(
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

    if (filter) {
      return list.filter((produto) =>
        produto.nome.toLowerCase().includes(filter.toLowerCase())
      );
    }

    return list.slice(start, end);
  };

  const numberOfPages = () => {
    if (filter) {
      const filterLen =
        list.filter((produto) =>
          produto.nome.toLowerCase().includes(filter.toLowerCase())
        ).length / 15;

      return filterLen > 1 ? filterLen : 1;
    }
    return list.length / 15;
  };
  return (
    <>
      <ProductListContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Imagem</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Marca</TableCell>
              <TableCell>Preço</TableCell>
              <TableCell>Vendidos</TableCell>
              <TableCell>Estoque</TableCell>
              <TableCell>Data de Criação</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.length > 0 &&
              elementsByPage().map((product) => (
                <ProductItem
                  key={Math.random()}
                  onClick={() => navigate(`/produtos/${product.id}`)}
                >
                  <TableCell>
                    <ProductImage src={product.avatar} alt="product" />
                  </TableCell>
                  <TableCell>
                    <ProductText>{product.nome}</ProductText>
                  </TableCell>
                  <TableCell>
                    <ProductText>{product.marca}</ProductText>
                  </TableCell>
                  <TableCell>
                    <ProductPrice>R$ {product.preco}</ProductPrice>
                  </TableCell>
                  <TableCell>
                    <ProductText>{product.qt_vendas}</ProductText>
                  </TableCell>
                  <TableCell>
                    {" "}
                    <ProductText>{product.qt_estoque}</ProductText>
                  </TableCell>
                  <TableCell>
                    <ProductText>
                      {new Date(product.createdAt).toLocaleDateString()}
                    </ProductText>
                  </TableCell>
                </ProductItem>
              ))}
          </TableBody>
        </Table>
      </ProductListContainer>
      <Pagination
        count={Math.floor(numberOfPages())}
        page={currentPage}
        onChange={handlePaginationChange}
      />
    </>
  );
}
