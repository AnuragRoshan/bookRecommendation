CREATE TABLE Authors (
    AuthorID INT PRIMARY KEY AUTO_INCREMENT,
    FirstName VARCHAR(255) NOT NULL,
    LastName VARCHAR(255) NOT NULL,
    Bio VARCHAR(255)
);


CREATE TABLE Books (
    BookID INT PRIMARY KEY AUTO_INCREMENT,
    Title VARCHAR(255) NOT NULL,
    ISBN VARCHAR(13) UNIQUE NOT NULL,
    Price DECIMAL(10,2) NOT NULL CHECK (Price > 0),
    PublicationDate DATE,
    AuthorID INT,
    Genre VARCHAR(255),
    StockQuantity INT NOT NULL CHECK (StockQuantity >= 0),
    FOREIGN KEY (AuthorID) REFERENCES Authors(AuthorID)
);


CREATE TABLE Customers (
    CustomerID INT PRIMARY KEY AUTO_INCREMENT,
    FirstName VARCHAR(255) NOT NULL,
    LastName VARCHAR(255) NOT NULL,
    Email VARCHAR(255) UNIQUE NOT NULL,
    PhoneNumber VARCHAR(15),
    Address VARCHAR(255)
);


CREATE TABLE Orders (
    OrderID INT PRIMARY KEY AUTO_INCREMENT,
    CustomerID INT,
    OrderDate DATETIME NOT NULL,
    Status VARCHAR(255) NOT NULL,
    TotalPrice DECIMAL(10,2) NOT NULL CHECK (TotalPrice >= 0),
    FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID)
);


CREATE TABLE OrderDetails (
    OrderDetailID INT PRIMARY KEY AUTO_INCREMENT,
    OrderID INT,
    BookID INT,
    Quantity INT NOT NULL CHECK (Quantity > 0),
    PriceAtPurchase DECIMAL(10,2) NOT NULL CHECK (PriceAtPurchase >= 0),
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID),
    FOREIGN KEY (BookID) REFERENCES Books(BookID)
);

-- Query to Retrieve List of Top-Selling Books for a Given Period
SELECT
    b.Title,
    b.ISBN,
    SUM(od.Quantity) AS TotalQuantitySold,
    SUM(od.Quantity * od.PriceAtPurchase) AS TotalSales
FROM
    OrderDetails od
JOIN
    Orders o ON od.OrderID = o.OrderID
JOIN
    Books b ON od.BookID = b.BookID
WHERE
    o.OrderDate BETWEEN '2024-01-01' AND '2024-12-31' 
GROUP BY
    b.BookID
ORDER BY
    TotalQuantitySold DESC, TotalSales DESC;


--Query to Calculate Total Sales Revenue for a Given Period

SELECT
    SUM(od.Quantity * od.PriceAtPurchase) AS TotalRevenue
FROM
    OrderDetails od
JOIN
    Orders o ON od.OrderID = o.OrderID
WHERE
    o.OrderDate BETWEEN '2024-01-01' AND '2024-12-31';