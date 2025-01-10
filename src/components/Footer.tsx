const Footer = () => {
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <footer className="bg-gray-100 py-4">
      <div className="container mx-auto px-4 text-center">
        <p>
          &copy; Abdelrahman Mohamed - E-Commerce Store. Submitted on{" "}
          {currentDate}
        </p>
      </div>
    </footer>
  );
};
export default Footer;
