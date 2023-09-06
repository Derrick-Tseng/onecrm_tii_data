create table data
(
    productNum varchar(30) PRIMARY KEY,
    productName varchar(50),
    approvalDate varchar(20),
    startDate varchar(20),
    endDate varchar(20),
    approvalNum varchar(80),
    company varchar(50),
    status boolean,
    productContent bytea[],
    treaty bytea[],
    rate bytea[]
);