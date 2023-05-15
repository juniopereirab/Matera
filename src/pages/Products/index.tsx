import HomeIcon from "@mui/icons-material/Home";
import { Divider, Drawer, ListItemText, Menu, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

import ProductModal from "../../components/ProductModal";
import { getProducts } from "../../services/products";
import { changeFilter, setProducts } from "../../store/actions/products";
import { setUnlogged } from "../../store/actions/user";
import { ProductDetail } from "./ProductDetail";
import { ProductList } from "./ProductList";
import {
  Container,
  HomeButton,
  InnerContainer,
  MostVisitedList,
  MostVisitedTitle,
  NavBar,
  NavBarHeader,
  UserAvatar,
  UserButton,
  UserName,
  MostVistedListItem,
  CreateProductButton,
  FilterInput,
} from "./styles";

const drawerWidth = 240;

export default function Products() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productId } = useParams();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);
  const open = Boolean(anchorEl);
  const { list, lastSeen, filter } = useSelector(
    (state: MainState) => state.product
  );
  const { info } = useSelector((state: MainState) => state.user);

  const loadProducts = async () => {
    if (list.length === 0 && info?.token) {
      const products = await getProducts(info.token);
      dispatch(
        setProducts({
          products,
        })
      );
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(
      setUnlogged({
        user: null,
        isLogged: false,
      })
    );
  };

  const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    dispatch(changeFilter(value));
  };

  useEffect(() => {
    loadProducts();
  });

  return (
    <>
      <Container>
        <Drawer
          sx={{
            backgroundColor: "#2b2b2a",
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              backgroundColor: "#2b2b2a",
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <NavBarHeader />
          <Divider
            sx={{
              "&.MuiDivider-root": {
                borderColor: "white",
              },
            }}
          />
          <Link to="/produtos">
            <HomeButton>
              <HomeIcon sx={{ color: "white" }} fontSize="large" />
            </HomeButton>
          </Link>
          <Divider
            sx={{
              "&.MuiDivider-root": {
                borderColor: "white",
              },
            }}
          />
          {lastSeen.length > 0 && (
            <>
              <MostVisitedTitle>Últimos visitados</MostVisitedTitle>
              <MostVisitedList>
                {lastSeen.slice(0, 5).map((product) => (
                  <MostVistedListItem
                    key={Math.random()}
                    disablePadding
                    onClick={() => navigate(`/produtos/${product.id}`)}
                  >
                    <ListItemText primary={product.nome} />
                  </MostVistedListItem>
                ))}
              </MostVisitedList>
            </>
          )}
        </Drawer>
        <InnerContainer>
          <NavBar>
            <FilterInput
              type="text"
              value={filter}
              onChange={handleFilter}
              label="Buscar por nome"
              size="small"
            />
            <CreateProductButton
              onClick={() => setCreateModalOpen(true)}
              variant="contained"
            >
              Criar Produto
            </CreateProductButton>
            <UserButton
              id="user-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <UserAvatar alt="user avatar" src={info?.image} />
              <UserName>{info?.nome}</UserName>
            </UserButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "user-button",
              }}
            >
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </NavBar>
          {productId ? <ProductDetail /> : <ProductList />}
        </InnerContainer>
      </Container>
      <ProductModal
        handleClose={() => setCreateModalOpen(false)}
        open={createModalOpen}
        product={null}
      />
    </>
  );
}
