"use client";

import { Box, Card, Typography, Grid } from "@mui/material";
// components
import { Logo } from "@/components/logo/Logo";
import { TextApp } from "@/components/text/TextApp";
import { GridApp } from "@/components/grid/GridApp";
import AuthLogin from "../auth/AuthLogin";

const Login2 = () => {
  return (
    <>
      <Box
        sx={{
          position: "relative",
          "&:before": {
            content: '""',
            background: "radial-gradient(#d2f1df, #d3d7fa, #bad8f4)",
            backgroundSize: "400% 400%",
            animation: "gradient 15s ease infinite",
            position: "absolute",
            height: "100%",
            width: "100%",
            opacity: "0.3",
          },
        }}
      >
        <Grid
          container
          spacing={0}
          justifyContent="center"
          sx={{ height: "100vh" }}
        >
          <GridApp
            xs={12}
            sm={12}
            lg={4}
            xl={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Card
              elevation={9}
              sx={{ p: 4, zIndex: 1, width: "100%", maxWidth: "500px" }}
            >
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                gap="1rem"
              >
                <Logo />
                <TextApp titulo="Open Adm" fontSize="16px" fontWeight={600} />
              </Box>
              <AuthLogin
                subtext={
                  <Typography
                    variant="subtitle1"
                    textAlign="center"
                    color="textSecondary"
                    mb={1}
                  >
                    Por favor, efetue o login com suas credenciais de acesso !
                  </Typography>
                }
              />
            </Card>
          </GridApp>
        </Grid>
      </Box>
    </>
  );
};
export default Login2;
