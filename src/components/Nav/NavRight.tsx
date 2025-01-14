import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import React from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import { useRecoilValue, useRecoilValueLoadable } from "recoil";
import { CartListState } from "../../atom/Cart";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../atom/apiCall";

const NavRight = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const cartCountLoadable = useRecoilValueLoadable(CartListState);
  const open = Boolean(anchorEl);
  const accessToken = localStorage.getItem("accessToken");

  console.log(accessToken);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await api.delete("/cal/v1/customer/logout");

      localStorage.removeItem("accessToken");
      localStorage.removeItem("role");
      localStorage.removeItem("refreshToken");
      navigate("/");
      location.reload();
    } catch (error) {
      console.error("Logout Failed", error);
    }
  };

  const cartCount =
    cartCountLoadable.state === "hasValue"
      ? cartCountLoadable.contents.length
      : 0;

  const navigate = useNavigate();

  // eslint-disable-next-line no-constant-condition
  return accessToken ? (
    <>
      <Button
        id="fade-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{ color: "#fff" }}
      >
        Account
      </Button>

      <Menu
        id="fade-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        sx={{ transition: "ease 0.3s" }}
      >
        {" "}
        <Link to="/mypage" style={{ textDecoration: "none", color: "inherit" }}>
          {" "}
          <MenuItem onClick={handleClose}>MYPAGE</MenuItem>{" "}
        </Link>
        <MenuItem onClick={handleClose}>ORDER</MenuItem>
        <Link
          to="/wishlist"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          {" "}
          <MenuItem onClick={handleClose}>WISHLIST</MenuItem>{" "}
        </Link>
      </Menu>

      <Button
        sx={{ color: "#fff" }}
        onClick={() => {
          navigate("/notice");
        }}
      >
        NOTICE
      </Button>
      <Button
        sx={{ color: "#fff" }}
        onClick={() => {
          navigate("/qna");
        }}
      >
        Q&A
      </Button>
      <Link to="/cart">
        <Button sx={{ color: "#fff" }}>
          <Badge badgeContent={cartCount} color="primary">
            <ShoppingCartIcon sx={{ marginLeft: "2px" }} />
          </Badge>
        </Button>
      </Link>
      <Button sx={{ color: "#fff" }} onClick={handleLogout}>
        Logout
      </Button>
    </>
  ) : (
    <>
      <Button sx={{ color: "#fff" }} onClick={() => navigate("/products")}>
        Product
      </Button>
      <Button sx={{ color: "#fff" }} onClick={() => navigate("/signin")}>
        Login
      </Button>
    </>
  );
};

export default NavRight;
