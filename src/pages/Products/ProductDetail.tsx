import { Button, Divider, Grid, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import ConfirmationModal from "../../components/ConfirmationModal";
import ProductModal from "../../components/ProductModal";
import { deleteProduct, getProduct } from "../../services/products";
import {
  addLastSeen,
  deleteProduct as deleteAction,
} from "../../store/actions/products";
import {
  ProductBrand,
  ProductContainer,
  ProductCreation,
  ProductDetailPrice,
  ProductDetailedButtons,
  ProductDetailedImage,
  ProductDetailedInfo,
  ProductName,
  ProductSales,
} from "./styles";

export function ProductDetail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productId } = useParams();
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

  const { info } = useSelector((state: MainState) => state.user);
  const [product, setProduct] = useState<IProduct | null>(null);

  const loadInfo = async () => {
    if (info?.token && productId) {
      try {
        const response = await getProduct(info.token, productId);
        setProduct(response);
        dispatch(
          addLastSeen({
            product: response,
          })
        );
      } catch (error) {
        navigate("/notFound");
      }
    }
  };

  useEffect(() => {
    loadInfo();
  }, [productId]);

  const deleteMessage = "Tem certeza que deseja deletar esse item?";
  const handleDelete = async () => {
    if (info?.token && productId) {
      await deleteProduct(info?.token, productId);
      if (product) {
        dispatch(
          deleteAction({
            product,
          })
        );
      }
      navigate("/produtos");
    }
  };

  return (
    <>
      <ProductContainer container>
        <Grid item xs={12} md={4} paddingRight="24px">
          <ProductDetailedImage src={product?.avatar} alt="avatar" />
        </Grid>
        <Grid item xs={12} md={6}>
          <ProductDetailedInfo>
            <Stack>
              <ProductName>{product?.nome}</ProductName>
              <ProductBrand>{product?.marca}</ProductBrand>
              <Divider />
              <ProductDetailPrice>R$ {product?.preco}</ProductDetailPrice>
            </Stack>
            <Stack>
              <ProductSales>{product?.qt_estoque} em estoque</ProductSales>
              <ProductSales>{product?.qt_vendas} vendidos</ProductSales>
              <ProductCreation>
                Criado em:{" "}
                {new Date(product?.createdAt || "").toLocaleDateString()}
              </ProductCreation>
            </Stack>
          </ProductDetailedInfo>
        </Grid>
        <Grid item xs={12} md={2}>
          <ProductDetailedButtons>
            <Button variant="contained" onClick={() => setEditModalOpen(true)}>
              Editar
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => setDeleteModalOpen(true)}
            >
              Deletar
            </Button>
          </ProductDetailedButtons>
        </Grid>
      </ProductContainer>
      <ProductModal
        open={editModalOpen}
        handleClose={() => setEditModalOpen(false)}
        product={product}
      />
      <ConfirmationModal
        open={deleteModalOpen}
        handleClose={() => setDeleteModalOpen(false)}
        message={deleteMessage}
        confirmAction={() => handleDelete()}
        cancelAction={() => setDeleteModalOpen(false)}
      />
    </>
  );
}
