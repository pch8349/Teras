import AppRouter from "./components/Router";

function App() {
  document.body.style.backgroundColor = "#f5f5f5";
  document.body.style.display = "flex";
  document.body.style.width = "100%";

  // eslint-disable-next-line react/jsx-pascal-case
  return (
    <>
      <AppRouter />
    </>
  );
}

export default App;
