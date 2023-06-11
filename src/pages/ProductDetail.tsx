import CssBaseline from "@mui/material/CssBaseline";
import { useParams } from "react-router";
import {
  ProductListAtom,
  Review,
  ReviewListAtom,
  ProductType,
} from "../atom/Product";
import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Button from "@mui/material/Button";
import { CartListState } from "../atom/Cart";
import { cartItems } from "../atom/Cart";
import { api } from "../atom/apiCall";
import { Container } from "@mui/material";
import ready from "../dummy/img/imgready.gif";

import ReviewForm from "../components/Product/Review";
import axios from "axios";
import { useState } from "react";
import ErrorModal from "../components/Modal/ErrorHandleModal";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const params = Number(id);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [, setReviewList] = useRecoilState<Review[]>(ReviewListAtom);
  const productData = useRecoilValue<ProductType[]>(ProductListAtom);
  const [cartItems, setCartItems] = useRecoilState<cartItems[]>(CartListState);
  const filter: ProductType[] = productData.filter(
    (item) => item.id === params
  );

  //카트 담기 이벤트//
  const handleAddToCart = async () => {
    try {
      const response = await api.post(`cal/v1/cart/items/${id}`);
      setCartItems(response.data.body.cart.products);
    } catch (error) {
      if (axios.isAxiosError(error))
        handleOpenErrorModal(error.response?.data.message);
    }
  };

  //Review 등록 이벤트//
  const handleReviewSubmit = async (rating: number, comment: string) => {
    try {
      const response = await api.post(`/cal/v1/product/${id}/review/create`, {
        rating: rating,
        reviewText: comment,
      });
      const newReview = response.data; // Assuming the API returns the created review object

      setReviewList((prevReviewList) => [...prevReviewList, newReview]); // Update the review list in Recoil state
    } catch (error) {
      if (axios.isAxiosError(error))
        handleOpenErrorModal(error.response?.data.message);
    }
  };

  const handleWishAdd = async () => {
    try {
      const response = await api.post(`cal/v1/wishlist/add/${id}`);
    } catch (error) {
      if (axios.isAxiosError(error))
        handleOpenErrorModal(error.response?.data.message);
    }
  };

  const handleOpenErrorModal = (errorMessage: string) => {
    setErrorMessage(errorMessage);
    setIsErrorModalOpen(true);
  };

  const handleCloseErrorModal = () => {
    setIsErrorModalOpen(false);
  };

  // console.log(cartItems);
  const DetailTop = styled.div`
    width: 1180px;
    margin: 0 auto;
    margin-top: 80px;
    display: flex;
    border-bottom: 1px solid;
    border-color: #d3d3d3;
    margin-bottom: 50px;
  `;
  const DetailBottom = styled.div`
    width: 1180px;
    margin: 0 auto;
    display: flex;
  `;
  const ThumbNail = styled.img`
    position: relative;
    width: 600px;
    height: 600px;
    padding-left: 50px;
    margin-right: auto;
    transform: scale(0.8);
  `;

  const DetailTitle = styled.h1`
    margin: 19px 0 9px;
    font-size: 27px;
    font-weight: 500;
    font-family: "ssgBan", sans-serif;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    word-break: keep-all;
    word-wrap: break-word;
    white-space: normal;
  `;
  const DetailRightTop = styled.div`
    position: relative;
    padding-bottom: 17px;
    border-bottom: 1px solid #222;
  `;
  return (
    <>
      <CssBaseline />

      {filter.map((item) => (
        <DetailTop key={item.id}>
          {item.thumbnail ? (
            <ThumbNail src={item.thumbnail.url} />
          ) : (
            <ThumbNail src={ready} />
          )}

          <div
            style={{ width: "470px", textAlign: "left", paddingTop: "20px" }}
          >
            <DetailRightTop>
              <DetailTitle>{item.content}</DetailTitle>
              <div
                style={{
                  marginTop: "27px",
                  display: "flex",
                }}
              >
                <span
                  style={{
                    fontSize: "23px",
                    fontWeight: "500",
                    marginRight: "auto",
                  }}
                >
                  {item.price}원
                </span>
                <span
                  style={{
                    alignItems: "right",
                    fontSize: "23px",
                    verticalAlign: "baseline",
                  }}
                  onClick={handleWishAdd}
                >
                  <FavoriteBorderIcon
                    sx={{ marginLeft: "auto", paddingTop: "2px" }}
                  />
                </span>
              </div>
            </DetailRightTop>
            <div
              style={{
                display: "flex",
                marginTop: "20px",
              }}
            >
              <Button
                variant="outlined"
                sx={{
                  width: "220px",
                  marginRight: "auto",
                  fontSize: "16px",
                  fontWeight: "500",
                  color: "#000",
                  borderColor: "#000",
                }}
                onClick={handleAddToCart}
              >
                장바구니 담기
              </Button>
              <Button
                variant="contained"
                size="large"
                sx={{
                  width: "220px",
                  marginLeft: "auto",
                  fontSize: "16px",
                  fontWeight: "500",
                  color: "#fff",
                  borderColor: "#000",
                  backgroundColor: "#000",
                }}
              >
                바로구매
              </Button>
            </div>
          </div>
        </DetailTop>
      ))}
      <DetailBottom>
        <Container>
          {productData.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              {item.content}
            </div>
          ))}
          <ReviewForm onSubmit={handleReviewSubmit} />
        </Container>
      </DetailBottom>
      <ErrorModal
        open={isErrorModalOpen}
        onClose={handleCloseErrorModal}
        errorMessage={errorMessage}
      />
    </>
  );
};

export default ProductDetail;
