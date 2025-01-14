import { Typography, Badge } from "@mui/material";
import { Box } from "@mui/system";

const AdminInfoTop = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: 100,
        marginTop: "80px",
        marginBottom: "20px",
        borderRadius: "10px",
        boxShadow: "1px",
        textAlign: "left",
        backgroundColor: "#f5f5f5",
        // "&:hover": {
        //   backgroundColor: "info.light",
        //   opacity: [0.9, 0.8, 0.7],
        // },
      }}
    >
      <div style={{ display: "flex", borderBottom: "1px solid #e0e0e0" }}>
        <Typography
          sx={{
            fontSize: "16px",
            color: "black",
            fontWeight: "600",
            padding: "10px",
            paddingLeft: "20px",
          }}
        >
          오늘의 할일
        </Typography>

        <Badge
          color="secondary"
          overlap="circular"
          badgeContent="3"
          sx={{ marginTop: "17px", marginLeft: "4px" }}
        />
      </div>
      <div
        style={{
          display: "flex",
          padding: "17px",
        }}
      >
        <Typography sx={{ fontSize: "12px", fontWeight: "600" }}>
          신규주문
        </Typography>
        <Typography
          sx={{
            fontSize: "12px",
            color: "red",
            fontWeight: "600",
            marginLeft: "2px",
          }}
        >
          0
        </Typography>

        <Typography
          sx={{ fontSize: "12px", marginLeft: "4px", fontWeight: "600" }}
        >
          취소관리
        </Typography>
        <Typography
          sx={{
            fontSize: "12px",
            color: "red",
            fontWeight: "600",
            marginLeft: "2px",
          }}
        >
          0
        </Typography>
        <Typography
          sx={{ fontSize: "12px", marginLeft: "4px", fontWeight: "600" }}
        >
          반품관리
        </Typography>
        <Typography
          sx={{
            fontSize: "12px",
            color: "red",
            fontWeight: "600",
            marginLeft: "2px",
          }}
        >
          0
        </Typography>
        <Typography
          sx={{ fontSize: "12px", marginLeft: "4px", fontWeight: "600" }}
        >
          교환관리
        </Typography>
        <Typography
          sx={{
            fontSize: "12px",
            color: "red",
            fontWeight: "600",
            marginLeft: "2px",
          }}
        >
          0
        </Typography>
        <Typography
          sx={{ fontSize: "12px", marginLeft: "4px", fontWeight: "600" }}
        >
          취소문의
        </Typography>
        <Typography
          sx={{
            fontSize: "12px",
            color: "red",
            fontWeight: "600",
            marginLeft: "2px",
          }}
        >
          0
        </Typography>
        <Typography
          sx={{ fontSize: "12px", marginLeft: "4px", fontWeight: "600" }}
        >
          답변대기 문의
        </Typography>
        <Typography
          sx={{
            fontSize: "12px",
            color: "red",
            fontWeight: "600",
            marginLeft: "2px",
          }}
        >
          0
        </Typography>
      </div>
    </Box>
  );
};

export default AdminInfoTop;
