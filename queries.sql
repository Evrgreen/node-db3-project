-- Multi-Table Query Practice

-- Display the ProductName and CategoryName for all products in the database. Shows 77 records.

        SELECT ProductName, CategoryName from Product
        JOIN Category 
        ON Product.CategoryId = Category.Id 
-- Display the order Id and shipper CompanyName for all orders placed before August 9 2012. Shows 429 records.

        Select  ID,CompanyName,OrderDate FROM [Order]
JOIN Shipper
ON [Order].ShipVia = Shipper.id
WHERE strftime('%Y-%m-%d',OrderDate) < strftime('2012-11-9')

-- Display the name and quantity of the products ordered in order with Id 10251. Sort by ProductName. Shows 3 records.

    SELECT ProductName,Quantity FROM OrderDetail
    JOIN Product
    ON Product.id = OrderDetail.ProductId
    WHERE OrderId = 10251
    ORDER BY ProductName

-- Display the OrderID, Customer's Company Name and the employee's LastName for every order. All columns should be labeled clearly. Displays 16,789 records.
    
    Select Id as 'Order Number',Shipname as 'Company',LastName as 'Employee Last Name' from [Order]
    Join Employee
    On [Order].EmployeeId = Employee.Id
    ORDER BY Shipname


------Stretch --------- 


---Displays CategoryName and a new column called Count that shows how many products are in each category. Shows 8 records.
SELECT CategoryName as Category,COUNT(*) "Product Count"
FROM  Categories c
JOIN Products p 
ON c.CategoryID = p.CategoryID
GROUP BY CategoryName


---Display OrderID and a column called ItemCount that shows the total number of products placed on the order. Shows 196 records.

SELECT OrderID as "Order", COUNT(*) ItemCount
FROM [OrderDetails] o
join Products p
ON o.ProductID = p.ProductID
GROUP BY OrderID