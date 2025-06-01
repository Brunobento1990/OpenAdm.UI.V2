import React, { useContext } from "react";
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
  Stack,
  Checkbox,
} from "@mui/material";
import Link from "next/link";

import { InputApp, MaskType } from "@/components/input/InputApp";
import { useFormikAdapter } from "@/adapters/FormikAdapter";
import { ILogin } from "@/interfaces/Login";
import { YupAdapter } from "@/adapters/YupAdapter";
import { useLoginApi } from "@/api/UseLoginApi";
import { AuthContextApp } from "@/context/AuthContextApp";

interface loginType {
  title?: string;
  subtitle?: JSX.Element | JSX.Element[];
  subtext?: JSX.Element | JSX.Element[];
}

const AuthLogin = ({ title, subtitle, subtext }: loginType) => {
  const { login } = useLoginApi();
  const { login: loginContext } = useContext(AuthContextApp);
  const form = useFormikAdapter<ILogin>({
    initialValues: {
      email: "",
      senha: "",
    },
    validationSchema: new YupAdapter().email("email").string("senha").build(),
    onSubmit: submit,
  });

  async function submit() {
    const response = await login.fetch(form.values);
    if (response) {
      loginContext(response);
    }
  }

  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      ) : null}
      {subtext}
      <Stack>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          gap="1rem"
        >
          <InputApp
            label="Email"
            id="email"
            type="email"
            onChange={form.onChange}
            onBlur={form.onBlur}
            error={form.error("email")}
            helperText={form.helperText("email")}
            value={form.values.email}
          />
          <InputApp
            label="Senha"
            isPassword
            id="senha"
            onChange={form.onChange}
            onBlur={form.onBlur}
            error={form.error("senha")}
            helperText={form.helperText("senha")}
            value={form.values.senha}
          />
        </Box>
        <Stack
          justifyContent="space-between"
          direction="row"
          alignItems="center"
          my={2}
        >
          <FormGroup>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Me manter logado"
            />
          </FormGroup>
          <Typography
            component={Link}
            href="/"
            fontWeight="500"
            sx={{
              textDecoration: "none",
              color: "primary.main",
            }}
          >
            Esqueceu sua senha ?
          </Typography>
        </Stack>
      </Stack>
      <Box>
        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          type="submit"
          loading={login.status === "loading"}
          onClick={form.onSubmit}
        >
          Login
        </Button>
      </Box>
      {subtitle}
    </>
  );
};

export default AuthLogin;
