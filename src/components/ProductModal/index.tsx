import { Backdrop, Button, Grid, Modal, Stack } from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { addProduct, editProduct } from "../../services/products";
import {
  editProduct as editAction,
  addProduct as addAction,
} from "../../store/actions/products";
import { ProductSchema } from "../../utils/validators/schemas";
import ImageInput from "../ImageInput";
import {
  FormContainer,
  Input,
  ModalContainer,
  ModalContent,
  ModalTitle,
  PreviewImage,
} from "./styles";

interface IProductModal {
  open: boolean;
  handleClose: () => void;
  product: IProduct | null;
}

const initialValues: IProductData = {
  nome: "",
  avatar: "",
  marca: "",
  preco: "",
  createdAt: new Date().toDateString(),
  qt_estoque: 0,
  qt_vendas: 0,
};

export default function ProductModal({
  open,
  handleClose,
  product,
}: IProductModal) {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const { info } = useSelector((state: MainState) => state.user);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [priceInputValue, setPriceInputValue] = useState<string>("");

  const onSubmit = async (values: IProductData) => {
    try {
      if (product && info?.token && productId) {
        await editProduct(info?.token, values, productId);
      } else if (info?.token) {
        await addProduct(info.token, values);
      }
      handleClose();
    } catch (error) {
      handleClose();
    }

    if (product) {
      dispatch(
        editAction({
          product: values as IProduct,
        })
      );
    } else {
      dispatch(
        addAction({
          product: {
            ...values,
            id: Math.random(),
          },
        })
      );
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: ProductSchema,
    enableReinitialize: true,
  });

  useEffect(() => {
    if (selectedImage) {
      const url = URL.createObjectURL(selectedImage);
      setImageUrl(url);
      formik.setValues({
        ...formik.values,
        avatar: url,
      });
    }
  }, [selectedImage]);

  useEffect(() => {
    if (product) {
      setImageUrl(product.avatar);
      const numericValue =
        parseInt(product.preco.replace(/[^0-9]/g, ""), 10) / 100;
      const formattedValue = numericValue.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
      formik.setValues({
        ...product,
      });
      setPriceInputValue(formattedValue);
    }
  }, [product]);

  const handlePrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = event?.target.value;
    const numeric = parseInt(rawValue.replace(/[^0-9]/g, ""), 10) / 100;
    if (Number.isNaN(numeric)) {
      return;
    }
    const formattedValue = numeric.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    setPriceInputValue(formattedValue);
    formik.setFieldValue("preco", numeric.toFixed(2).toString());
  };

  const title = product ? "Editar Produto" : "Criar Produto";
  return (
    <Modal
      open={open}
      onClose={() => handleClose()}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <ModalContainer>
        <ModalContent>
          <Stack>
            <ModalTitle>{title}</ModalTitle>
            <FormContainer container spacing={2}>
              {imageUrl && (
                <Grid item xs={12} display="flex" justifyContent="center">
                  <PreviewImage src={imageUrl} alt="preview" />
                </Grid>
              )}
              <Grid item xs={12} display="flex" justifyContent="center">
                <ImageInput onChange={setSelectedImage} />
              </Grid>
              <Grid item xs={12}>
                <Input
                  id="nome"
                  label="Nome"
                  variant="outlined"
                  type="text"
                  value={formik.values.nome}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="nome"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Input
                  id="marca"
                  label="Marca"
                  variant="outlined"
                  type="text"
                  value={formik.values.marca}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="marca"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Input
                  id="preco"
                  label="Preço"
                  variant="outlined"
                  type="text"
                  value={priceInputValue}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handlePrice(e)
                  }
                  onBlur={formik.handleBlur}
                  name="preco"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Input
                  id="estoque"
                  label="Estoque"
                  variant="outlined"
                  type="number"
                  value={formik.values.qt_estoque}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="qt_estoque"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Input
                  id="vendas"
                  label="Vendas"
                  variant="outlined"
                  type="number"
                  value={formik.values.qt_vendas}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="qt_vendas"
                />
              </Grid>
              <Grid item xs={6} display="flex" justifyContent="center">
                <Button
                  variant="contained"
                  sx={{ width: `200px` }}
                  onClick={() => formik.handleSubmit()}
                  disabled={!formik.isValid || !formik.dirty}
                >
                  Concluir
                </Button>
              </Grid>
              <Grid item xs={6} display="flex" justifyContent="center">
                <Button
                  variant="contained"
                  sx={{ width: `200px` }}
                  onClick={() => handleClose()}
                  color="error"
                >
                  Cancelar
                </Button>
              </Grid>
            </FormContainer>
          </Stack>
        </ModalContent>
      </ModalContainer>
    </Modal>
  );
}
