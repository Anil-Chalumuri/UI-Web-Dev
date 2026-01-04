const NewCardLayout = function () {
  const blogImage =
    "https://images.unsplash.com/photo-1761839257870-06874bda71b5?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8";
  const blogTitle = "My Second Blog Post";
  const blogContent = "This is the content of my second blog post.";
  return (
    <div className="card" id="blog-card">
      <img src={blogImage} alt="Blog Post Image" />
      <h2>{blogTitle}</h2>
      <p>{blogContent}</p>
      <p>What is 2 * 2? {2 * 2}</p>
    </div>
  );
};

export default NewCardLayout;
