create table data
(
    productNum varchar(30) PRIMARY KEY,
    productName varchar(50),
    approvalDate varchar(20),
    startDate varchar(20),
    endDate varchar(20),
    approvalNum varchar(80),
    company varchar(50),
    status varchar(10),
    productContent bytea[],
    treaty bytea[],
    rate bytea[]
);

-- insert into data (productnum, productname, approvaldate, startdate, enddate, approvalnum, company, status ) values ('123123', 'abc', '4444', '5555', '6666', 'aa123', 'ddd', 'fff');
-- insert into data (productnum, productname, approvaldate, startdate, enddate, approvalnum, company, status ) values ('456456', 'def', '7777', '8888', '9999', 'bb456', 'eee', 'ggg');
