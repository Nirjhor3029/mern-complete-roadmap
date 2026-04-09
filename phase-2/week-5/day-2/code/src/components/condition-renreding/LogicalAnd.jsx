
const LogicalAnd = () => {
    const showMessage = true;
    const showspinner = false; // make true for loading
  return (
    <>
        {showMessage && <h1>Message</h1>}
        {showspinner && <div className="spinner">Loading....</div>}
    </>
  )
}

export default LogicalAnd