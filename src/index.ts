import app from "./utils/app";

const server = app();

const PORT = 4004;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
