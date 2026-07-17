import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

export function Login() {
  const handleGithubLogin = () => window.location.href = "http://localhost:4000/auth/github";
  const handleGoogleLogin = () => window.location.href = "http://localhost:4000/auth/google";
  
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "grey.100",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card sx={{ width: 400, p: 2, borderRadius: 3, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h4" align="center" sx={{ fontWeight: "bold" }}>
            Welcome
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            align="center"
            sx={{ mt: 1, mb: 4 }}
          >
            Sign in to access your dashboard
          </Typography>

          <Stack spacing={2}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<GitHubIcon />}
              onClick={handleGithubLogin}
              sx={{
                bgcolor: "#24292e",
                "&:hover": {
                  bgcolor: "#2b3137",
                },
              }}
            >
              Continue with GitHub
            </Button>

            <Button
              fullWidth
              variant="outlined"
              startIcon={<GoogleIcon />}
              onClick={handleGoogleLogin}
              sx={{
                color: "#433f3c",
                borderColor: "#dadce0",
                bgcolor: "#fff",
                "&:hover": {
                  bgcolor: "#f8f9fa",
                  borderColor: "#dadce0",
                },
              }}
            >
              Continue with Google
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}