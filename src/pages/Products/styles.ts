import {
  TextField,
  styled,
  Box,
  Toolbar,
  Avatar,
  Typography,
  Button,
  Grid,
  Stack,
  List,
  ListItem,
  TableRow,
  TableContainer,
} from "@mui/material";

export const Container = styled(Box)`
  width: 100%;
  height: 100vh;
  display: flex;
  background-color: #f0f0f0;
`;

export const NavBar = styled(Box)`
  height: 61px;
  width: calc(100% - 240px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;
  padding: 0 24px;
  position: fixed;
  right: 0;
  top: 0;
`;

export const NavBarHeader = styled(Toolbar)`
  min-height: 60px;
`;

export const UserAvatar = styled(Avatar)`
  width: 30px;
  height: 30px;
`;

export const UserName = styled(Typography)`
  font-size: 16px;
  font-weight: bold;
`;

export const UserButton = styled(Button)`
  display: flex;
  height: 40px;
  padding: 0 12px;
  gap: 12px;
  justify-content: center;
  align-items: center;
`;

export const InnerContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  gap: 12px;
`;

export const ProductListContainer = styled(TableContainer)`
  overflow: auto;
  width: 100%;
  min-height: calc(100vh - 120px);
  max-height: calc(100vh - 120px);
  margin-top: 60px;
  margin-left: 0;
  padding: 12px;
  justify-content: center;
`;

export const ProductItem = styled(TableRow)`
  background: transparent;
  transition: all 1s;
  &:hover {
    background: #d2d2d2;
  }
`;

export const ProductText = styled(Typography)`
  font-size: 14px;
  font-weight: 400;
`;

export const ProductPrice = styled(Typography)`
  font-size: 18px;
  font-weight: 600;
`;

export const ProductImage = styled("img")`
  width: 100px;
  height: 100px;
  border-radius: 4px;
`;

export const ProductContainer = styled(Grid)`
  width: 100%;
  padding: 24px;
  margin-top: 60px;
`;

export const ProductDetailedImage = styled("img")`
  width: 100%;
  border-radius: 6px;
`;

export const ProductDetailedInfo = styled(Stack)`
  height: 100%;
  justify-content: space-between;
  padding-right: 24px;
`;

export const ProductDetailedButtons = styled(Stack)`
  gap: 12px;
`;

export const ProductName = styled(Typography)`
  font-size: 48px;
  font-weight: 700;
  line-height: 56px;
`;

export const ProductDetailPrice = styled(Typography)`
  font-size: 32px;
  font-weight: 600;
  margin-top: 8px;
`;

export const ProductBrand = styled(Typography)`
  font-size: 12px;
  font-weight: 400;
  line-height: 17px;
  margin-bottom: 12px;
`;

export const ProductSales = styled(Typography)`
  font-size: 14px;
  font-weight: 500;
  line-height: 21px;
`;

export const ProductCreation = styled(Typography)`
  font-size: 10px;
  font-weight: 700;
  line-height: 15px;
`;

export const HomeButton = styled(Box)`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const MostVisitedTitle = styled(Typography)`
  font-size: 16px;
  margin-left: 16px;
  font-weight: 700;
  margin-top: 20px;
  color: white;
`;

export const MostVisitedList = styled(List)`
  width: 100%;
  padding: 8px 16px;
`;

export const MostVistedListItem = styled(ListItem)`
  margin-left: 8px;
  cursor: pointer;

  span {
    font-size: 14px;
    font-weight: 500;
    text-decoration: none;
    color: white;
  }

  &:hover {
    span {
      color: grey;
    }
  }
`;

export const CreateProductButton = styled(Button)`
  width: 200px;
  height: 40px;
`;

export const FilterInput = styled(TextField)`
  width: 250px;
`;
